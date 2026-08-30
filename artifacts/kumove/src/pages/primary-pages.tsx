import { type FormEvent, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Inbox,
  Leaf,
  MapPin,
  PackageCheck,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';
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

function NetworkVisual() {
  return (
    <div className="network-visual" aria-label="Illustrated Kumove city delivery network">
      <span className="network-label">Live city network / 04</span>
      <span className="map-line one" />
      <span className="map-line two" />
      <span className="map-line three" />
      <span className="map-line four" />
      <span className="map-stop stop-a" />
      <span className="map-stop stop-b" />
      <span className="map-stop stop-c" />
      <span className="map-stop stop-d" />
      <span className="moving-dot" />
      <div className="network-card">
        <small>Route health</small>
        <strong>Moving well</strong>
        <span>+ 12.4% this week</span>
      </div>
    </div>
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

function HomePage() {
  return (
    <SiteFrame
      title="Urban delivery, redrawn"
      description="Kumove connects businesses, customers, KuCouriers, KuDrivers and KuStops into a smarter city delivery network."
    >
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
              Kumove is the delivery network that makes online orders feel local — pairing brilliant
               businesses with trusted people, smarter routes and the places you already know.
            </p>
            <div className="hero-actions reveal delay-3">
              <Link className="button-primary" href="/business" data-testid="button-partner-with-kumove">
                For business <ArrowDownRight size={16} />
              </Link>
              <Link className="button-quiet" href="/about" data-testid="button-see-the-route">
                See the route
              </Link>
            </div>
            <div className="hero-note">
              <span className="pulse" />
              Built for the rhythm of real neighborhoods
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
            <div className="story-quote">“Fast is good. Useful is better.”</div>
            <p className="story-aside">
               A business, a KuCourier, a KuDriver and a KuStop each see a different part of
              the route. Kumove brings them into focus, so every handoff feels simple, visible and worth making.
            </p>
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
          <div className="service-grid">
            <Link className="service-card featured" href="/business">
              <div>
                <span className="service-icon"><Store size={20} /></span>
                <div className="service-kicker">Kumove for business</div>
                <h3>Turn checkout into a local advantage.</h3>
                <p>Give customers delivery and collection choices that fit the way they actually live.</p>
              </div>
              <span className="service-arrow"><ArrowRight size={17} /></span>
            </Link>
            <Link className="service-card" href="/couriers">
              <div>
                <span className="service-icon"><PackageCheck size={20} /></span>
                <div className="service-kicker">KuCourier</div>
                <h3>Earn with a clearer route.</h3>
                <p>See the work before you accept it and keep control of your time.</p>
              </div>
              <span className="service-arrow"><ArrowRight size={17} /></span>
            </Link>
            <Link className="service-card" href="/drivers">
              <div>
                <span className="service-icon"><RouteIcon size={20} /></span>
                <div className="service-kicker">KuDriver</div>
                <h3>Make every mile count.</h3>
                <p>Move consolidated capacity between the nodes that keep the city moving.</p>
              </div>
              <span className="service-arrow"><ArrowRight size={17} /></span>
            </Link>
            <Link className="service-card" href="/pitstops">
              <div>
                <span className="service-icon"><MapPin size={20} /></span>
                <div className="service-kicker">KuStops</div>
                <h3>Put your corner of the city to work.</h3>
                <p>Become a trusted collection point for the people already passing by.</p>
              </div>
              <span className="service-arrow"><ArrowRight size={17} /></span>
            </Link>
            <Link className="service-card" href="/track">
              <div>
                <span className="service-icon"><ShieldCheck size={20} /></span>
                <div className="service-kicker">For customers</div>
                <h3>Know what is next.</h3>
                <p>Track a delivery through every handoff, from address to arrival.</p>
              </div>
              <span className="service-arrow"><ArrowRight size={17} /></span>
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function CustomersPage() {
  return (
    <SiteFrame
      title="Delivery that fits your day"
      description="Choose delivery, collection and useful updates through Kumove."
    >
      <section className="page-hero audience-hero audience-teal" aria-labelledby="customers-heading">
        <div className="container-wide audience-hero-grid">
          <div>
            <span className="eyebrow">For customers</span>
            <h1 id="customers-heading" className="page-title">Delivery that fits<br /><em>your day.</em></h1>
            <p className="page-copy">
              Get the parcel without giving up the whole day. Kumove lets you follow the route, choose a trusted
              collection point and see what is happening next.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/track" data-testid="button-customer-track">
                Track a delivery <ArrowRight size={16} />
              </Link>
              <Link className="button-quiet" href="/pitstops" data-testid="button-customer-stops">
                See KuStops
              </Link>
            </div>
          </div>
          <div className="opportunity-panel audience-panel">
            <span className="panel-tag">Your delivery, your choice</span>
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
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-card-icon"><PackageCheck size={22} /></span>
              <span className="benefit-card-number">01</span>
              <p>See the latest handoff, not just a vague “on the way”.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><MapPin size={22} /></span>
              <span className="benefit-card-number">02</span>
              <p>Choose a KuStop when a local collection point suits you better.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-card-icon"><Clock3 size={22} /></span>
              <span className="benefit-card-number">03</span>
              <p>Get updates that help you plan, with fewer missed-door attempts.</p>
            </article>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function TrackPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!/^(KM[- ]?)?[A-Z0-9]{5,}$/i.test(normalized)) {
      setStatus('idle');
      setError('Enter a delivery code with at least 5 characters, like KM-7Q4N2.');
      return;
    }
    setError('');
    setStatus('success');
  };

  return (
    <SiteFrame
      title="Track your delivery"
      description="Follow every Kumove delivery handoff from collection to arrival."
    >
      <section className="section section-dark track-section page-hero-space" aria-labelledby="track-heading">
        <div className="container-wide track-grid">
          <div className="route-status">
            <span className="section-index">01 / Track a delivery</span>
            <h1 id="track-heading" className="page-title page-title-light">
              No mystery.
              <br />
              Just <em>movement.</em>
            </h1>
            <p className="page-copy page-copy-light">
              A Kumove update tells you what happened, what is happening and what comes next. Put your feet up
              — we will bring the useful details.
            </p>
            <div className="status-timeline">
              {[
                ['Order collected', 'Your retailer has handed it to the network.'],
                ['On the move', 'A local route is carrying it your way.'],
                ['Ready for you', 'At your door or a pitstop nearby.'],
              ].map(([title, copy], index) => (
                <div className={`status-step ${index === 0 ? 'active' : ''}`} key={title}>
                  <span className="status-marker">{index === 0 ? <Check size={15} /> : index + 1}</span>
                  <div><h4>{title}</h4><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="track-form-card">
            <h2>Find your delivery</h2>
            <p>Use the code from your order confirmation. It usually starts with KM.</p>
            {status === 'success' ? (
              <div className="track-success" role="status" data-testid="status-track-success">
                <Check size={19} />
                <div>
                  <strong>Your delivery is moving.</strong>
                  <br />
                  We found <span className="font-mono-brand">{code.toUpperCase()}</span>. The latest route update is on its way to your inbox.
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <label htmlFor="tracking-code" className="form-label">Delivery code</label>
                <input
                  id="tracking-code"
                  className="track-input"
                  value={code}
                  onChange={(event) => { setCode(event.target.value); setError(''); }}
                  placeholder="e.g. KM-7Q4N2"
                  autoComplete="off"
                  data-testid="input-tracking-code"
                />
                {error && <p className="form-error" role="alert" data-testid="status-track-error">{error}</p>}
                <button className="button-primary track-submit" type="submit" data-testid="button-submit-tracking">
                  Show my delivery <ArrowRight size={16} />
                </button>
              </form>
            )}
            {status === 'success' && (
              <button
                className="button-quiet"
                type="button"
                style={{ width: '100%', marginTop: 11 }}
                onClick={() => { setStatus('idle'); setCode(''); }}
                data-testid="button-track-another"
              >
                Track another delivery
              </button>
            )}
            <div className="support-line">
              <CircleHelp size={14} /> Need a hand? <a href="mailto:hello@kumove.city">Contact support</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container-wide feature-band">
          <div>
            <span className="section-index">02 / Delivery evidence</span>
            <h2 className="section-title">The route is more than a blue dot.</h2>
          </div>
          <p className="page-copy">
            Kunemi keeps a time-stamped event trail across addresses, hubs, KuStops, KuDrivers and KuCouriers.
            That gives customers a useful update, not just a map that says “somewhere on the way”.
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}

function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SiteFrame
      title="The Kumove route"
      description="Learn how Kumove and Kunemi are building a postcode-native delivery network for Nigeria."
    >
      <section className="page-hero section-tinted" aria-labelledby="about-heading">
        <div className="container-wide page-hero-grid">
          <div>
            <span className="eyebrow">Kumove / Kunemi</span>
            <h1 id="about-heading" className="page-title">A city that<br /><em>moves together.</em></h1>
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

export { HomePage, CustomersPage, TrackPage, AboutPage };