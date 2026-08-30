'use client';

import type { ReactNode } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

type SiteFrameProps = {
  children: ReactNode;
};

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="page-main">{children}</main>
      <SiteFooter />
    </div>
  );
}