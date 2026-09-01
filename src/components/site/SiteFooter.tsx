import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BrandMark } from './BrandMark';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <Link href="/" data-testid="link-footer-home">
              <BrandMark />
            </Link>
            <p className="footer-intro">
              The delivery network for people, parcels and the places in between.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <Link href="/business" data-testid="link-footer-business">For business</Link>
              <Link href="/kudrivers" data-testid="link-footer-kudrivers">KuDriver</Link>
              <Link href="/couriers" data-testid="link-footer-couriers">KuCourier</Link>
              <Link href="/kustops" data-testid="link-footer-kustops">KuStops</Link>
              <Link href="/customers" data-testid="link-footer-customers">For customers</Link>
            </div>
          </div>
          <div>
            <h4>Useful</h4>
            <div className="footer-links">
              <Link href="/track" data-testid="link-footer-track">Track an order</Link>
              <Link href="/about" data-testid="link-footer-about">Our route</Link>
              <a href="mailto:hello@kumove.city" data-testid="link-footer-contact">Contact the team</a>
            </div>
          </div>
          <div>
            <h4>Start a conversation</h4>
            <div className="footer-links">
              <a className="footer-email" href="mailto:hello@kumove.city" data-testid="link-footer-email">
                <span>hello@kumove.city</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>
              <span className="footer-note">A little movement goes a long way.</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kumove Network</span>
          <span>Powered by Kunemi logistics intelligence</span>
          <Link href="/">Back to home ↑</Link>
        </div>
      </div>
    </footer>
  );
}
