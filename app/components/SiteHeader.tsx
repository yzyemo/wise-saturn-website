"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links=[["Product","/product"],["Trial","/trial"],["Videos","/videos"],["Updates","/updates"],["Downloads","/downloads"],["About","/about"]];
export default function SiteHeader(){const pathname=usePathname();return <header className="site-header"><Link className="site-brand" href="/" aria-label="Wise Saturn home"><Image src="/brand/logo/wise-saturn-logo-primary.png" alt="" width={55} height={55} priority/><span><b>WISE</b> SATURN</span></Link><nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label,href])=><Link href={href} key={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</nav><Link className="header-cta" href="/contact">Enquire <span aria-hidden="true">↗</span></Link><details className="mobile-menu"><summary aria-label="Open navigation"><span/><span/></summary><nav aria-label="Mobile navigation"><Link href="/">Home</Link>{links.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}<Link href="/contact">Contact</Link></nav></details></header>}
