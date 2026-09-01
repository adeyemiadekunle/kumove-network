import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Leaf,
  MapPin,
  Route as RouteIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'KuDriver',
  alternates: { canonical: '/kudrivers' },
  description:
    'Put good planning behind every shift. Kumove builds denser, cleaner routes for owner-drivers.',
};

const benefits = [
  {
    icon: RouteIcon,
    num: '01',
    title: 'Intercity capacity',
    desc: 'Move intercity shipments between the nodes that need capacity.',
  },
  {
    icon: MapPin,
    num: '02',
    title: 'Stop-by-stop clarity',
    desc: 'See stop-by-stop details across merchants, hubs and KuStops.',
  },
  {
    icon: Leaf,
    num: '03',
    title: 'Lighter footprint',
    desc: 'Cut empty miles and build a lighter footprint per parcel.',
  },
];

export default function KuDriversPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-ink" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">KuDriver</span>
            <h1 id="audience-heading" className="page-title">
              A full van is not<br /><em>a full day.</em>
            </h1>
            <p className="page-copy">
              Put good planning behind every shift. Kumove builds denser, cleaner routes for owner-drivers who know the best delivery is the one that does not need to be repeated.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                <a href="mailto:hello@kumove.city?subject=KuDriver%20interest">
                  Join KuDriver <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="opportunity-panel audience-panel">
            <Badge variant="secondary" className="mb-4 font-mono-brand text-[10px] uppercase tracking-widest">
              KuDriver capacity
            </Badge>
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

          {/* Responsive Feature Image Container */}
          <div className="group relative my-8 sm:my-10 md:my-12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-md transition-shadow duration-300 hover:shadow-xl">
            <Image
              src="/images/driver-loading-africa.png"
              alt="African driver loading parcels into a delivery van"
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

      <section className="section section-tinted">
        <div className="container-wide cta-band">
          <div>
            <span className="section-index">Next on the route</span>
            <h2>Built to meet the moment after "go".</h2>
          </div>
          <Button asChild size="lg" className="rounded-full px-5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all w-fit">
            <Link href="/about">
              See how Kumove works <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteFrame>
  );
}
