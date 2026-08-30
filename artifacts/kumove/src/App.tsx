import { type FormEvent, type MouseEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Inbox,
  Leaf,
  MapPin,
  Menu,
  MoveUpRight,
  PackageCheck,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type JumpEvent = MouseEvent<HTMLAnchorElement>;

const navItems = [
  { id: 'retailers', label: 'For retailers' },
  { id: 'couriers', label: 'For couriers' },
  { id: 'pitstops', label: 'Pitstops' },
  { id: 'about', label: 'Our route' },
];

const faqs = [
  {
    question: 'Where does Kumove operate?',
    answer:
      'We launch city by city, starting with dense neighborhoods where local shops, drivers and collection points can make every mile count. Join the network and we will let you know when your area is live.',
  },
  {
    question: 'Can my store use Kumove for same-day delivery?',
    answer:
      'Yes. Kumove connects to the tools you already use and gives your customers a clear, local delivery promise. Our partnerships team will map the right service for your catalog, footprint and peak hours.',
  },
  {
    question: 'What makes a good Kumove pitstop?',
    answer:
      'A trusted, easy-to-reach local business with a little room behind the counter. Newsagents, cafés, studios and independent shops all make great pitstops when they are open at the moments their neighborhood needs them.',
  },
  {
    question: 'How does Kumove reduce delivery impact?',
    answer:
      'We group nearby orders, keep handoffs local and give customers a collection option. Fewer half-empty journeys and fewer missed-door attempts means a cleaner route for the whole city.',
  },
];

function jumpTo(id: string, event?: JumpEvent) {
  event?.preventDefault();
  const target = document.getElementById(id);
  if (target) {
    window.history.pushState({}, '', `#${id}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function BrandMark() {
  return (
    <span className="wordmark" aria-label="Kumove home">
      <span className="wordmark-mark" aria-hidden="true" />
      <span>Kumove</span>
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeAndJump = (id: string, event?: JumpEvent) => {
    setMenuOpen(false);
    jumpTo(id, event);
  };

  return (
    <>
      <header className="topbar">
        <div className="nav-wrap">
          <a href="#top" onClick={(event) => jumpTo('top', event)} data-testid="link-home">
            <BrandMark />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                className="nav-link"
                href={`#${item.id}`}
                onClick={(event) => jumpTo(item.id, event)}
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-cta"
              href="#track"
              onClick={(event) => jumpTo('track', event)}
              data-testid="link-track-order"
            >
              Track an order <ArrowRight size={14} />
            </a>
          </nav>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => closeAndJump(item.id, event)}
              data-testid={`link-mobile-${item.id}`}
            >
              {item.label}
              <ChevronRight size={17} />
            </a>
          ))}
          <a href="#track" onClick={(event) => closeAndJump('track', event)} data-testid="link-mobile-track">
            Track an order
            <MoveUpRight size={17} />
          </a>
        </nav>
      )}
    </>
  );
}

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

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-wide hero-grid">
        <div>
          <div className="eyebrow reveal">Delivery, redrawn</div>
          <h1 className="reveal delay-1">
            Your city,
            <br />
            <em>in motion.</em>
          </h1>
          <p className="hero-copy reveal delay-2">
            Kumove is the urban delivery network that makes online orders feel local — pairing brilliant
            retailers with trusted people, smarter routes and the places you already know.
          </p>
          <div className="hero-actions reveal delay-3">
            <a
              className="button-primary"
              href="#retailers"
              onClick={(event) => jumpTo('retailers', event)}
              data-testid="button-partner-with-kumove"
            >
              Partner with Kumove <ArrowDownRight size={16} />
            </a>
            <a
              className="button-quiet"
              href="#about"
              onClick={(event) => jumpTo('about', event)}
              data-testid="button-see-the-route"
            >
              See the route
            </a>
          </div>
          <div className="hero-note">
            <span className="pulse" />
            Built for the rhythm of real neighborhoods
          </div>
        </div>
        <NetworkVisual />
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section section-tinted" aria-labelledby="story-heading">
      <div className="container-wide">
        <div className="section-heading">
          <span className="section-index">01 / The network</span>
          <h2 id="story-heading">A better delivery day starts on your street.</h2>
          <p>
            The last mile should not feel like an afterthought. Kumove turns scattered journeys into one
            coordinated city system — with more choice for customers and more value staying local.
          </p>
        </div>
        <div className="network-story">
          <div className="story-quote">“Fast is good. Useful is better.”</div>
          <p className="story-aside">
            A retailer, a courier, a van driver and a neighborhood pitstop each see a different part of the
            route. Kumove brings them into focus, so every handoff feels simple, visible and worth making.
          </p>
        </div>
        <div className="stat-band">
          <div className="stat">
            <strong>2.4m</strong>
            <span>urban households within reach</span>
          </div>
          <div className="stat">
            <strong>31 min</strong>
            <span>average local handoff window</span>
          </div>
          <div className="stat">
            <strong>1 route</strong>
            <span>for every kind of delivery day</span>
          </div>
          <div className="stat">
            <strong>24/7</strong>
            <span>clear tracking, no guesswork</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RetailersSection() {
  return (
    <section className="section" id="retailers" aria-labelledby="retailer-heading">
      <div className="container-wide">
        <div className="section-heading">
          <span className="section-index">02 / For retailers</span>
          <h2 id="retailer-heading">Your checkout, with a city-sized advantage.</h2>
          <p>
            Offer delivery your customers can understand and your team can actually run. Kumove handles the
            moving parts, from dispatch to doorstep.
          </p>
        </div>
        <div className="service-grid">
          <article className="service-card featured">
            <div>
              <span className="service-icon"><Store size={20} /></span>
              <div className="service-kicker">Retail + commerce</div>
              <h3>Keep the promise after “buy now”.</h3>
              <p>
                Same-day, next-day or collection — give shoppers a local option that reflects how they
                actually live.
              </p>
            </div>
            <a
              className="service-arrow"
              href="#track"
              onClick={(event) => jumpTo('track', event)}
              aria-label="See delivery tracking"
              data-testid="link-retailer-tracking"
            >
              <ArrowRight size={17} />
            </a>
          </article>
          <article className="service-card">
            <div>
              <span className="service-icon"><PackageCheck size={20} /></span>
              <div className="service-kicker">Connected operations</div>
              <h3>Less chasing. More sending.</h3>
              <p>One calm dashboard for handoffs, exceptions and proof of delivery.</p>
            </div>
            <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
          </article>
          <article className="service-card">
            <div>
              <span className="service-icon"><ShieldCheck size={20} /></span>
              <div className="service-kicker">Customer experience</div>
              <h3>Make the last mile yours.</h3>
              <p>Branded updates and useful choices keep customers close to your store.</p>
            </div>
            <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
          </article>
        </div>
      </div>
    </section>
  );
}

function CouriersSection() {
  return (
    <section className="section section-tinted" id="couriers" aria-labelledby="courier-heading">
      <div className="container-wide split-layout">
        <div className="split-copy">
          <span className="section-index">03 / For couriers</span>
          <h2 id="courier-heading">Earn on your terms. Move with purpose.</h2>
          <p>
            Kumove gives independent couriers the routes, visibility and support to turn city time into a
            dependable income — without losing the freedom that brought you here.
          </p>
          <ul className="benefit-list">
            <li><Check size={17} /> See the route, pay and distance before you accept.</li>
            <li><Check size={17} /> Choose windows that fit around your actual life.</li>
            <li><Check size={17} /> Get a real person when a delivery gets complicated.</li>
          </ul>
          <a
            className="button-primary"
            href="mailto:hello@kumove.city?subject=Courier%20interest"
            style={{ marginTop: 28, width: 'fit-content' }}
            data-testid="link-courier-interest"
          >
            I want to move <ArrowRight size={16} />
          </a>
        </div>
        <div className="opportunity-panel">
          <span className="panel-tag">A route that respects you</span>
          <h3>More clarity at every corner.</h3>
          <div className="panel-rows">
            <div className="panel-row"><span>Average route length</span><strong>7.8 km</strong></div>
            <div className="panel-row"><span>Typical active window</span><strong>2–4 hrs</strong></div>
            <div className="panel-row"><span>Support response</span><strong>under 4 min</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DriversSection() {
  return (
    <section className="section" id="drivers" aria-labelledby="driver-heading">
      <div className="container-wide split-layout">
        <div className="opportunity-panel" style={{ background: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}>
          <span className="panel-tag" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>For van drivers</span>
          <h3>Make the city work smarter, mile by mile.</h3>
          <div className="panel-rows">
            <div className="panel-row"><span>Consolidated drops</span><strong style={{ color: 'hsl(var(--secondary-foreground))' }}>fewer detours</strong></div>
            <div className="panel-row"><span>Loading guidance</span><strong style={{ color: 'hsl(var(--secondary-foreground))' }}>live bay info</strong></div>
            <div className="panel-row"><span>Proof at the door</span><strong style={{ color: 'hsl(var(--secondary-foreground))' }}>every time</strong></div>
          </div>
        </div>
        <div className="split-copy">
          <span className="section-index">04 / For drivers</span>
          <h2 id="driver-heading">A full van is not the same as a full day.</h2>
          <p>
            Put good planning behind every shift. Kumove builds denser, cleaner routes for van drivers who
            know that the best delivery is the one that does not need to be repeated.
          </p>
          <ul className="benefit-list">
            <li><RouteIcon size={17} /> Routes grouped around real neighborhood demand.</li>
            <li><Clock3 size={17} /> Predictable schedules with clear stop-by-stop details.</li>
            <li><Leaf size={17} /> Fewer empty miles and a lighter footprint per parcel.</li>
          </ul>
          <a
            className="button-quiet"
            href="mailto:hello@kumove.city?subject=Driver%20interest"
            style={{ marginTop: 28, width: 'fit-content' }}
            data-testid="link-driver-interest"
          >
            Talk to the fleet team <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function PitstopsSection() {
  return (
    <section className="section section-tinted" id="pitstops" aria-labelledby="pitstop-heading">
      <div className="container-wide pitstop-layout">
        <div className="pitstop-art" aria-label="Illustration of a neighborhood collection point">
          <span className="pitstop-art-label">The neighborhood layer</span>
          <div className="pitstop-pin"><MapPin size={31} /></div>
          <div className="pitstop-numbers">
            <strong>18:42</strong>
            <span>next collection window</span>
          </div>
        </div>
        <div className="split-copy">
          <span className="section-index">05 / For pitstops</span>
          <h2 id="pitstop-heading">The corner shop, with a new role.</h2>
          <p>
            Become the friendly face between a parcel and its front door. Pitstops make delivery more
            flexible for neighbors, and bring a little more footfall to the places that give a street its
            character.
          </p>
          <ul className="benefit-list">
            <li><Inbox size={17} /> Simple check-in, clear shelves and easy collections.</li>
            <li><Users size={17} /> A service your regulars can trust by name.</li>
            <li><Sparkles size={17} /> Earn from every parcel, without changing your business.</li>
          </ul>
          <a
            className="button-primary"
            href="mailto:hello@kumove.city?subject=Pitstop%20interest"
            style={{ marginTop: 28, width: 'fit-content' }}
            data-testid="link-pitstop-interest"
          >
            Become a pitstop <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function TrackSection() {
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
    <section className="section section-dark track-section" id="track" aria-labelledby="track-heading">
      <div className="container-wide track-grid">
        <div className="route-status">
          <span className="section-index">06 / Track a delivery</span>
          <h2 id="track-heading" className="font-display" style={{ fontSize: 'clamp(42px, 6vw, 75px)', lineHeight: '.96', letterSpacing: '-.07em', margin: '15px 0 20px' }}>
            No mystery.
            <br />
            Just movement.
          </h2>
          <p style={{ color: 'hsl(var(--primary-foreground) / .62)', maxWidth: 400, lineHeight: 1.65, fontSize: 15 }}>
            A Kumove update tells you what happened, what is happening and what comes next. Put your feet up
            — we will bring the useful details.
          </p>
          <div style={{ marginTop: 38 }}>
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
          <h3>Find your delivery</h3>
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
              <label htmlFor="tracking-code" className="font-mono-brand" style={{ display: 'block', marginBottom: 8, fontSize: 10, color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                Delivery code
              </label>
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
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 20, color: 'hsl(var(--muted-foreground))', fontSize: 11 }}>
            <CircleHelp size={14} /> Need a hand? <a href="mailto:hello@kumove.city" style={{ color: 'hsl(var(--foreground))', fontWeight: 700 }} data-testid="link-track-support">Contact support</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container-wide">
        <div className="about-layout">
          <div className="about-lede" id="about-heading">
            We are building a city that <span>moves together.</span>
          </div>
          <div className="about-details">
            <div className="about-detail">
              <h3>Local by design</h3>
              <p>Our network starts close to home, because the best route is the one that knows the neighborhood.</p>
            </div>
            <div className="about-detail">
              <h3>Useful over flashy</h3>
              <p>We measure success in fewer missed drops, fairer work and customers who know what is next.</p>
            </div>
            <div className="about-detail">
              <h3>Progress in the details</h3>
              <p>Consolidated trips, collection choices and electric-ready routes make a difference parcel by parcel.</p>
            </div>
          </div>
        </div>
        <div className="faq-wrap">
          <h3>Good questions, straight answers.</h3>
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
                {isOpen && <div className="faq-answer" role="region" data-testid={`text-faq-answer-${index}`}>{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <a href="#top" onClick={(event) => jumpTo('top', event)} data-testid="link-footer-home"><BrandMark /></a>
            <p className="footer-intro">The urban delivery network for people, parcels and the places in between.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <a href="#retailers" onClick={(event) => jumpTo('retailers', event)} data-testid="link-footer-retailers">For retailers</a>
              <a href="#couriers" onClick={(event) => jumpTo('couriers', event)} data-testid="link-footer-couriers">For couriers</a>
              <a href="#drivers" onClick={(event) => jumpTo('drivers', event)} data-testid="link-footer-drivers">For drivers</a>
              <a href="#pitstops" onClick={(event) => jumpTo('pitstops', event)} data-testid="link-footer-pitstops">For pitstops</a>
            </div>
          </div>
          <div>
            <h4>Useful</h4>
            <div className="footer-links">
              <a href="#track" onClick={(event) => jumpTo('track', event)} data-testid="link-footer-track">Track an order</a>
              <a href="#about" onClick={(event) => jumpTo('about', event)} data-testid="link-footer-about">Our route</a>
              <a href="mailto:hello@kumove.city" data-testid="link-footer-contact">Contact the team</a>
            </div>
          </div>
          <div>
            <h4>Start a conversation</h4>
            <div className="footer-links">
              <a href="mailto:hello@kumove.city" data-testid="link-footer-email">hello@kumove.city <ArrowRight size={13} style={{ verticalAlign: 'middle' }} /></a>
              <span style={{ color: 'hsl(var(--primary-foreground) / .48)', fontSize: 12 }}>A little movement goes a long way.</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Kumove Network</span>
          <span>Made for moving cities forward</span>
          <a href="#top" onClick={(event) => jumpTo('top', event)} data-testid="link-back-to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      window.setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 30);
    }
  }, []);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <div className="ticker" aria-label="Kumove network principles">
          <div className="ticker-track">
            {[1, 2].map((copySet) => (
              <div className="ticker-item" key={copySet}>
                <span>Local routes</span><span>Human handoffs</span><span>Useful updates</span><span>Less empty miles</span><span>More city in every delivery</span>
              </div>
            ))}
          </div>
        </div>
        <StorySection />
        <RetailersSection />
        <CouriersSection />
        <DriversSection />
        <PitstopsSection />
        <TrackSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;