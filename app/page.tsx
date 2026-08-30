import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, MapPin, PackageCheck, Route as RouteIcon, ShieldCheck, Store } from 'lucide-react';
import { SiteFrame } from '@/components/site/SiteFrame';
import { LagosDeliveryMap } from '@/components/site/LagosDeliveryMap';

export const metadata: Metadata = {
  title: 'Urban delivery, redrawn',
  description: 'Kumove connects businesses, customers, KuCouriers, KuDrivers and KuStops into a smarter city delivery network.',
};

function NetworkVisual() {
  return (
    <div className="network-visual" role="img" aria-label="Animated KuMove city map showing a delivery moving between local network stops">
      <div className="city-map" aria-hidden="true">
        <span className="map-block block-a" /><span className="map-block block-b" /><span className="map-block block-c" /><span className="map-block block-d" /><span className="map-block block-e" /><span className="map-block block-f" />
        <span className="map-street street-a" /><span className="map-street street-b" /><span className="map-street street-c" /><span className="map-street street-d" /><span className="map-street street-e" />
        <span className="map-line one" /><span className="map-line two" /><span className="map-line three" /><span className="map-line four" />
        <span className="map-stop stop-a" /><span className="map-stop stop-b" /><span className="map-stop stop-c" /><span className="map-stop stop-d" />
        <span className="moving-dot" /><PackageCheck className="moving-package" size={18} />
      </div>
      <span className="network-label">Live city network / 04</span>
      <div className="network-card"><small>Route health</small><strong>Moving well</strong><span>+ 12.4% this week</span></div>
    </div>
  );
}

function Ticker() {
  return <div className="ticker" aria-label="KuMove network principles"><div className="ticker-track">{[1, 2].map((set) => <div className="ticker-item" key={set}><span>Local routes</span><span>Human handoffs</span><span>Useful updates</span><span>Less empty miles</span><span>More city in every delivery</span></div>)}</div></div>;
}

const services = [
  { href: '/business', icon: Store, kicker: 'KuMove for business', title: 'Turn checkout into a local advantage.', copy: 'Give customers delivery and collection choices that fit the way they actually live.', featured: true },
  { href: '/couriers', icon: PackageCheck, kicker: 'KuCourier', title: 'Earn with a clearer route.', copy: 'See the work before you accept it and keep control of your time.' },
  { href: '/drivers', icon: RouteIcon, kicker: 'KuDriver', title: 'Make every mile count.', copy: 'Move consolidated capacity between the nodes that keep the city moving.' },
  { href: '/pitstops', icon: MapPin, kicker: 'KuStops', title: 'Put your corner of the city to work.', copy: 'Become a trusted collection point for the people already passing by.' },
  { href: '/track', icon: ShieldCheck, kicker: 'For customers', title: 'Know what is next.', copy: 'Track a delivery through every handoff, from address to arrival.' },
];

export default function HomePage() {
  return <SiteFrame>
    <section className="hero" aria-labelledby="home-heading"><div className="container-wide hero-grid"><div><div className="eyebrow reveal">Delivery, redrawn</div><h1 className="reveal delay-1" id="home-heading">Your city,<br /><em>in motion.</em></h1><p className="hero-copy reveal delay-2">KuMove is the delivery network that makes online orders feel local — pairing brilliant businesses with trusted people, smarter routes and the places you already know.</p><div className="hero-actions reveal delay-3"><Link className="button-primary" href="/business" data-testid="button-partner-with-kumove">For business <ArrowDownRight size={16} /></Link><Link className="button-quiet" href="/about" data-testid="button-see-the-route">See the route</Link></div><div className="hero-note"><span className="pulse" />Built for the rhythm of real neighborhoods</div></div><LagosDeliveryMap /></div></section>
    <Ticker />
    <section className="section section-tinted" aria-labelledby="network-heading"><div className="container-wide"><div className="section-heading"><span className="section-index">01 / The network</span><h2 id="network-heading">A better delivery day starts on your street.</h2><p>The last mile should not feel like an afterthought. KuMove turns scattered journeys into one coordinated city system — with more choice for customers and more value staying local.</p></div><div className="network-story"><div className="story-quote">“Fast is good. Useful is better.”</div><p className="story-aside">A business, a KuCourier, a KuDriver and a KuStop each see a different part of the route. KuMove brings them into focus, so every handoff feels simple, visible and worth making.</p></div><div className="stat-band"><div className="stat"><strong>01</strong><span>address-first by design</span></div><div className="stat"><strong>05</strong><span>postcode segments in every route</span></div><div className="stat"><strong>1</strong><span>shared movement layer</span></div><div className="stat"><strong>24/7</strong><span>clear tracking, no guesswork</span></div></div></div></section>
    <section className="section" aria-labelledby="products-heading"><div className="container-wide"><div className="section-heading"><span className="section-index">02 / Delivery products</span><h2 id="products-heading">One network. Clearer ways in.</h2><p>Each KuMove product has a job to do. Together they make the Kunemi network useful to the people who move parcels, and the people waiting for them.</p></div><div className="service-grid">{services.map(({ href, icon: Icon, kicker, title, copy, featured }) => <Link className={`service-card ${featured ? 'featured' : ''}`} href={href} key={href}><div><span className="service-icon"><Icon size={20} /></span><div className="service-kicker">{kicker}</div><h3>{title}</h3><p>{copy}</p></div><span className="service-arrow"><ArrowRight size={17} /></span></Link>)}</div></div></section>
  </SiteFrame>;
}
