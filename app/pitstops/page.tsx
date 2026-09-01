import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Inbox,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'KuStops',
  description:
    'Become the friendly face between a parcel and its front door. Pitstops make delivery more flexible for neighbors.',
};

function SparklesIcon() {
  return <span className="icon-glyph">✦</span>;
}

export default function PitstopsPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-teal" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">KuStops</span>
            <h1 id="audience-heading" className="page-title">The corner shop,<br /><em>with a new role.</em></h1>
            <p className="page-copy">Become the friendly face between a parcel and its front door. Pitstops make delivery more flexible for neighbors and bring useful footfall to the places that give a street its character.</p>
            <a className="button-primary" href="mailto:hello@kumove.city?subject=KuStops%20interest">
              Become a KuStop <ArrowRight size={16} />
            </a>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">The KuStops layer</span>
            <h2>A trusted place to collect.</h2>
            <div className="panel-rows">
              <div className="panel-row"><span>Customer handoff</span><strong>simple + clear</strong></div>
              <div className="panel-row"><span>Network role</span><strong>local node</strong></div>
              <div className="panel-row"><span>Parcel visibility</span><strong>scan to scan</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / KuStops network</span>
            <h2>Your space can make the whole route better.</h2>
            <p>PUDO points connect the postcode layer to real places. Kumove gives your team simple tools for check-in, storage, notification and secure collection.</p>
          </div>
          <div className="audience-feature-image relative mb-10 aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/7]">
            <Image src="/images/local-pickup-africa.png" alt="African shopkeeper handing a parcel to a customer at a KuStop" fill sizes="(max-width: 1024px) 100vw, 1200px" className="object-cover" />
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-card-icon"><Inbox size={22} /></span>
              <span className="benefit-card-number">01</span>
              <p>Handle check-in, storage and collection without changing your whole business.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><Users size={22} /></span>
              <span className="benefit-card-number">02</span>
              <p>Offer a service your regulars can trust by name.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><SparklesIcon /></span>
              <span className="benefit-card-number">03</span>
              <p>Earn from every parcel while helping neighbors collect on their terms.</p>
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
