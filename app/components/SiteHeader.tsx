import Link from "next/link";

const links = [
  ["Product", "/product"],
  ["Technology", "/technology"],
  ["Videos", "/videos"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Wise Saturn home">
        <img src="/brand/logo/wise-saturn-logo-primary.png" alt="" />
        <span><b>WISE</b> SATURN</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="/contact">Get in touch <span>↗</span></Link>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span/><span/></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </details>
    </header>
  );
}

