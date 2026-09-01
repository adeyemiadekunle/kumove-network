'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, MapPin, Route as RouteIcon, ShieldCheck } from 'lucide-react';
import { SiteFrame } from '@/components/site/SiteFrame';

const faqs = [
  {
    question: 'Where does Kumove operate?',
    answer:
      'Kumove launches city by city, starting with dense neighborhoods where local shops, drivers and collection points can make every mile count. Our network expands through verified postcode and operating-zone data.',
  },
  {
    question: 'How does Kunemi fit with Kumove?',
    answer:
      'Kunemi is the logistics intelligence layer behind the delivery products. It connects addresses, postcodes, sorting, routes, dispatch, capacity, tracking and delivery evidence so each product can stay focused on its user.',
  },
  {
    question: 'Can my store use Kumove for same-day delivery?',
    answer:
      'Yes. Kumove connects to the tools you already use and gives your customers a clear local delivery promise. Our partnerships team maps the right service to your catalog, footprint and peak hours.',
  },
  {
    question: 'How does Kumove reduce delivery impact?',
    answer:
      'We group nearby orders, keep handoffs local and give customers a collection option. Fewer half-empty journeys and fewer missed-door attempts means a cleaner route for the whole city.',
  },
];

export default function AboutClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SiteFrame>
      <section className="page-hero section-tinted" aria-labelledby="about-heading">
        <div className="container-wide page-hero-grid">
          <div>
            <span className="eyebrow">Kumove / Kunemi</span>
            <h1 id="about-heading" className="page-title">A city that<br /><em>moves together.</em></h1>
          </div>
          <div className="about-hero-visual">
            <Image
              src="/images/about-community-africa.png"
              alt="African delivery partners gathered outside a neighborhood shop"
              fill
              sizes="(max-width: 699px) 100vw, 45vw"
              className="about-image"
              priority
            />
            <span className="about-image-label">People / Place / Progress</span>
          </div>
          <p className="page-copy">
            Kumove is the delivery product people experience. Kunemi is the postcode-native operating system
            underneath it — turning addresses into routes, routes into handoffs and handoffs into trust.
          </p>
        </div>
      </section>
      <section className="section" aria-labelledby="principles-heading">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / Built on the right primitives</span>
            <h2 id="principles-heading">Useful by design, accountable by default.</h2>
            <p>
              The network starts with the things delivery systems usually treat as details: a canonical address,
              an accountable handoff and the right person with the right scope at the right time.
            </p>
          </div>
          <div className="about-principles-visual">
            <Image
              src="/images/about-route-africa.png"
              alt="African courier and shopkeeper sorting parcels at a local collection point"
              fill
              sizes="(max-width: 699px) 100vw, 50vw"
              className="about-image"
            />
            <span className="about-image-label">The handoff is the product</span>
          </div>
          <div className="principle-grid">
            <article className="principle-card">
              <span className="service-icon"><MapPin size={20} /></span>
              <h3>Address first</h3>
              <p>Postcode segments, location confidence and access notes travel with the shipment from the start.</p>
            </article>
            <article className="principle-card">
              <span className="service-icon"><RouteIcon size={20} /></span>
              <h3>Sorting is the intelligence</h3>
              <p>Geography, capacity, zone rules and route compatibility shape the next best handoff.</p>
            </article>
            <article className="principle-card">
              <span className="service-icon"><ShieldCheck size={20} /></span>
              <h3>Trust is an event trail</h3>
              <p>GPS, postcode, OTP, timestamp and actor identity create evidence across the chain of custody.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container-wide">
          <div className="architecture-band">
            <div>
              <span className="section-index">02 / The movement layer</span>
              <h2 className="page-title page-title-light">Address.<br />Sort.<br /><em>Move.</em></h2>
            </div>
            <div className="architecture-flow">
              {['Postcode', 'Sorting engine', 'KuStops', 'KuCourier / KuDriver', 'Delivery evidence'].map((item, index) => (
                <div className="architecture-step" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="faq-heading">
        <div className="container-wide">
          <div className="faq-wrap faq-wrap-wide">
            <span className="section-index">03 / Questions</span>
            <h2 id="faq-heading" className="section-title">Good questions, straight answers.</h2>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="faq-item" key={faq.question}>
                  <button
                    className="faq-button"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    data-testid={`button-faq-${index}`}
                  >
                    {faq.question}
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease', flex: '0 0 auto' }} />
                  </button>
                  {isOpen && <div className="faq-answer" role="region">{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
