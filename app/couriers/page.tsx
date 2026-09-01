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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'KuCourier',
  description:
    'See the route, the pay and the distance before you accept. Kumove gives independent couriers the visibility and support to turn city time into dependable income.',
};

const benefits = [
  {
    icon: Check,
    num: '01',
    title: 'Flexible windows',
    desc: 'Choose windows that fit around your actual life.',
  },
  {
    icon: RouteIcon,
    num: '02',
    title: 'Neighbourhood routes',
    desc: 'Get routes grouped around real neighborhood demand.',
  },
  {
    icon: Clock3,
    num: '03',
    title: 'Real support',
    desc: 'Have a clear person to call when a delivery gets complicated.',
  },
];

export default function CouriersPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-lime" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">KuCourier</span>
            <h1 id="audience-heading" className="page-title">
              Earn on your terms.<br /><em>Move with purpose.</em>
            </h1>
            <p className="page-copy">
              See the route, the pay and the distance before you accept. Kumove gives independent couriers the visibility and support to turn city time into dependable income.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                <a href="mailto:hello@kumove.city?subject=KuCourier%20interest">
                  Join KuCourier <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="opportunity-panel audience-panel">
            <Badge variant="secondary" className="mb-4 font-mono-brand text-[10px] uppercase tracking-widest">
              A route that respects you
            </Badge>
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

          {/* Responsive Feature Image Container */}
          <div className="group relative my-8 sm:my-10 md:my-12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-md transition-shadow duration-300 hover:shadow-xl">
            <Image
              src="/images/courier-pickup-africa.png"
              alt="African courier receiving a parcel from a local shop"
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
