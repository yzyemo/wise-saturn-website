import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

export function CleanIcon(props: IconProps) {
  return <svg {...base} {...props} aria-hidden="true"><path d="M7 20c3.6 0 3.6-3 7.2-3s3.6 3 7.2 3 3.6-3 7.2-3" stroke="currentColor" strokeWidth="1.7"/><path d="M16 3v9M12.5 7.5 16 11l3.5-3.5M4 26h24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square"/></svg>;
}

export function WaterIcon(props: IconProps) {
  return <svg {...base} {...props} aria-hidden="true"><path d="M16 3S7 13.2 7 20a9 9 0 0 0 18 0C25 13.2 16 3 16 3Z" stroke="currentColor" strokeWidth="1.7"/><path d="M11.5 21.5c.7 2.2 2.1 3.3 4.3 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square"/></svg>;
}

export function LabourIcon(props: IconProps) {
  return <svg {...base} {...props} aria-hidden="true"><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.7"/><path d="M16 9v7l5 3M8 5l-3 3M24 5l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square"/></svg>;
}

export function FarmIcon(props: IconProps) {
  return <svg {...base} {...props} aria-hidden="true"><path d="M4 27V13l12-8 12 8v14M9 27V16h14v11M13 27v-7h6v7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="miter"/><path d="M4 27h24" stroke="currentColor" strokeWidth="1.7"/></svg>;
}

export function ArrowIcon(props: IconProps) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props} aria-hidden="true"><path d="M3 9h11M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5"/></svg>;
}

export function PlayIcon(props: IconProps) {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} aria-hidden="true"><path d="m7 5 8 5-8 5V5Z" fill="currentColor"/></svg>;
}

export function FlowIcon(props: IconProps) {
  return <svg {...base} {...props} aria-hidden="true"><path d="M4 9h18M18 5l4 4-4 4M28 23H10M14 19l-4 4 4 4" stroke="currentColor" strokeWidth="1.7"/></svg>;
}

export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props} aria-hidden="true"><path d="M16 3 27 7v8c0 7.2-4.8 11.8-11 14-6.2-2.2-11-6.8-11-14V7l11-4Z" stroke="currentColor" strokeWidth="1.7"/><path d="m11 16 3.2 3.2L21 12.5" stroke="currentColor" strokeWidth="1.7"/></svg>;
}

