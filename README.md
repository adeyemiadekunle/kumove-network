# Kumove marketing website

Kumove is the customer-facing delivery brand for Kunemi, a postcode-aware movement layer for Nigerian cities. This website was meant to make that idea feel tangible: show how businesses, customers, KuCouriers, KuDrivers and KuStops fit into one local delivery network, then give each audience a clear way to enter the conversation.

The site is intentionally a marketing and product-preview experience. It communicates the operating model, builds trust through clear route and handoff language, and directs interested people to contact Kumove. It is not yet the operational platform for dispatch, payments, courier onboarding or live shipment tracking.

## What the website is meant to do

- Explain Kumove in plain language: address first, sort intelligently, move with evidence.
- Position delivery as a connected city network rather than a single doorstep transaction.
- Speak to each side of the network with a dedicated page and call to action.
- Make the experience feel local to Nigeria and Lagos through imagery, language and an illustrative route map.
- Give customers a useful preview of tracking without pretending that live shipment data is connected.
- Create a strong, responsive foundation for later product and conversion work.

## Audience and message

| Audience | Website promise |
| --- | --- |
| Businesses | Add delivery, collection and returns without losing the customer experience after checkout. |
| Customers | Get useful updates, flexible collection options and fewer failed delivery attempts. |
| KuCouriers | See clearer neighbourhood routes, pay and timing before accepting work. |
| KuDrivers | Use vehicle capacity more efficiently across intercity and consolidated routes. |
| KuStops | Turn trusted local spaces into convenient collection points and earn per parcel. |

## Main routes

- `/` — Network overview and the primary entry point.
- `/business` — Partnership story for retailers, brands and marketplaces.
- `/customers` — Delivery and collection experience for recipients.
- `/couriers` — Flexible work and route clarity for independent couriers.
- `/kudrivers` — Capacity and route-planning story for owner-drivers.
- `/kustops` — Local collection-point proposition for shops and neighbourhood businesses.
- `/track` — Tracking preview using a delivery-code interaction.
- `/about` — Kumove/Kunemi principles, network model and FAQs.

## Experience principles

The visual and editorial direction is built around a few ideas:

- Local-first: neighbourhoods, trusted people and useful places are part of the product.
- Address-first: postcode and access context make a shipment actionable from the start.
- Evidence over vague status: GPS, postcode, OTP, timestamp and actor identity create confidence across handoffs.
- Human, direct language: the site should feel thoughtful and practical rather than like generic logistics software.
- Clear movement: generous layouts, route motifs, responsive imagery and concise calls to action make the network easy to scan.

## Current implementation

This is a Next.js App Router site using React, TypeScript, Tailwind CSS and reusable UI components. The marketing pages are statically rendered. The Lagos route visual can use Mapbox when a public token is configured; without one, it shows an intentional fallback message.

The tracking page is a front-end preview. It validates the shape of a delivery code in the browser and displays an example route update; it does not query a shipment service.

## Run locally

Requirements: Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is occupied, Next.js will select the next available port.

Useful checks:

```bash
pnpm typecheck
pnpm build
```

## Configuration

To enable the illustrative Mapbox route, add a public Mapbox token to `.env`:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_public_mapbox_token
```

Only use a browser-safe public token here. The map is visual storytelling, not a source of live operational route data.

## Project shape

- `app/` — Routes, page content and global styles.
- `src/components/site/` — Shared site shell, navigation, footer and network visual.
- `src/components/ui/` — Reusable interface primitives.
- `public/images/` — Marketing imagery used across audience pages.

## Future product work

The next layer beyond this marketing site would be authenticated business and network operations, real shipment events, courier/driver onboarding, KuStop workflows, notifications and a production tracking API. Those capabilities should be added behind explicit product and data contracts rather than inferred from the current front-end preview.
