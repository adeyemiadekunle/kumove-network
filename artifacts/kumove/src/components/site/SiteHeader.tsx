import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Menu, MoveUpRight, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { BrandMark } from './BrandMark';

const navItems = [
  { href: '/retailers', label: 'For retailers' },
  { href: '/couriers', label: 'For couriers' },
  { href: '/pitstops', label: 'Pitstops' },
  { href: '/about', label: 'Our route' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="topbar">
        <div className="nav-wrap">
          <Link href="/" className="brand-link" data-testid="link-home">
            <BrandMark />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${location === item.href ? 'nav-link-active' : ''}`}
                data-testid={`link-nav-${item.href.slice(1)}`}
              >
                {item.label}
              </Link>
            ))}
            <Link className="nav-cta" href="/track" data-testid="link-track-order">
              Track an order <ArrowRight size={14} />
            </Link>
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
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              data-testid={`link-mobile-${item.href.slice(1)}`}
            >
              {item.label}
              <ChevronRight size={17} />
            </Link>
          ))}
          <Link href="/drivers" onClick={() => setMenuOpen(false)} data-testid="link-mobile-drivers">
            For drivers
            <ChevronRight size={17} />
          </Link>
          <Link href="/track" onClick={() => setMenuOpen(false)} data-testid="link-mobile-track">
            Track an order
            <MoveUpRight size={17} />
          </Link>
        </nav>
      )}
    </>
  );
}