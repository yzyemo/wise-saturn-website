import Link from "next/link";

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><div className="footer-wordmark">WISE SATURN</div><p>Automatic self-cleaning livestock water troughs, designed for Australian farms.</p></div>
      <div className="footer-links"><b>Explore</b><Link href="/product">Product</Link><Link href="/technology">Technology</Link><Link href="/videos">Videos</Link></div>
      <div className="footer-links"><b>Company</b><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></div>
      <div className="footer-contact"><b>Australia</b><a href="tel:+61435694228">0435 694 228</a><a href="mailto:peixing@hotmail.com">peixing@hotmail.com</a><div className="social-links" aria-label="Social media"><span aria-label="LinkedIn coming soon">in</span><span aria-label="YouTube coming soon">▶</span></div></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Wise Saturn</span><span>Australian livestock water systems</span></div>
  </footer>;
}
