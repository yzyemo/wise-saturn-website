import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { BreadcrumbData } from "../components/StructuredData";
import ContactForm from "./ContactForm";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Customer, Trial and Dealer Enquiries",description:"Contact Wise Saturn about the product, apply for a three-month trial or discuss a dealer opportunity.",alternates:{canonical:"/contact"}};
export default async function ContactPage({searchParams}:{searchParams:Promise<{type?:string}>}){const params=await searchParams,initialType=params.type==="trial"||params.type==="dealer"?params.type:"customer",settings=await getSiteSettings();return <main className="inner-page"><BreadcrumbData items={[["Home","/"],["Contact","/contact"]]}/><section className="compact-hero page-shell"><div><span className="kicker">Customer · Trial · Dealer</span><h1>One place to start.</h1></div><div className="direct-contact"><a href={`tel:${settings.phone.replace(/\s/g,"")}`}>{settings.phone}</a><a href={`mailto:${settings.public_email}`}>{settings.public_email}</a><span>Australia</span></div></section><section className="form-section page-shell"><ContactForm initialType={initialType}/></section></main>}
