import type { Metadata } from 'next';
import { SiteFrame } from '@/components/site/SiteFrame';
import {
  ArrowDownRight,
  ArrowRight,
  MapPin,
  PackageCheck,
  Route as RouteIcon,
  ShieldCheck,
  Store,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LagosNetworkMap } from '@/components/site/LagosNetworkMap';

export const metadata: Metadata = {
  title: 'Urban delivery, redrawn',
  alternates: { canonical: '/' },
  description:
    'Kumove connects businesses, customers, KuCouriers, KuDrivers and KuStops into a smarter city delivery network.',
};

function NetworkVisual() {
  return (
    <LagosNetworkMap className="hero-network-map" />
  );
}

function Ticker() {
  return (
    <div className="ticker" aria-label="Kumove network principles">
      <div className="ticker-track">
        {[1, 2].map((copySet) => (
          <div className="ticker-item" key={copySet}>
            <span>Local routes</span>
            <span>Human handoffs</span>
            <span>Useful updates</span>
            <span>Less empty miles</span>
            <span>More city in every delivery</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    href: '/business',
    icon: Store,
    kicker: 'Kumove for business',
    title: 'Turn checkout into a local advantage.',
    desc: 'Give customers delivery and collection choices that fit the way they actually live.',
    featured: true,
  },
  {
    href: '/couriers',
    icon: PackageCheck,
    kicker: 'KuCourier',
    title: 'Earn with a clearer route.',
    desc: 'See the work before you accept it and keep control of your time.',
  },
  {
    href: '/kudrivers',
    icon: RouteIcon,
    kicker: 'KuDriver',
    title: 'Make every mile count.',
    desc: 'Move consolidated capacity between the nodes that keep the city moving.',
  },
  {
    href: '/kustops',
    icon: MapPin,
    kicker: 'KuStops',
    title: 'Put your corner of the city to work.',
    desc: 'Become a trusted collection point for the people already passing by.',
  },
  {
    href: '/track',
    icon: ShieldCheck,
    kicker: 'For customers',
    title: 'Know what is next.',
    desc: 'Track a delivery through every handoff, from address to arrival.',
  },
];

export default function HomePage() {
  return (
    <SiteFrame>
      <section className="hero" aria-labelledby="home-heading">
        <div className="container-wide hero-grid">
          <div>
            <div className="eyebrow reveal">Delivery, redrawn</div>
            <h1 className="reveal delay-1" id="home-heading">
              Your city,
              <br />
              <em>in motion.</em>
            </h1>
            <p className="hero-copy reveal delay-2">
              Kumove is a smarter delivery network for businesses and people, connecting couriers, drivers and
              local collection points — whether you are sending an order or a parcel to someone you love.
            </p>
            <div className="hero-actions reveal delay-3">
              <Button asChild size="lg" className="rounded-full px-5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all" data-testid="button-partner-with-kumove">
                <Link href="/business">
                  Partner with Kumove <ArrowDownRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-5 py-4 text-sm font-bold transition-all" data-testid="button-see-the-route">
                <Link href="/about">
                  See the route
                </Link>
              </Button>
            </div>
            <div className="hero-note">
              <span className="pulse" />
              Built for the rhythm of Nigerian neighborhoods
            </div>
            <div className="hero-proof" aria-label="Kumove launch information">
              <span>Postcode-aware</span>
              <span>Local-first</span>
              <span>Built for Nigeria</span>
            </div>
          </div>
          <NetworkVisual />
        </div>
      </section>

      <Ticker />

      <section className="section section-tinted" aria-labelledby="network-heading">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">01 / The network</span>
            <h2 id="network-heading">A better delivery day starts on your street.</h2>
            <p>
              The last mile should not feel like an afterthought. Kumove turns scattered journeys into one
              coordinated city system — with more choice for customers and more value staying local.
            </p>
          </div>
          <div className="network-story">
            <div className="story-quote">"Fast is good. Useful is better."</div>
            <p className="story-aside">
              A business, a KuCourier, a KuDriver and a KuStop each see a different part of
              the route. Kumove brings them into focus, so every handoff feels simple, visible and worth making.
            </p>
          </div>
          <div className="how-it-works" aria-labelledby="how-it-works-heading">
            <div>
              <span className="section-index">How it works</span>
              <h3 id="how-it-works-heading">One parcel. A clearer path.</h3>
            </div>
            <div className="route-steps">
              <div className="route-step"><span>01</span><strong>Start with the address</strong><p>Postcode-aware details make the destination useful from the beginning.</p></div>
              <div className="route-step"><span>02</span><strong>Move through the network</strong><p>Trusted people and local nodes share the work of getting it there.</p></div>
              <div className="route-step"><span>03</span><strong>Arrive with confidence</strong><p>Customers get a clear delivery or collection experience.</p></div>
            </div>
          </div>
          <div className="stat-band">
            <div className="stat"><strong>01</strong><span>address-first by design</span></div>
            <div className="stat"><strong>05</strong><span>postcode segments in every route</span></div>
            <div className="stat"><strong>1</strong><span>shared movement layer</span></div>
            <div className="stat"><strong>24/7</strong><span>clear tracking, no guesswork</span></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="products-heading">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">02 / Delivery products</span>
            <h2 id="products-heading">One network. Clearer ways in.</h2>
            <p>
              Each Kumove product has a job to do. Together they make the Kunemi network useful to the people
              who move parcels, and the people waiting for them.
            </p>
          </div>

          {/* Service Cards Grid with shadcn Card */}
          <div className="service-grid">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className={`service-card ${item.featured ? 'featured' : ''}`}>
                  <div>
                    <span className="service-icon"><Icon size={20} /></span>
                    <div className="service-kicker">{item.kicker}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="service-arrow"><ArrowRight size={17} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
