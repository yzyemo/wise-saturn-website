import Link from "next/link";

export default function NotFound() {
  return <main className="not-found page-shell"><span>404</span><h1>That page is not here.</h1><p>Return to Wise Saturn to continue exploring the product.</p><Link className="button button-dark" href="/">Back to home</Link></main>;
}
