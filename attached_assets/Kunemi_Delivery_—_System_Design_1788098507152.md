# KUNEMI DELIVERY — SYSTEM DESIGN

**Version:** 1.0\
**Date:** August 2026\
**Status:** System Design Baseline\
**Product:** Kunemi Delivery\
**Primary Market:** Nigeria\
**Architecture:** API-first, modular monolith, event-aware, geospatial

---

## 1. System Vision

Kunemi is a **postcode-native logistics operating system** for Nigeria.

The system combines:

- Customers and recipients
- Merchants
- PUDO/Kunemi Points
- Local couriers
- Owner-drivers
- Hubs and warehouses
- Operations teams
- Merchant APIs
- Shipment and returns management
- Tracking and proof of delivery
- Payments and payouts

The national postcode infrastructure provides the geographic foundation; Kunemi adds the operational layer for **addressing, sorting, routing, dispatch, capacity, movement, tracking and delivery**.

```text
Nigeria National Postcode
          ↓
   Kunemi Address Layer
          ↓
   Geo + Sorting Engine
          ↓
 Routing + Capacity + Dispatch
          ↓
 PUDO / Hub / Courier / Driver
          ↓
       Shipment
          ↓
 Tracking + Proof of Delivery
          ↓
 Analytics + Network Intelligence
```

---

# 2. Core Architecture Principles

1. **Address-first** — Address is a platform domain, not a shipment field.
2. **Postcode-native** — Store and use postcode segments independently.
3. **Network-first** — Use partners before building a large owned fleet.
4. **API-first** — Merchants and partners can integrate directly.
5. **Modular monolith first** — Keep MVP operationally simple.
6. **Event-driven visibility** — Major physical actions create auditable events.
7. **Geospatial by default** — PostGIS supports proximity, zones and routing.
8. **Role and location scoped** — Staff access depends on role and assigned operational geography.
9. **Driver routes are flexible** — Drivers can operate across multiple locations and hubs.
10. **Privacy and security by design**.
11. **External services are replaceable** — Postcode, maps, payments and messaging are abstracted.
12. **Offline-tolerant operations** — Field workflows must sync safely after connectivity loss.

---

# 3. High-Level System

```text
                    CLIENT APPLICATIONS
 ┌─────────┬──────────┬────────┬────────┬──────────┬──────────┐
 │Customer │ Merchant │ PUDO   │Courier │ Driver   │Operations│
 └────┬────┴────┬─────┴───┬────┴───┬────┴────┬─────┴────┬─────┘
      └──────────┴─────────┴────────┴─────────┴──────────┘
                              │
                         API Gateway
                              │
 ┌─────────────────────────────────────────────────────────────┐
 │                    KUNEMI CORE PLATFORM                     │
 │                                                             │
 │ Identity │ Address │ Postcode │ Sorting Engine             │
 │ Customer │ Merchant │ PUDO │ Hub │ Warehouse               │
 │ Courier │ Driver │ Vehicle │ Shipment │ Package            │
 │ Routing │ Dispatch │ Tracking │ Returns │ Incidents        │
 │ Payments │ Payouts │ Notifications │ Analytics             │
 └─────────────────────────────────────────────────────────────┘
                 │             │              │
          PostgreSQL/PostGIS   Redis       Object Storage
                 │
            Outbox / Workers
                 │
     ┌───────────┼───────────────┐
     │           │               │
 Notifications Webhooks      Analytics
     │
 External Providers
 ├── National Postcode API
 ├── Maps/Geocoding
 ├── Payment Provider
 ├── SMS/Email/WhatsApp
 └── Other integrations
```

---

# 4. Core Domain Model

```text
Organisation
├── Merchant
├── PUDO Partner
└── Kunemi Operations

Identity
├── User
├── Customer
├── Staff
├── Courier
└── Driver

Physical Network
├── Address
├── PUDO
├── Hub
├── Warehouse
├── Vehicle Base
└── Delivery Zone

Transport
├── Vehicle
├── Route
├── Route Stop
├── Manifest
└── Capacity

Shipment
├── Shipment
├── Package
├── Shipment Event
├── Delivery Attempt
└── Return

Commercial
├── Rate
├── Payment
├── Payout
└── Invoice

Trust
├── Verification
├── Audit Event
└── Incident
```

---

# 5. Address & Postcode Foundation

The **Address Service** is the shared geographic identity layer for the entire platform.

### Address inputs

```text
Address Search
Postcode
Map Pin
Current GPS
Manual Address
```

### Address object

```text
Address
├── id
├── canonical_postcode
├── display_postcode
├── compact_postcode
├── state_code
├── lga_code
├── district_code
├── area_code
├── unit_code
├── state_name
├── lga_name
├── locality_name
├── address_text
├── latitude
├── longitude
├── source
├── verification_status
├── confidence
├── delivery_instructions
├── access_notes
└── label
```

Kunemi maintains a single canonical representation while supporting multiple postcode formats.

---

# 6. National Postcode Integration

Kunemi does **not** replace the national postcode system.

```text
National Postcode API
        ↓
 Postcode Adapter
        ↓
 Address Service
        ↓
 Geo + Sorting Engine
```

### Postcode hierarchy

```text
State
 ↓
LGA
 ↓
District
 ↓
Area
 ↓
Building Unit
```

Each segment is stored independently for indexing and analytics.

---

# 7. Geographic Operating Model

```text
National Geography
State → LGA → District → Area → Unit

Operational Layer
├── Hub
├── Delivery Zone
├── Courier Zone
├── PUDO Catchment
├── Intercity Corridor
└── Driver Route
```

National geography is stable; operational zones are dynamic.

---

# 8. Organisation & Access Model

Access is controlled by **organisation, role and operational scope**.

### Customer

- Own account
- Shipments
- Addresses
- Payments

### Merchant

- Organisation data
- Shipments
- Warehouses
- API access
- Analytics

### PUDO Staff

- Assigned location only
- Scanning, storage, handover, returns

### Hub Staff

- Assigned hub only

### Operations Staff

- Assigned zone/hub scope only

---

# 9. Driver Operating Model

Drivers are **mobile network actors**, not location-bound staff.

They can:

- Operate across multiple hubs
- Perform multi-stop routes
- Move intercity shipments
- Carry consolidated loads
- Visit merchants, hubs, PUDOs

### Route model

```text
Route
├── origin
├── stops[]
│   ├── location
│   ├── sequence
│   ├── shipments[]
│   └── status
├── vehicle
├── capacity
└── manifest
```

---

# 10. Courier vs Driver

| Capability     | Courier      | Driver               |
| -------------- | ------------ | -------------------- |
| Scope          | Local        | Multi-stop/intercity |
| Route          | Single route | Multi-location route |
| Hub movement   | Limited      | Core function        |
| Capacity       | Limited      | High                 |
| State-to-state | No           | Yes                  |

---

# 11. Logistics Network

```text
Merchant / Customer
        ↓
Pickup / PUDO
        ↓
Origin Hub
        ↓
Sorting Engine
        ↓
Intercity Driver
        ↓
Destination Hub
        ↓
Local Courier
        ↓
Delivery / PUDO
```

---

# 12. PUDO Network

PUDO points are partner businesses acting as logistics nodes:

- Retail shops
- Pharmacies
- POS agents
- Community stores

Functions:

- Drop-off / pickup
- Returns
- Scanning
- Storage
- OTP release
- Inventory tracking

---

# 13. Shipment Architecture

```text
Shipment
├── tracking_number
├── sender
├── recipient
├── origin
├── destination
├── service
├── packages[]
├── status
└── events[]
```

### Lifecycle

```text
CREATED → VALIDATED → PAYMENT_CONFIRMED → PICKED_UP
→ AT_NODE → SORTED → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED
```

---

# 14. Event System

All physical actions generate events:

```text
ShipmentCreated
PackageCollected
ArrivedAtHub
Sorted
LoadedToVehicle
Departed
OutForDelivery
Delivered
```

Each event includes:

- Actor
- Timestamp
- Location
- Postcode
- GPS
- Metadata

---

# 15. Dispatch Engine

Scoring factors:

```text
Proximity
Route Fit
Capacity
SLA
Reliability
Detour Cost
```

---

# 16. Driver Capacity Marketplace

Drivers publish:

```text
Vehicle
Route
Capacity
Schedule
Origin/Destination
Stops
```

System matches shipments to available capacity.

---

# 17. Routing Engine

### MVP

- Postcode hierarchy
- Zones
- Distance heuristics

### Future

- Traffic-aware routing
- Demand prediction
- Dynamic optimisation
- Network simulation

---

# 18. Nearest PUDO

```text
Destination → Postcode → PostGIS Search → Active PUDO
→ Capacity → Hours → Distance → Recommendation
```

---

# 19. Delivery Verification

```text
GPS + Postcode + OTP + Timestamp
```

Used together as evidence, not absolute truth.

---

# 20. Customer System

- Create shipment
- Select address
- Choose service
- Pay
- Track
- Receive / collect
- Return

---

# 21. Merchant System

- Bulk shipments
- API integration
- Labels
- Tracking
- Returns
- Analytics

---

# 22. Operations System

- Live map
- Shipment board
- Hub control
- PUDO monitoring
- Dispatch control
- Exception handling

---

# 23. Module Architecture

```text
addresses/
identityORorganisation/
postcode/
sorting_engine/
shipments/
dispatch/
routing/
tracking/
couriers/
drivers/
hubs/
pudo/
payments/
analytics/
```

---

# 24. Identity Model

```text
User → Organisation → Role → Permissions → Scope
```

---

# 25. Data Architecture

PostgreSQL + PostGIS:

- Shipments
- Events
- Routes
- Addresses
- Users
- Payments

---

# 26. Event Architecture

```text
Transaction → Outbox → Worker → Notifications / Analytics / Dispatch
```

---

# 27. Technology Stack

- Next.js
- React Native
- FastAPI
- PostgreSQL + PostGIS
- Redis
- Celery
- S3 storage

---

# 28. Security & Privacy

- RBAC
- OAuth2
- Encryption at rest
- Audit logs
- PII minimisation
- Scoped access

---

# 29. Privacy Flow

Identity → Address → Postcode → Shipment → Events → Delivery Evidence

---

# 30. Payments

Abstracted payment service:

```text
Provider → Adapter → Payment Service → Ledger
```

---

# 31. Notifications

Event-driven:

```text
Event → Worker → Channel → User
```

---

# 32. Reliability

External failures are isolated via:

- caching
- retries
- adapters
- fallback data

---

# 33. Offline Operations

```text
Local action → Queue → Sync → Server validation → Event commit
```

---

# 34. Observability

- API metrics
- Dispatch performance
- Shipment flow
- Hub throughput
- Payment success

---

# 35. Fraud Prevention

Chain-of-custody:

Scan → Handoff → Scan → Hub → Scan → Delivery → OTP

---

# 36. Analytics

- Delivery success rates
- Postcode performance
- Hub efficiency
- Courier productivity
- Demand density

---

# 37. MVP Architecture

```text
One Metro Market + One Intercity Corridor
→ Modular Monolith
→ Postgres + Redis
→ Workers
```

---

# 38. Scalability Roadmap

- Monolith → Event-driven system
- Add broker
- Extract services
- Add optimisation layer

---

# 39. Key Architecture Decisions

- Postcode is external authority
- Address is core domain
- Sorting Engine is central
- Modular monolith first
- Event-driven tracking

---

# 40. System Boundaries

Kunemi owns:

- Address layer
- Sorting engine
- Dispatch
- Routing
- PUDO network
- Tracking
- Driver marketplace

---

# 41. End-to-End Flow

Customer → Address → Payment → Pickup → Sorting Engine → Intercity Driver → Hub → Courier → Delivery → OTP → Analytics

---

# 42. Design Rules

- No direct postcode API exposure
- No GPS-only delivery proof
- No location-unscoped staff access
- No shipment without event trail
- No premature microservices

---

# 43. FINAL ARCHITECTURE (UPDATED)

```text
                       NATIONAL POSTCODE
                              │
                              ▼
                     ┌─────────────────┐
                     │ Postcode Adapter│
                     └────────┬────────┘
                              ▼
                     ┌─────────────────┐
                     │ Address Service │
                     └────────┬────────┘
                              ▼
                  ┌────────────────────────┐
                  │   SORTING ENGINE       │
                  │ (Core Network Brain)   │
                  └───────────┬────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
      Shipment             Dispatch            Routing
          │                   │                   │
          ▼                   ▼                   ▼
      Customer            Courier             Driver
                              │
                         Multi-stop Routes
                              │
                              ▼
                           Delivery
                              │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
                  OTP         GPS       Events
                              │
                              ▼
                        Tracking / Audit
                              │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
               Notifications Webhooks Analytics
```

## Final Position

The missing core is now explicitly defined:

> **The Sorting Engine is the central intelligence layer that transforms postcode-aware geography into actionable logistics movement across hubs, PUDOs, couriers, and drivers.**

It is the operational brain between **Address → Movement → Delivery**.
