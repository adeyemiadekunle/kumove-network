import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

type SiteFrameProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function SiteFrame({ children, title, description }: SiteFrameProps) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = `${title} | Kumove`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [location, title, description]);

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="page-main">{children}</main>
      <SiteFooter />
    </div>
  );
}