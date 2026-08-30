import {
  ArrowRight,
  Check,
  Clock3,
  Inbox,
  Leaf,
  MapPin,
  PackageCheck,
  Route as RouteIcon,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';
import { SiteFrame } from '@/components/site/SiteFrame';

type AudiencePageProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  actionLabel: string;
  actionHref: string;
  accent: 'teal' | 'lime' | 'ink';
  panelTitle: string;
  panelTag: string;
  rows: Array<[string, string]>;
  benefits: Array<{ icon: React.ReactNode; copy: string }>;
  sectionLabel: string;
  sectionTitle: string;
  sectionCopy: string;
};

function AudiencePage({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  accent,
  panelTitle,
  panelTag,
  rows,
  benefits,
  sectionLabel,
  sectionTitle,
  sectionCopy,
}: AudiencePageProps) {
  return (
    <SiteFrame title={eyebrow} description={description}>
      <section className={`page-hero audience-hero audience-${accent}`} aria-labelledby="audience-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 id="audience-heading" className="page-title">{title}</h1>
            <p className="page-copy">{description}</p>
            <Link className="button-primary" href={actionHref} data-testid={`button-${accent}-primary`}>
              {actionLabel} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">{panelTag}</span>
            <h2>{panelTitle}</h2>
            <div className="panel-rows">
              {rows.map(([label, value]) => (
                <div className="panel-row" key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          <div className="section-heading">
            <span className="section-index">{sectionLabel}</span>
            <h2>{sectionTitle}</h2>
            <p>{sectionCopy}</p>
          </div>
          <div className="benefit-grid">
            {benefits.map((benefit, index) => (
              <article className="benefit-card" key={index}>
                <span className="benefit-card-icon">{benefit.icon}</span>
                <span className="benefit-card-number">0{index + 1}</span>
                <p>{benefit.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container-wide cta-band">
          <div>
            <span className="section-index">Next on the route</span>
            <h2>Built to meet the moment after “go”.</h2>
          </div>
          <Link className="button-primary" href="/about">See how Kumove works <ArrowRight size={16} /></Link>
        </div>
      </section>
    </SiteFrame>
  );
}

function RetailersPage() {
  return (
    <AudiencePage
      eyebrow="Kumove for retailers"
      title={<>Your checkout,<br /><em>with a local edge.</em></>}
      description="Give customers delivery and collection choices that feel as thoughtful as the products they came for. Kumove handles the moving parts from dispatch to doorstep."
      actionLabel="Start a partnership"
      actionHref="mailto:hello@kumove.city?subject=Retailer%20partnership"
      accent="teal"
      panelTag="Retail + commerce"
      panelTitle="Keep the promise after “buy now”."
      rows={[['Delivery options', 'same / next day'], ['Customer updates', 'branded + useful'], ['Operational view', 'one shared route']]}
      sectionLabel="01 / Merchant movement"
      sectionTitle="Less chasing. More sending."
      sectionCopy="Kumove gives merchant teams a clean operating layer for bulk shipments, tracking, returns and the decisions that keep customers close."
      benefits={[
        { icon: <Store size={22} />, copy: 'Offer delivery, collection and returns from one connected network.' },
        { icon: <PackageCheck size={22} />, copy: 'Keep every shipment visible across hubs, pitstops, drivers and couriers.' },
        { icon: <ShieldCheck size={22} />, copy: 'Give customers a delivery experience that looks and feels like your brand.' },
      ]}
    />
  );
}

function CouriersPage() {
  return (
    <AudiencePage
      eyebrow="Kumove for couriers"
      title={<>Earn on your terms.<br /><em>Move with purpose.</em></>}
      description="See the route, the pay and the distance before you accept. Kumove gives independent couriers the visibility and support to turn city time into dependable income."
      actionLabel="I want to move"
      actionHref="mailto:hello@kumove.city?subject=Courier%20interest"
      accent="lime"
      panelTag="A route that respects you"
      panelTitle="More clarity at every corner."
      rows={[['Route visibility', 'before accept'], ['Typical window', '2–4 hours'], ['Support response', 'under 4 min']]}
      sectionLabel="01 / Courier movement"
      sectionTitle="Good work starts with good information."
      sectionCopy="Your time matters. Every courier assignment is shaped by location, capacity, route compatibility and the shipment details you need to do a good job."
      benefits={[
        { icon: <Check size={22} />, copy: 'Choose windows that fit around your actual life.' },
        { icon: <RouteIcon size={22} />, copy: 'Get routes grouped around real neighborhood demand.' },
        { icon: <Clock3 size={22} />, copy: 'Have a clear person to call when a delivery gets complicated.' },
      ]}
    />
  );
}

function DriversPage() {
  return (
    <AudiencePage
      eyebrow="Kumove for drivers"
      title={<>A full van is not<br /><em>a full day.</em></>}
      description="Put good planning behind every shift. Kumove builds denser, cleaner routes for owner-drivers who know the best delivery is the one that does not need to be repeated."
      actionLabel="Talk to the fleet team"
      actionHref="mailto:hello@kumove.city?subject=Driver%20interest"
      accent="ink"
      panelTag="For van drivers"
      panelTitle="Make the city work smarter, mile by mile."
      rows={[['Consolidated drops', 'fewer detours'], ['Loading guidance', 'live bay info'], ['Proof at the door', 'every time']]}
      sectionLabel="01 / Driver capacity"
      sectionTitle="The route is your working capital."
      sectionCopy="Kunemi matches available capacity to the shipments, nodes and corridors that make operational sense — so your vehicle works harder without the day becoming chaotic."
      benefits={[
        { icon: <RouteIcon size={22} />, copy: 'Move intercity shipments between the nodes that need capacity.' },
        { icon: <MapPin size={22} />, copy: 'See stop-by-stop details across merchants, hubs and pitstops.' },
        { icon: <Leaf size={22} />, copy: 'Cut empty miles and build a lighter footprint per parcel.' },
      ]}
    />
  );
}

function PitstopsPage() {
  return (
    <AudiencePage
      eyebrow="Kumove pitstops"
      title={<>The corner shop,<br /><em>with a new role.</em></>}
      description="Become the friendly face between a parcel and its front door. Pitstops make delivery more flexible for neighbors and bring useful footfall to the places that give a street its character."
      actionLabel="Become a pitstop"
      actionHref="mailto:hello@kumove.city?subject=Pitstop%20interest"
      accent="teal"
      panelTag="The neighborhood layer"
      panelTitle="A trusted place to collect."
      rows={[['Customer handoff', 'simple + clear'], ['Network role', 'local node'], ['Parcel visibility', 'scan to scan']]}
      sectionLabel="01 / PUDO network"
      sectionTitle="Your space can make the whole route better."
      sectionCopy="PUDO points connect the postcode layer to real places. Kumove gives your team simple tools for check-in, storage, notification and secure collection."
      benefits={[
        { icon: <Inbox size={22} />, copy: 'Handle check-in, storage and collection without changing your whole business.' },
        { icon: <Users size={22} />, copy: 'Offer a service your regulars can trust by name.' },
        { icon: <SparklesIcon />, copy: 'Earn from every parcel while helping neighbors collect on their terms.' },
      ]}
    />
  );
}

function SparklesIcon() {
  return <span className="icon-glyph">✦</span>;
}

export { RetailersPage, CouriersPage, DriversPage, PitstopsPage };