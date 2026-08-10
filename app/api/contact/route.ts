import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { ensureDatabase, getSql } from "@/lib/database";

const attempts = new Map<string, { count:number;resetAt:number }>();
const WINDOW_MS = 15 * 60 * 1000, MAX_REQUESTS = 5, alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function clean(value:unknown,max:number){return typeof value === "string" ? value.trim().slice(0,max) : "";}
function isRateLimited(ip:string){const now=Date.now(),current=attempts.get(ip);if(!current||current.resetAt<=now){attempts.set(ip,{count:1,resetAt:now+WINDOW_MS});return false;}current.count+=1;return current.count>MAX_REQUESTS;}
function referenceDate(){const parts=new Intl.DateTimeFormat("en-AU",{timeZone:"Australia/Sydney",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date()),part=(type:string)=>parts.find((item)=>item.type===type)?.value??"";return `${part("year")}${part("month")}${part("day")}`;}
function referenceNumber(){const bytes=crypto.getRandomValues(new Uint8Array(4));return `WS-${referenceDate()}-${Array.from(bytes,(value)=>alphabet[value%alphabet.length]).join("")}`;}

export async function POST(request:Request){
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  if(isRateLimited(ip))return NextResponse.json({error:"Too many requests"},{status:429});
  try{
    const body=await request.json();
    if(clean(body.website,200))return NextResponse.json({ok:true});
    const type=["customer","trial","dealer"].includes(body.type)?body.type as "customer"|"trial"|"dealer":"customer";
    const company=clean(body.company,150),name=type==="dealer"?company:clean(body.name,100),phone=clean(body.phone,50),email=clean(body.email,254).toLowerCase(),location=type==="dealer"?clean(body.country,100):clean(body.location,160),message=clean(body.message,5000);
    if(!name||!phone||!location||(type==="dealer"&&!company)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({error:"Invalid submission"},{status:400});
    const details={farm:clean(body.farm,150),livestock:clean(body.livestock,120),stockNumbers:clean(body.stockNumbers,20),currentWatering:clean(body.currentWatering,200),preferredTrialStart:clean(body.preferredTrialStart,20),preferredTrialEnd:clean(body.preferredTrialEnd,20),cleaningFrequency:clean(body.cleaningFrequency,80),purchaseIntention:clean(body.purchaseIntention,80),country:clean(body.country,100),region:clean(body.region,120),salesExperience:clean(body.salesExperience,500),annualVolume:clean(body.annualVolume,20),firstOrder:clean(body.firstOrder,20),warehouse:clean(body.warehouse,80)};
    await ensureDatabase();
    const sql=getSql();let reference=referenceNumber();
    for(let i=0;i<5;i++){const rows=await sql`SELECT 1 FROM enquiries WHERE reference_number=${reference} LIMIT 1` as unknown as Array<Record<string,unknown>>;if(!rows.length)break;reference=referenceNumber();}
    const id=crypto.randomUUID();
    await sql`INSERT INTO enquiries (id,reference_number,type,name,email,phone,company,location,message,details) VALUES (${id},${reference},${type},${name},${email},${phone},${company},${location},${message},${JSON.stringify(details)}::jsonb)`;
    let resendMessageId="";
    try{
      const rows=await sql`SELECT value FROM site_settings WHERE key='notification_email' LIMIT 1` as unknown as Array<{value:string}>,to=rows[0]?.value||"peixing@hotmail.com";
      const{data,error}=await getResend().emails.send({from:"Wise Saturn Website <website@wisesaturn.com>",to:[to],subject:`${reference} · New Wise Saturn ${type} enquiry`,text:`A new ${type} enquiry has been stored in the Wise Saturn admin system.\n\nReference: ${reference}\n\nLog in to the admin area to review it.`});
      if(error)console.error("Resend notification error",error.name);else resendMessageId=data?.id??"";
    }catch(error){console.error("Enquiry stored but notification failed",error instanceof Error?error.message:"Unknown error");}
    if(resendMessageId)await sql`UPDATE enquiries SET resend_message_id=${resendMessageId},updated_at=now() WHERE id=${id}`;
    return NextResponse.json({ok:true,referenceNumber:reference});
  }catch(error){console.error("Contact form error",error instanceof Error?error.message:"Unknown error");return NextResponse.json({error:"Unable to process request"},{status:500});}
}
