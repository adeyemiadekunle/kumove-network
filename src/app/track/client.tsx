'use client';

import { type FormEvent, useState } from 'react';
import { ArrowRight, Check, CircleHelp } from 'lucide-react';
import { SiteFrame } from '@/components/site/SiteFrame';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TrackClient() {
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
    <SiteFrame>
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
                  <div>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* shadcn Card for Track Form */}
          <Card className="relative z-10 w-full max-w-[440px] justify-self-end rounded-3xl border border-border/80 bg-card p-6 sm:p-8 text-foreground shadow-xl">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="font-display text-2xl sm:text-3xl tracking-tight text-foreground">
                Find your delivery
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">
                Preview the Kumove tracking experience with a delivery code. It usually starts with KM.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {status === 'success' ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl bg-accent/40 p-4 text-sm text-accent-foreground" role="status" data-testid="status-track-success">
                    <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Your delivery is moving.</strong>
                      <span className="text-muted-foreground">
                        We found <span className="font-mono-brand font-bold text-foreground">{code.toUpperCase()}</span>. This preview shows how a useful route update will appear.
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-full py-6 font-semibold"
                    onClick={() => { setStatus('idle'); setCode(''); }}
                    data-testid="button-track-another"
                  >
                    Track another delivery
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="tracking-code" className="form-label mb-2 block text-xs font-mono-brand tracking-widest text-muted-foreground uppercase">
                      Delivery code
                    </label>
                    <Input
                      id="tracking-code"
                      className="h-12 rounded-xl font-mono-brand uppercase text-base tracking-wider bg-background border-border/80 focus-visible:ring-secondary"
                      value={code}
                      onChange={(event) => { setCode(event.target.value); setError(''); }}
                      placeholder="e.g. KM-7Q4N2"
                      autoComplete="off"
                      data-testid="input-tracking-code"
                    />
                    {error && (
                      <p className="form-error mt-2 text-xs font-medium text-destructive" role="alert" data-testid="status-track-error">
                        {error}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full py-6 text-sm font-bold shadow-md hover:shadow-lg transition-all"
                    data-testid="button-submit-tracking"
                  >
                    Show my delivery <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <CircleHelp className="h-3.5 w-3.5" />
                <span>Need a hand?</span>
                <a href="mailto:hello@kumove.city" className="font-semibold text-foreground underline hover:text-secondary">
                  Contact support
                </a>
              </div>
            </CardContent>
          </Card>
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
            That gives customers a useful update, not just a map that says "somewhere on the way".
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
