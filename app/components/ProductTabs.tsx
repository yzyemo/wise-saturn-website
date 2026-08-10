"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "./Icons";

export type ProductSection = {
  key: string;
  title: string;
  body: string;
  media_url: string;
};

const labels: Record<string, string> = {
  overview: "Overview",
  dimensions: "Dimensions",
  installation: "Installation",
  valve: "Valve",
  bluetooth: "Bluetooth Controller",
  downloads: "Downloads",
  videos: "Videos",
};

export default function ProductTabs({ sections }: { sections: ProductSection[] }) {
  const [active, setActive] = useState(sections[0]?.key ?? "overview");
  const section = sections.find((item) => item.key === active) ?? sections[0];
  if (!section) return null;

  return <div className="product-tabs">
    <div className="product-tab-list" role="tablist" aria-label="Product information">
      {sections.map((item) => <button key={item.key} role="tab" aria-selected={active === item.key} onClick={() => setActive(item.key)}>{labels[item.key] ?? item.title}</button>)}
    </div>
    <div className="product-tab-panel" role="tabpanel">
      <div><span className="kicker">{labels[section.key] ?? section.key}</span><h3>{section.title}</h3></div>
      <div><p>{section.body}</p>{section.media_url && <Link className="inline-link" href={section.media_url}>{section.key === "videos" ? "Watch videos" : "Open resource"} <ArrowIcon /></Link>}</div>
    </div>
  </div>;
}
