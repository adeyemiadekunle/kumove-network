import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Clock3,
  MapPin,
  PackageCheck,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Delivery that fits your day',
  description: 'Choose delivery, collection and useful updates through Kumove.',
};

const benefits = [
  {
    icon: PackageCheck,
    num: '01',
    title: 'Real-time updates',
    desc: 'See the latest handoff, not just a vague "on the way".',
  },
  {
    icon: MapPin,
    num: '02',
    title: 'Pick-up flexibility',
    desc: 'Choose a KuStop when a local collection point suits you better.',
  },
  {
    icon: Clock3,
    num: '03',
    title: 'Fewer failed attempts',
    desc: 'Get updates that help you plan, with fewer missed-door attempts.',
  },
];

export default function CustomersPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-teal" aria-labelledby="customers-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">For customers</span>
            <h1 id="customers-heading" className="page-title">
              Delivery that fits<br /><em>your day.</em>
            </h1>
            <p className="page-copy">
              Get the parcel without giving up the whole day. Kumove lets you follow the route, choose a trusted
              collection point and see what is happening next.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg" className="rounded-full px-5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all" data-testid="button-customer-track">
                <Link href="/track">
                  Track a delivery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-5 py-4 text-sm font-bold transition-all" data-testid="button-customer-stops">
                <Link href="/kustops">
                  See KuStops
                </Link>
              </Button>
            </div>
          </div>
          <div className="opportunity-panel audience-panel">
            <Badge variant="secondary" className="mb-4 font-mono-brand text-[10px] uppercase tracking-widest">
              Your delivery, your choice
            </Badge>
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

          {/* Responsive Feature Image Container */}
          <div className="group relative my-8 sm:my-10 md:my-12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-md transition-shadow duration-300 hover:shadow-xl">
            <Image
              src="/images/customer-delivery-africa.png"
              alt="African customer receiving a parcel from a courier"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Benefit Cards leveraging shadcn Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.num}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-border/80 bg-card/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary hover:shadow-md"
                >
                  <CardHeader className="p-0 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-secondary transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary/15">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="font-mono-brand text-[10px] text-muted-foreground">
                        {item.num}
                      </Badge>
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
    </SiteFrame>
  );
}
