import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowRight,
  Inbox,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'KuStops',
  description:
    'Become the friendly face between a parcel and its front door. KuStops make delivery more flexible for neighbors.',
};

const benefits = [
  {
    icon: Inbox,
    num: '01',
    title: 'Simple to manage',
    desc: 'Handle check-in, storage and collection without changing your whole business.',
  },
  {
    icon: Users,
    num: '02',
    title: 'Community trust',
    desc: 'Offer a service your regulars can trust by name.',
  },
  {
    icon: Sparkles,
    num: '03',
    title: 'Earn per parcel',
    desc: 'Earn from every parcel while helping neighbors collect on their terms.',
  },
];

export default function KuStopsPage() {
  return (
    <SiteFrame>
      <section className="page-hero audience-hero audience-teal" aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">KuStops</span>
            <h1 id="audience-heading" className="page-title">
              The corner shop,<br /><em>with a new role.</em>
            </h1>
            <p className="page-copy">
              Become the friendly face between a parcel and its front door. KuStops make delivery more flexible for neighbors and bring useful footfall to the places that give a street its character.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                <a href="mailto:hello@kumove.city?subject=KuStops%20interest">
                  Become a KuStop <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="opportunity-panel audience-panel">
            <Badge variant="secondary" className="mb-4 font-mono-brand text-[10px] uppercase tracking-widest">
              The KuStops layer
            </Badge>
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

          {/* Responsive Feature Image Container */}
          <div className="group relative my-8 sm:my-10 md:my-12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-md transition-shadow duration-300 hover:shadow-xl">
            <Image
              src="/images/local-pickup-africa.png"
              alt="African shopkeeper handing a parcel to a customer at a KuStop"
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
