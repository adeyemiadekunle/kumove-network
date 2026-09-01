'use client';

import Image from 'next/image';
import { MapPin, Route as RouteIcon, ShieldCheck } from 'lucide-react';
import { SiteFrame } from '@/components/site/SiteFrame';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LagosNetworkMap } from '@/components/site/LagosNetworkMap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const principles = [
  {
    icon: MapPin,
    title: 'Address first',
    desc: 'Postcode segments, location confidence and access notes travel with the shipment from the start.',
  },
  {
    icon: RouteIcon,
    title: 'Sorting is the intelligence',
    desc: 'Geography, capacity, zone rules and route compatibility shape the next best handoff.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust is an event trail',
    desc: 'GPS, postcode, OTP, timestamp and actor identity create evidence across the chain of custody.',
  },
];

export default function AboutClient() {
  return (
    <SiteFrame>
      <section className="page-hero section-tinted" aria-labelledby="about-heading">
        <div className="container-wide page-hero-grid">
          <div>
            <span className="eyebrow">Kumove / Kunemi</span>
            <h1 id="about-heading" className="page-title">
              A city that<br /><em>moves together.</em>
            </h1>
          </div>

          {/* Hero Responsive Image */}
          <div className="group relative my-4 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-muted shadow-md transition-shadow duration-300 hover:shadow-xl">
            <Image
              src="/images/about-community-africa.png"
              alt="African delivery partners gathered outside a neighborhood shop"
              fill
              sizes="(max-width: 699px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <Badge className="absolute bottom-4 left-4 z-10 font-mono-brand text-[10px] uppercase tracking-wider bg-primary/90 text-primary-foreground backdrop-blur-sm">
              People / Place / Progress
            </Badge>
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

          {/* Principles Banner Image */}
          <LagosNetworkMap className="about-route-map" />

          {/* Principle Cards leveraging shadcn Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-border/80 bg-card/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary hover:shadow-md"
                >
                  <CardHeader className="p-0 pb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-secondary transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-display pt-5 text-xl tracking-tight text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-1">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-wide">
          <div className="architecture-band">
            <div>
              <span className="section-index">02 / The movement layer</span>
              <h2 className="page-title page-title-light">
                Address.<br />Sort.<br /><em>Move.</em>
              </h2>
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

            {/* shadcn UI Accordion for FAQ */}
            <Accordion type="single" collapsible className="w-full space-y-3 pt-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border/80 bg-card/60 px-5 py-1 backdrop-blur-sm transition-colors hover:border-secondary/60"
                >
                  <AccordionTrigger className="font-sans text-base font-semibold text-foreground hover:text-secondary hover:no-underline" data-testid={`button-faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
