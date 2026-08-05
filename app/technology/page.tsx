import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, CleanIcon, FlowIcon, LabourIcon, ShieldIcon, WaterIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "Technology",
  description: "How the Wise Saturn automatic cleaning approach supports livestock trough maintenance.",
  alternates: { canonical: "/technology" },
};

const processSteps = [
  { number: "01", title: "Before Cleaning", text: "Sediment and livestock waste naturally collect at the bottom of the trough.", icon: <WaterIcon /> },
  { number: "02", title: "Cleaning Cycle", text: "The timed bottom-cleaning system activates and directs water toward the outlet.", icon: <CleanIcon /> },
  { number: "03", title: "After Cleaning", text: "Settled material is discharged, leaving a cleaner drinking environment.", icon: <FlowIcon /> },
];

const coreTechnology = [
  { title: "Timed Automatic Operation", text: "A scheduled cycle supports regular, repeatable cleaning.", icon: <CleanIcon /> },
  { title: "Directed Water Movement", text: "Water movement helps shift settled material toward the outlet.", icon: <FlowIcon /> },
  { title: "Protected System Components", text: "Working components are contained within the trough's end housings.", icon: <ShieldIcon /> },
  { title: "Low-Maintenance Design", text: "The system is designed to reduce repetitive manual trough cleaning.", icon: <LabourIcon /> },
];

const farmConditions = [
  "Suitable for cattle and sheep",
  "Protected working components",
  "Straightforward installation",
  "Designed for Australian livestock operations",
];

export default function TechnologyPage() {
  return <main className="inner-page technology-page">
    <section className="technology-overview">
      <div className="technology-overview-copy">
        <div className="section-label light"><span>Technology</span> Clear by design</div>
        <h1>Automatic Cleaning.<br/>Built Into the Routine.</h1>
        <p>Wise Saturn uses a timed cleaning cycle to remove settled sediment and waste from the trough, helping maintain cleaner livestock drinking water with less manual maintenance.</p>
      </div>
      <div className="technology-overview-image"><Image src="/images/products/main-product/studio/water-trough-main-front.png" alt="Wise Saturn automatic self-cleaning livestock water trough" width={1400} height={900} sizes="(max-width: 1040px) 100vw, 54vw" /></div>
    </section>

    <section className="technology-process page-shell">
      <div className="section-label"><span>01</span> Three-Stage Cleaning Process</div>
      <div className="technology-heading"><h2>How the cleaning<br/>cycle works.</h2><p>Three clear stages move settled material out of the trough as part of a repeatable routine.</p></div>
      <div className="technology-process-grid">
        {processSteps.map((step, index) => <div className="technology-process-item" key={step.number}>
          <article><div>{step.icon}<span>{step.number}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>
          {index < processSteps.length - 1 && <div className="technology-process-arrow" aria-hidden="true"><ArrowIcon /></div>}
        </div>)}
      </div>
    </section>

    <section className="technology-core">
      <div className="page-shell">
        <div className="section-label light"><span>02</span> Core Technology</div>
        <div className="technology-heading light"><h2>Purposeful systems.<br/>Nothing unnecessary.</h2><p>Each part of the approach supports consistent cleaning and practical farm use.</p></div>
        <div className="technology-core-grid">{coreTechnology.map((item, index) => <article key={item.title}><div><span>0{index + 1}</span>{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>

    <section className="technology-water page-shell"><div><div className="section-label"><span>03</span> Water Circulation</div><h2>Movement with<br/>a clear purpose.</h2></div><div className="water-diagram" aria-label="Water circulation sequence"><div><WaterIcon/><b>Fresh water enters</b><span>Maintains the operating water level.</span></div><ArrowIcon/><div><FlowIcon/><b>Water is directed</b><span>Movement guides settled material toward the outlet.</span></div><ArrowIcon/><div><CleanIcon/><b>Waste exits</b><span>The cleaning cycle flushes material away.</span></div></div></section>

    <section className="technology-comparison page-shell">
      <div className="section-label"><span>04</span> Conventional Comparison</div>
      <div className="technology-heading"><h2>A clearer cleaning<br/>routine.</h2><p>A simple comparison of the trough before and after the automatic cycle.</p></div>
      <div className="technology-comparison-grid">
        <article><span>Traditional Trough Routine</span><div className="comparison-mark"><WaterIcon /></div><h3>Manual cleaning.</h3><p>Sediment and waste settle at the bottom and require periodic manual removal.</p></article>
        <div className="comparison-divider" aria-hidden="true"><ArrowIcon /></div>
        <article><span>Wise Saturn Automatic Cycle</span><div className="comparison-mark"><CleanIcon /></div><h3>Scheduled cleaning.</h3><p>The automatic cycle removes settled material and refreshes the water environment with less routine intervention.</p></article>
      </div>
    </section>

    <section className="bottom-cleaning-system"><div className="page-shell"><div className="section-label light"><span>05</span> Bottom Cleaning System</div><div className="technology-heading light"><h2>Cleaning starts<br/>where waste settles.</h2><p>The trough is shaped around controlled sediment movement. During the cycle, directed flow carries settled material to the protected discharge point without manually emptying the entire trough.</p></div><div className="bottom-system-visual"><Image src="/images/products/main-product/studio/water-trough-main-front.png" alt="Front view showing the Wise Saturn trough bottom profile" width={1400} height={900} sizes="(max-width:760px) 100vw, 55vw"/><div><span>01</span><b>Settling zone</b><p>Waste collects below the livestock drinking area.</p><span>02</span><b>Directed outlet</b><p>The cleaning cycle carries sediment to the discharge point.</p></div></div></div></section>

    <section className="technology-innovation page-shell">
      <div><div className="section-label"><span>05</span> Patent and Innovation</div><h2>Patent-Pending<br/>Self-Cleaning Technology.</h2></div>
      <div><ShieldIcon /><p>Wise Saturn&apos;s patent-pending approach brings automatic cleaning into the normal operating routine of a livestock trough. The focus is practical innovation: cleaner water management, protected components and reduced repetitive maintenance.</p></div>
    </section>

    <section className="technology-farm">
      <div className="technology-farm-image"><Image src="/images/products/main-product/studio/water-trough-main-angle.png" alt="Wise Saturn trough angled studio view" width={1400} height={900} sizes="(max-width: 1040px) 100vw, 60vw" /></div>
      <div className="technology-farm-copy">
        <div className="section-label light"><span>06</span> Designed for Farm Conditions</div>
        <h2>Practical by design.</h2>
        <ul>{farmConditions.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul>
      </div>
    </section>

    <section className="technology-health page-shell"><div className="section-label"><span>07</span> Livestock Health</div><div className="technology-heading"><h2>Cleaner water supports<br/>better daily wellbeing.</h2><p>Reducing sediment, organic build-up and stale water conditions supports a more appealing drinking source. Reliable access to cleaner water is an important part of livestock hydration, feed intake and general welfare.</p></div></section>

    <section className="technology-bottom-cta page-shell">
      <h2>A Smarter Approach<br/>to Trough Maintenance.</h2>
      <Link className="button button-dark" href="/contact">Contact Us <ArrowIcon /></Link>
    </section>
  </main>;
}
