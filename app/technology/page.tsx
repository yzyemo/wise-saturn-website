import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CleanIcon, FlowIcon, LabourIcon, ShieldIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = { title: "Technology", description: "How the Wise Saturn automatic cleaning approach supports livestock trough maintenance." };

const steps = [
  ["01", "Water in use", "Livestock access the trough through the normal watering cycle.", <WaterIcon key="water"/>],
  ["02", "Cleaning cycle", "The system initiates a repeatable cleaning action.", <CleanIcon key="clean"/>],
  ["03", "Waste movement", "Directed water movement helps shift settled material.", <FlowIcon key="flow"/>],
  ["04", "Ready again", "The trough returns to its normal working state.", <ShieldIcon key="shield"/>],
];

export default function TechnologyPage() {
  return <main className="inner-page">
    <section className="page-hero dark-hero"><div className="page-shell"><div className="section-label light"><span>Technology</span> Clear by design</div><h1>Consistent cleaning.<br/>Built into the routine.</h1><p>Wise Saturn is designed to make trough cleaning more regular and less dependent on repetitive manual work.</p></div></section>
    <section className="process page-shell"><div className="process-intro"><h2>A simple four-stage approach.</h2><p>The system supports the daily operating rhythm of a livestock property without adding unnecessary complexity.</p></div><div className="process-grid">{steps.map(([n,title,text,icon]) => <article key={String(n)}><div>{icon}<span>{n}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="tech-principles page-shell"><div className="section-label"><span>Principles</span> What guides the system</div><div className="principle-grid"><article><CleanIcon/><h3>Repeatability</h3><p>A consistent process is easier to monitor and manage than irregular manual cleaning.</p></article><article><LabourIcon/><h3>Reduced intervention</h3><p>The technology is intended to reduce routine labour while keeping inspection important.</p></article><article><ShieldIcon/><h3>Practical protection</h3><p>Key components are contained within the product’s end housings.</p></article></div></section>
    <section className="page-cta page-shell"><h2>See the system<br/>working on video.</h2><Link className="button button-dark" href="/videos">Watch demo <ArrowIcon/></Link></section>
  </main>;
}

