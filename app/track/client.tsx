'use client';

import { type FormEvent, useState } from 'react';
import { ArrowRight, Check, CircleHelp } from 'lucide-react';
import { SiteFrame } from '@/components/site/SiteFrame';

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
            That gives customers a useful update, not just a map that says "somewhere on the way".
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
