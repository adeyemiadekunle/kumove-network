import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Leaf,
  MapPin,
  Route as RouteIcon,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KuDriver',
  description:
    'Put good planning behind every shift. Kumove builds denser, cleaner routes for owner-drivers.',
};

export default function DriversPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-ink" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">KuDriver</span>
            <h1 id="audience-heading" className="page-title">A full van is not<br /><em>a full day.</em></h1>
            <p className="page-copy">Put good planning behind every shift. Kumove builds denser, cleaner routes for owner-drivers who know the best delivery is the one that does not need to be repeated.</p>
            <a className="button-primary" href="mailto:hello@kumove.city?subject=KuDriver%20interest">
              Join KuDriver <ArrowRight size={16} />
            </a>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">KuDriver capacity</span>
            <h2>Make the city work smarter, mile by mile.</h2>
            <div className="panel-rows">
              <div className="panel-row"><span>Consolidated drops</span><strong>fewer detours</strong></div>
              <div className="panel-row"><span>Loading guidance</span><strong>live bay info</strong></div>
              <div className="panel-row"><span>Proof at the door</span><strong>every time</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / KuDriver capacity</span>
            <h2>The route is your working capital.</h2>
            <p>Kunemi matches available capacity to the shipments, nodes and corridors that make operational sense — so your vehicle works harder without the day becoming chaotic.</p>
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-card-icon"><RouteIcon size={22} /></span>
              <span className="benefit-card-number">01</span>
              <p>Move intercity shipments between the nodes that need capacity.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><MapPin size={22} /></span>
              <span className="benefit-card-number">02</span>
              <p>See stop-by-stop details across merchants, hubs and pitstops.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><Leaf size={22} /></span>
              <span className="benefit-card-number">03</span>
              <p>Cut empty miles and build a lighter footprint per parcel.</p>
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
