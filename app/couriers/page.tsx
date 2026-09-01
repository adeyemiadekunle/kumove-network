import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Check,
  Clock3,
  Route as RouteIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'KuCourier',
  description:
    'See the route, the pay and the distance before you accept. Kumove gives independent couriers the visibility and support to turn city time into dependable income.',
};

export default function CouriersPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-lime" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">KuCourier</span>
            <h1 id="audience-heading" className="page-title">Earn on your terms.<br /><em>Move with purpose.</em></h1>
            <p className="page-copy">See the route, the pay and the distance before you accept. Kumove gives independent couriers the visibility and support to turn city time into dependable income.</p>
            <a className="button-primary" href="mailto:hello@kumove.city?subject=KuCourier%20interest">
              Join KuCourier <ArrowRight size={16} />
            </a>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">A route that respects you</span>
            <h2>More clarity at every corner.</h2>
            <div className="panel-rows">
              <div className="panel-row"><span>Route visibility</span><strong>before accept</strong></div>
              <div className="panel-row"><span>Typical window</span><strong>2–4 hours</strong></div>
              <div className="panel-row"><span>Support response</span><strong>under 4 min</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / KuCourier movement</span>
            <h2>Good work starts with good information.</h2>
            <p>Your time matters. Every courier assignment is shaped by location, capacity, route compatibility and the shipment details you need to do a good job.</p>
          </div>
          <div className="audience-feature-image relative mb-10 aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/7]">
            <Image src="/images/courier-pickup-africa.png" alt="African courier receiving a parcel from a local shop" fill sizes="(max-width: 1024px) 100vw, 1200px" className="object-cover" />
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-card-icon"><Check size={22} /></span>
              <span className="benefit-card-number">01</span>
              <p>Choose windows that fit around your actual life.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><RouteIcon size={22} /></span>
              <span className="benefit-card-number">02</span>
              <p>Get routes grouped around real neighborhood demand.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><Clock3 size={22} /></span>
              <span className="benefit-card-number">03</span>
              <p>Have a clear person to call when a delivery gets complicated.</p>
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
