import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  PackageCheck,
  ShieldCheck,
  Store,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kumove for business',
  description:
    'Give customers delivery and collection choices that feel as thoughtful as the products they came for.',
};

export default function BusinessPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-teal" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">Kumove for business</span>
            <h1 id="audience-heading" className="page-title">Your checkout,<br /><em>with a local edge.</em></h1>
            <p className="page-copy">Give customers delivery and collection choices that feel as thoughtful as the products they came for. Kumove handles the moving parts from dispatch to doorstep for retailers, brands and marketplaces.</p>
            <a className="button-primary" href="mailto:hello@kumove.city?subject=Business%20partnership">
              Talk to the business team <ArrowRight size={16} />
            </a>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">For businesses</span>
            <h2>Keep the promise after "buy now".</h2>
            <div className="panel-rows">
              <div className="panel-row"><span>Delivery options</span><strong>same / next day</strong></div>
              <div className="panel-row"><span>Customer updates</span><strong>branded + useful</strong></div>
              <div className="panel-row"><span>Operational view</span><strong>one shared route</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / Business movement</span>
            <h2>Less chasing. More sending.</h2>
            <p>Kumove gives business teams a clean operating layer for bulk shipments, tracking, returns and the decisions that keep customers close.</p>
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-card-icon"><Store size={22} /></span>
              <span className="benefit-card-number">01</span>
              <p>Offer delivery, collection and returns from one connected network.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><PackageCheck size={22} /></span>
              <span className="benefit-card-number">02</span>
              <p>Keep every shipment visible across hubs, pitstops, drivers and couriers.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><ShieldCheck size={22} /></span>
              <span className="benefit-card-number">03</span>
              <p>Give customers a delivery experience that looks and feels like your brand.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container-wide cta-band">
          <div>
            <span className="section-index">Next on the route</span>
            <h2>Built to meet the moment after "go".</h2>
          </div>
          <Link className="button-primary" href="/about">See how Kumove works <ArrowRight size={16} /></Link>
        </div>
      </section>
    </SiteFrame>
  );
}
