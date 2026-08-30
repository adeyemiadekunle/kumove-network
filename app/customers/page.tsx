import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Clock3,
  MapPin,
  PackageCheck,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Delivery that fits your day',
  description: 'Choose delivery, collection and useful updates through Kumove.',
};

export default function CustomersPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-teal" aria-labelledby="customers-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">For customers</span>
            <h1 id="customers-heading" className="page-title">Delivery that fits<br /><em>your day.</em></h1>
            <p className="page-copy">
              Get the parcel without giving up the whole day. Kumove lets you follow the route, choose a trusted
              collection point and see what is happening next.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/track" data-testid="button-customer-track">
                Track a delivery <ArrowRight size={16} />
              </Link>
              <Link className="button-quiet" href="/pitstops" data-testid="button-customer-stops">
                See KuStops
              </Link>
            </div>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">Your delivery, your choice</span>
            <h2>Not home? No problem.</h2>
            <div className="panel-rows">
              <div className="panel-row"><span>Door delivery</span><strong>clear windows</strong></div>
              <div className="panel-row"><span>KuStops collection</span><strong>nearby + flexible</strong></div>
              <div className="panel-row"><span>Route updates</span><strong>useful, not noisy</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="customer-options-heading">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / Your options</span>
            <h2 id="customer-options-heading">A delivery experience that gives time back.</h2>
            <p>Whether you are waiting at home, collecting around the corner or checking in between meetings, Kumove keeps the useful part close.</p>
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-card-icon"><PackageCheck size={22} /></span>
              <span className="benefit-card-number">01</span>
              <p>See the latest handoff, not just a vague "on the way".</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><MapPin size={22} /></span>
              <span className="benefit-card-number">02</span>
              <p>Choose a KuStop when a local collection point suits you better.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><Clock3 size={22} /></span>
              <span className="benefit-card-number">03</span>
              <p>Get updates that help you plan, with fewer missed-door attempts.</p>
            </article>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
