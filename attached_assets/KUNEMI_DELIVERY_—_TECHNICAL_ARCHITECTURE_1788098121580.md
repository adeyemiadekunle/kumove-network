# KUNEMI DELIVERY — TECHNICAL ARCHITECTURE

**Version:** 1.0\
**Date:** August 2026\
**Status:** Architecture Baseline\
**Architecture:** API-first, geospatial, event-aware modular monolith\
**Primary Database:** PostgreSQL + PostGIS\
**Primary Market:** Nigeria\
**Backend Stack:** NestJS + TypeScript

---

## 1. Architecture Vision

Kunemi is a **postcode-native logistics operating system**. Its architecture separates the stable national geographic identity from Kunemi's operational network.

```text
National Postcode Infrastructure
            ↓
     Postcode Adapter
            ↓
      Address Service
            ↓
 Geo / Sorting Engine
            ↓
 Routing + Capacity + Dispatch
            ↓
 PUDO / Hub / Warehouse
      ↙           ↘
 Courier        Driver
      ↘           ↙
        Shipment
            ↓
 Tracking + Delivery Evidence
            ↓
 Notifications + Webhooks + Analytics
```

Kunemi owns the operational layer: **address management, sorting, routing, dispatch, capacity, shipment movement, handoffs, tracking, delivery verification and network intelligence**. The national postcode service remains an external geographic authority.

---

## 2. Architecture Principles

1. **Address-first** — Address is a first-class platform domain.
2. **Postcode-native** — Store all postcode segments independently.
3. **Modular monolith first** — MVP built in a single NestJS application with clear module boundaries.
4. **API-first** — Customers, merchants and partners interact through REST/GraphQL APIs.
5. **Event-aware** — All operational state changes emit domain events.
6. **Geospatial by default** — PostGIS powers all spatial operations.
7. **Scoped access** — Authorization is evaluated through membership, role, permissions and both static and dynamic scope.
8. **Mobile actors are flexible** — Drivers operate across multiple nodes and routes.
9. **Offline-tolerant** — Field apps sync via idempotent APIs.
10. **External providers are replaceable** — All external systems are abstracted through adapters.
11. **Privacy by design** — Data minimisation and strict access control.
12. **Operational resilience** — External failures never corrupt core state.

---

# 3. System Context

```text
 ┌──────────────────────────────────────────────────────────┐
 │                    CLIENT APPLICATIONS                    │
 │                                                          │
 │ Customer │ Merchant │ PUDO │ Courier │ Driver │ Ops/Admin│
 └────────────────────────────┬─────────────────────────────┘
                              │
                         API Gateway (NestJS)
                              │
 ┌──────────────────────────────────────────────────────────┐
 │                  KUNEMI CORE PLATFORM (NestJS)           │
 │                                                          │
 │ Identity & Organisation (Module)                        │
 │ Address & Postcode (Module)                             │
 │ Customer & Merchant (Module)                            │
 │ Network & Geography (Module)                            │
 │ PUDO / Hub / Warehouse (Module)                         │
 │ Courier / Driver / Vehicle (Module)                     │
 │ Shipment / Package / Returns (Module)                   │
 │ Sorting / Routing / Dispatch (Module)                   │
 │ Tracking / Events / Incidents (Module)                  │
 │ Payments / Payouts / Billing (Module)                   │
 │ Notifications / Webhooks / Analytics (Module)          │
 │ Security / Privacy / Audit (Module)                    │
 └───────────────┬───────────────────────┬──────────────────┘
                 │                       │
        PostgreSQL + PostGIS            Redis
                 │                       │
                 └───────────┬───────────┘
                             │
                      Event Bus (Outbox Pattern)
                             │
             ┌───────────────┼────────────────┐
             ▼               ▼                ▼
        Notifications     Webhooks        Analytics
                             │
                 ┌───────────┼────────────┐
                 ▼           ▼            ▼
          Postcode API     Maps        Payments
                         Messaging
```

---

# 4. Domain Architecture

```text
KUNEMI (NestJS Monorepo Modules)
│
├── identity/
├── organisations/
├── memberships/
├── roles/
├── permissions/
├── scopes/
├── customers/
├── merchants/
├── addresses/
├── postcode/
├── geography/
├── sorting/
├── network/
├── hubs/
├── warehouses/
├── pudo/
├── couriers/
├── drivers/
├── vehicles/
├── shipments/
├── packages/
├── routing/
├── dispatch/
├── manifests/
├── tracking/
├── delivery/
├── returns/
├── incidents/
├── payments/
├── payouts/
├── billing/
├── notifications/
├── webhooks/
├── privacy/
├── security/
├── audit/
└── analytics/
```

Each module is a **NestJS module** with:

- Controller layer
- Service layer
- Repository layer using Prisma or TypeORM
- Domain entities
- Event emitters
- Guards and authorization policies
- Validation and DTOs
- Audit integration where required

---

# 5. Module Architecture (NestJS Standard)

## 5.1 Identity, Organisation & Authorization Module

Responsible for authentication, user identity, organisation membership, membership status, roles, permissions, static scope, dynamic scope and resource authorization.

The conceptual authorization model is:

```text
                           USER
                             │
                       Authentication
                             │
                        Membership
                             │
                  ┌──────────┴──────────┐
                  │                     │
             Organisation            Status
                  │
                 Role
                  │
             Permissions
                  │
                Scope
                  │
        ┌─────────┴─────────┐
        │                   │
   Static Scope       Dynamic Scope
        │                   │
     Hub / Zone       Route / Assignment
        │                   │
        └─────────┬─────────┘
                  │
            Authorization
                  │
            Resource Access
```

### Conceptual entities

```text
User
├── id
├── identity_provider_id
├── email / phone
├── authentication_status
└── profile

Membership
├── id
├── user_id
├── organisation_id
├── status
├── role_id
├── static_scope
├── effective_from
├── effective_until
└── metadata

Organisation
├── id
├── type
├── name
├── status
└── settings

Role
├── id
├── organisation_id
├── name
└── permissions[]

Permission
├── id
├── resource
├── action
└── conditions

Static Scope
├── organisation_id
├── hub_ids[]
├── zone_ids[]
├── warehouse_ids[]
├── pudo_ids[]
└── geographic_constraints

Dynamic Scope
├── route_id
├── assignment_id
├── manifest_id
├── shipment_ids[]
├── valid_from
├── valid_until
└── operational_constraints
```

### Authorization flow

```text
Request
  ↓
Authentication
  ↓
User Resolution
  ↓
Active Membership Resolution
  ↓
Organisation Context
  ↓
Role Resolution
  ↓
Permission Evaluation
  ↓
Static Scope Evaluation
  ↓
Dynamic Scope Evaluation
  ↓
Resource-Level Policy
  ↓
Allow / Deny
```

### Scope types

#### Static scope

Static scope represents relatively stable organisational or geographic boundaries.

Examples:

- Staff assigned to a hub
- PUDO staff assigned to a PUDO location
- Warehouse staff assigned to a warehouse
- Operations staff assigned to a delivery zone
- Courier assigned to a service zone

#### Dynamic scope

Dynamic scope represents temporary or operationally changing access.

Examples:

- Driver assigned to a route
- Courier assigned to a delivery batch
- Staff assigned to a manifest
- Driver authorised to handle specific shipments
- Temporary cross-hub assignment
- Incident-response access for a defined period

Dynamic scope must be time-bound, auditable and revocable.

### NestJS implementation

```ts
@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const resource = request.resource;
    const action = request.action;

    return this.authorizationService.authorize({
      user,
      resource,
      action,
      organisation: request.organisation,
      membership: request.membership,
      staticScope: request.staticScope,
      dynamicScope: request.dynamicScope,
    });
  }
}
```

Recommended guards and services:

- `JwtAuthGuard`
- `MembershipGuard`
- `RolesGuard`
- `PermissionsGuard`
- `StaticScopeGuard`
- `DynamicScopeGuard`
- `ResourceAuthorizationGuard`
- `AuthorizationService`
- `MembershipService`
- `ScopeResolutionService`
- `PolicyEvaluationService`

Authorization must not rely on role alone. A user may possess the correct role and permission but still be denied access because the requested resource falls outside the user's active static or dynamic scope.

### Actors

- Customer
- Merchant user
- PUDO staff
- Hub staff
- Warehouse staff
- Courier
- Driver
- Operations staff
- Administrator

---

## 5.2 Address & Postcode Module

Core geographic identity system.

### Address Entity

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
└── access_notes
```

Postcode formats:

```text
EK-01-A03-FK-01
EK 01 A03 FK 01
EK01A03FK01
```

Stored as structured columns for indexing and PostGIS queries.

---

## 5.3 Postcode Adapter Module

Backend-only integration layer.

```ts
@Injectable()
export class PostcodeAdapterService {
  search()
  nearby()
  reverse()
  lookup()
  assemble()
  disassemble()
}
```

Responsibilities:

- External API isolation
- Caching through Redis
- Retry and circuit-breaker handling
- Response normalisation
- Provider replacement capability
- Provider usage monitoring
- Safe fallback to previously verified data

---

# 6. Geographic Model

```text
State
 └── LGA
      └── District
           └── Area
                └── Building Unit
```

Operational overlay:

```text
Hub
PUDO
Warehouse
Delivery Zone
Courier Zone
Intercity Corridor
Driver Route
```

All are stored as PostGIS-enabled entities or geometries where spatial representation is required.

---

# 7. Geo & Sorting Engine (NestJS Service Layer)

Core service:

```ts
@Injectable()
export class SortingEngineService {
  resolveDestination(address: Address)
  computeSortKey(postcode: string)
  assignNode(shipment: Shipment)
}
```

Sort hierarchy:

```text
State → LGA → District → Area → Unit
```

Example keys:

```text
EK
EK/01
EK/01/A03
EK/01/A03/FK
EK/01/A03/FK/01
```

The sorting engine may also evaluate:

- Hub operating boundaries
- PUDO catchments
- Delivery zones
- Intercity corridors
- Current network capacity
- Shipment service level
- Route compatibility

---

# 8. Customer Module

Responsibilities:

- Customer accounts
- Address book
- Shipment creation
- Tracking
- Payments
- PUDO pickup
- Returns

Separation is enforced between:

- Customer identity data
- Saved addresses
- Operational shipment data
- Delivery evidence
- Internal operational notes

---

# 9. Merchant Module

Responsibilities:

- Merchant organisations
- Merchant memberships
- Merchant locations
- Bulk shipment APIs
- Webhooks
- Billing
- Analytics
- API credentials

Merchant users are authorised through active organisation membership, assigned role, permissions and applicable merchant-location or shipment scope.

Example endpoints:

```ts
@Post('/shipments')
@Get('/shipments/:id')
@Post('/shipments/:id/cancel')
```

---

# 10. Network Module

Represents physical logistics infrastructure.

Entities:

- PUDO
- Hub
- Warehouse
- NetworkNode
- DeliveryZone
- ServiceArea
- IntercityCorridor

Each is a **PostGIS-enabled entity** where geographic operations are required.

Network resources may be used as static authorization scope. For example, a hub staff member may access only shipments, manifests and incidents associated with the assigned hub unless a temporary dynamic assignment grants additional access.

---

# 11. Courier Module

Entities:

```text
Courier
Vehicle
Availability
Route
Assignment
Earnings
```

Dispatch logic:

- Proximity through PostGIS
- Capacity
- SLA
- Reliability score
- Zone compatibility
- Current assignment
- Dynamic route scope

A courier's access to shipment data should normally be limited to shipments included in the courier's active assignment, route or manifest.

---

# 12. Driver Module

Drivers are **multi-node mobile actors**.

```text
Driver
 ├── Vehicle
 ├── Availability
 ├── Route[]
 ├── Capacity
 ├── Assignment[]
 └── Manifest[]
```

Routes are arrays of stops:

```ts
type RouteStop = {
  nodeId: string;
  sequence: number;
  arrivalTime?: Date;
  departureTime?: Date;
};
```

A driver may have:

- Static scope based on organisation or operating region
- Dynamic scope based on active route
- Dynamic scope based on assigned manifest
- Shipment-level access limited to current custody or assignment

When a route or assignment expires, its dynamic scope must also expire unless explicitly extended.

---

# 13. Vehicle & Capacity Module

```text
Vehicle
├── type
├── capacity_weight
├── capacity_volume
├── status
└── base_location
```

Used in:

- `DispatchService`
- `RoutingService`
- Marketplace matching
- Manifest generation
- Dynamic assignment scope
- Chain-of-custody controls

---

# 14. Routing Module

### MVP

- Postcode hierarchy
- Distance through PostGIS
- Zone rules
- Hub and PUDO topology
- Route compatibility

### Future

- Traffic APIs
- Historical delivery times
- Demand prediction
- Dynamic route optimisation
- Capacity-aware route planning

---

# 15. Dispatch Module

```ts
@Injectable()
export class DispatchService {
  assignShipment()
  evaluateCandidates()
  createOffer()
  createAssignment()
  activateDynamicScope()
  revokeDynamicScope()
}
```

Flow:

```text
Shipment
   ↓
Candidate Drivers / Couriers
   ↓
Capacity Filter
   ↓
Permission and Scope Filter
   ↓
Route Compatibility
   ↓
SLA / Distance / Reliability Scoring
   ↓
Assignment
   ↓
Dynamic Scope Activation
```

Dispatch must evaluate not only whether an actor is operationally suitable, but also whether the actor is authorised to access and handle the shipment.

---

# 16. Driver Capacity Marketplace

Drivers expose capacity:

```text
origin
destination
weight
volume
routeStops
availability
vehicle
```

Matching engine:

```text
Shipment + Capacity
        ↓
Operational Scoring
        ↓
Authorization and Scope Validation
        ↓
Assignment
        ↓
Dynamic Route / Manifest Scope
```

---

# 17. Shipment Module

Core entities:

```text
Shipment
Package
ShipmentEvent
DeliveryAttempt
ProofOfDelivery
Return
```

Shipment access is controlled by:

- Organisation membership
- Role and permissions
- Shipment ownership or relationship
- Static geographic scope
- Dynamic route, assignment or manifest scope
- Current custody state
- Resource-level policy

---

# 18. Shipment State Machine

```text
CREATED
ADDRESS_VALIDATED
PAYMENT_CONFIRMED
AWAITING_PICKUP
PICKED_UP
AT_HUB / AT_PUDO
SORTED
IN_TRANSIT
OUT_FOR_DELIVERY
DELIVERED
```

Exceptions:

```text
FAILED
RETURNED
LOST
DAMAGED
HELD
CANCELLED
```

State transitions must validate both operational rules and authorization context. For example, only an actor with the required permission and active assignment or location scope may perform a custody scan.

---

# 19. Event System (NestJS EventEmitter + Outbox)

```ts
@EventsHandler(ShipmentCreatedEvent)
export class ShipmentCreatedHandler {}
```

Outbox pattern:

```text
DB Transaction → Outbox Table → Worker → Event Bus
```

Authorization-related events may include:

```text
MembershipCreated
MembershipSuspended
RoleAssigned
PermissionChanged
StaticScopeChanged
DynamicScopeActivated
DynamicScopeExpired
DynamicScopeRevoked
AuthorizationDenied
```

These events support auditability, security monitoring and operational investigation.

---

# 20. Tracking Module

Event-driven tracking:

- ShipmentCreated
- PackageScanned
- ArrivedAtHub
- OutForDelivery
- Delivered
- AssignmentCreated
- AssignmentCompleted
- RouteStarted
- RouteCompleted

Each event includes:

```text
actorId
organisationId
membershipId
timestamp
location (PostGIS)
postcode
routeId
assignmentId
metadata
```

Where applicable, the event should record the authorization context under which the action occurred.

---

# 21. PUDO Workflow

```text
Scan In
   ↓
Verify Staff Membership and PUDO Scope
   ↓
Verify Shipment
   ↓
Store
   ↓
Notify
   ↓
OTP Release
   ↓
Scan Out
   ↓
Record Handoff Event
```

PUDO staff access is normally constrained by static PUDO scope. Temporary cross-location access requires an explicit dynamic assignment or administrative authorization.

---

# 22. Delivery Verification

Multi-signal validation:

- GPS through PostGIS
- Postcode match
- OTP
- Reverse geocode
- Timestamp
- Actor identity
- Active route or assignment
- Proof-of-delivery evidence

Delivery confirmation must verify that the actor performing the action has the required permission and active dynamic scope for the shipment or route.

---

# 23. Payments Module

Architecture:

```text
PaymentProviderAdapter
   ↓
PaymentService
   ↓
LedgerService
   ↓
ReconciliationWorker
```

No card data is stored.

Payment and payout access is controlled by organisation membership, commercial permissions and applicable merchant, finance or operational scope.

---

# 24. Notifications & Webhooks

Implemented via:

- NestJS Queue using BullMQ
- Event listeners
- Webhook module
- Notification preferences
- Organisation and resource-level access policies

Webhook payloads must expose only data authorised for the receiving organisation and integration.

---

# 25. Analytics Module

Consumes events:

- Delivery time
- Hub performance
- Courier efficiency
- Demand heatmaps
- Scope-based operational performance
- Assignment completion
- Route utilisation
- Authorization failures
- Access anomalies

Analytics access must respect organisation boundaries and data classification.

---

# 26. Privacy & Data Governance

Enforced via:

- NestJS Guards
- Membership and organisation checks
- Static and dynamic scope filters
- Data filters
- Field-level encryption
- Audit logs
- Retention policies
- Privacy request workflows

Authorization scope must be applied before sensitive fields are returned. A user may be permitted to view a shipment's operational status while being denied access to recipient contact details, delivery instructions or proof-of-delivery media.

---

# 27. Security Architecture

- JWT authentication
- Refresh tokens
- Active membership validation
- RBAC guards
- Permission guards
- Static scope guards
- Dynamic scope guards
- Resource-level policy checks
- Rate limiting through NestJS Throttler
- Encryption at rest and in transit
- Device and session controls
- Audit logging
- Authorization-denial monitoring

Security flow:

```text
Request
  ↓
JWT Authentication
  ↓
User and Membership Resolution
  ↓
Organisation Context
  ↓
Role and Permission Evaluation
  ↓
Static Scope Evaluation
  ↓
Dynamic Scope Evaluation
  ↓
Resource Policy Evaluation
  ↓
Allow / Deny
```

---

# 28. Offline Architecture

Mobile sync pattern:

```text
Local Queue
   ↓
Sync API
   ↓
Idempotent Controller
   ↓
Authentication
   ↓
Membership and Scope Validation
   ↓
Conflict Resolution
   ↓
Event Emit
```

Offline actions must be re-authorised when synchronised. A previously valid assignment may have expired or been revoked while the device was offline.

---

# 29. Data Architecture

- PostgreSQL + PostGIS
- Redis cache
- S3 storage
- Partitioned event tables
- Membership tables
- Role and permission tables
- Static scope tables
- Dynamic assignment and scope tables
- Authorization audit tables

Recommended authorization-related tables:

```text
users
organisations
memberships
roles
permissions
role_permissions
membership_roles
static_scopes
dynamic_scopes
assignments
resource_policies
authorization_audits
```

---

# 30. Event Architecture

```text
NestJS Domain Event
   ↓
Outbox Table
   ↓
Worker (BullMQ)
   ↓
Consumers
```

Consumers may include:

- Notifications
- Webhooks
- Analytics
- Search/read models
- Dispatch
- Authorization audit
- Scope expiration workers
- Security monitoring

---

# 31. External Integration Boundary

All external systems are accessed via:

```text
Adapter Services (NestJS Providers)
```

- `PostcodeAdapterService`
- `MapsAdapterService`
- `PaymentAdapterService`
- `MessagingAdapterService`
- `IdentityProviderAdapterService`

External identity providers authenticate users, but Kunemi remains responsible for organisation membership, roles, permissions and operational scope.

---

# 32. Recommended Technology Stack

| Layer         | Technology           |
| ------------- | -------------------- |
| Backend       | NestJS + TypeScript  |
| ORM           | Prisma or TypeORM    |
| DB            | PostgreSQL + PostGIS |
| Cache         | Redis                |
| Queue         | BullMQ               |
| Mobile        | React Native         |
| Web           | Next.js              |
| Storage       | S3                   |
| Observability | OpenTelemetry        |

---

# 33. Repository Structure (NestJS Monorepo)

```text
src/
├── modules/
│   ├── identity/
│   ├── organisations/
│   ├── memberships/
│   ├── roles/
│   ├── permissions/
│   ├── scopes/
│   ├── customers/
│   ├── shipments/
│   ├── addresses/
│   ├── dispatch/
│   ├── tracking/
│   ├── payments/
│   └── ...
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── policies/
│   ├── interceptors/
│   └── filters/
├── config/
├── database/
├── events/
└── main.ts
```

---

# 34. Core Entity Relationships

```text
User
  ↓
Membership
  ↓
Organisation
  ↓
Role
  ↓
Permissions
  ↓
Static Scope + Dynamic Scope
  ↓
Authorization
  ↓
Resource Access

Customer → Shipments
Merchant → Shipments
Shipment → Packages → Events
Address → PostGIS Geometry
Driver → Vehicle → Routes
Route → Assignments → Dynamic Scope
```

---

# 35. End-to-End Flow

```text
Customer
   ↓
Address
   ↓
Validation
   ↓
Payment
   ↓
Shipment
   ↓
Pickup Assignment
   ↓
Hub
   ↓
Sorting
   ↓
Driver / Courier Assignment
   ↓
Dynamic Scope Activation
   ↓
Delivery
   ↓
POD
   ↓
Events
   ↓
Dynamic Scope Completion / Revocation
```

---

# 36. Operational Scope Model

Authorization scope is composed of both stable and operationally changing boundaries.

```text
User
  ↓
Active Membership
  ↓
Organisation
  ↓
Role
  ↓
Permissions
  ↓
Static Scope
  ├── Hub
  ├── Zone
  ├── Warehouse
  └── PUDO
  ↓
Dynamic Scope
  ├── Route
  ├── Assignment
  ├── Manifest
  └── Shipment Custody
  ↓
Resource Access
```

Operational actors:

- **Hub-bound staff** — Static hub scope, optionally extended by dynamic assignment.
- **PUDO staff** — Static PUDO scope, optionally extended by temporary assignment.
- **Warehouse staff** — Static warehouse scope.
- **Operations staff** — Static zone or regional scope.
- **Mobile drivers** — Dynamic route, assignment and manifest scope.
- **Courier agents** — Static service-zone scope plus dynamic delivery assignment scope.
- **Administrators** — Broad permissions subject to organisation, security and audit controls.

Scope is enforced through NestJS Guards and resource-level policy checks.

---

# 37. Testing Architecture

- Unit tests using Jest
- Integration tests using Supertest
- E2E tests using the Nest Testing Module
- Geospatial tests using PostGIS
- Event consistency tests
- Authorization matrix tests
- Membership-status tests
- Static-scope tests
- Dynamic-scope lifecycle tests
- Scope-expiration tests
- Cross-organisation access tests
- Offline re-authorization tests
- Privilege-escalation tests

Authorization test matrix:

```text
User
+ Membership Status
+ Organisation
+ Role
+ Permission
+ Static Scope
+ Dynamic Scope
+ Resource
+ Action
= Allow / Deny
```

---

# 38. Observability

- OpenTelemetry
- Prometheus metrics
- Structured logs using Pino
- Distributed tracing
- Authorization decision logs
- Scope activation and expiration metrics
- Cross-organisation access alerts
- Repeated authorization-denial alerts
- Dynamic-scope anomaly detection

---

# 39. Reliability Model

- Circuit breakers
- Retry policies
- Idempotent APIs
- Outbox pattern
- Cached fallback data
- Scope-resolution caching with safe invalidation
- Assignment expiration workers
- Authorization fail-closed behaviour for sensitive resources

If authorization context cannot be reliably resolved, access to sensitive operational resources should be denied rather than granted by default.

---

# 40. Fraud & Chain of Custody

- Scan-based transitions
- GPS validation
- Device fingerprinting
- OTP verification
- Actor identity
- Membership validation
- Assignment validation
- Route and manifest scope validation
- Dynamic-scope audit trail
- Evidence capture
- Anomaly detection

Every custody action should be attributable to:

```text
User
Membership
Organisation
Role
Permission
Static Scope
Dynamic Scope
Device
Timestamp
Location
Shipment
```

---

# 41. Architecture Boundaries

### Core owns:

- Identity and membership context
- Organisation relationships
- Roles and permissions
- Static and dynamic scope
- Address
- Shipment
- Dispatch
- Routing
- Tracking
- Authorization decisions
- Audit records

### External:

- Postcode API
- Maps
- Payments
- Messaging
- External identity authentication
- Cloud infrastructure

External systems may authenticate or enrich requests, but they do not determine Kunemi resource authorization.

---

# 42. Scalability Path

### Stage 1

NestJS modular monolith with central authorization services.

### Stage 2

Queue, outbox, read models and dedicated scope-resolution workers.

### Stage 3

Extract:

- Tracking service
- Dispatch service
- Address service
- Authorization policy service
- Notification service

### Stage 4

Introduce distributed authorization caching and policy evaluation where required, while retaining a central source of truth for memberships, roles, permissions and scope assignments.

---

# 43. Architecture Decision Records

- ADR-001 Modular monolith using NestJS
- ADR-002 PostGIS as spatial engine
- ADR-003 Outbox event system
- ADR-004 Postcode external adapter
- ADR-005 Driver capacity marketplace
- ADR-006 Membership as the link between users and organisations
- ADR-007 Separate static and dynamic authorization scope
- ADR-008 Resource-level authorization after role and scope evaluation
- ADR-009 Dynamic scope activation and expiration for routes and assignments
- ADR-010 Fail-closed authorization for sensitive resources

---

# 44. Reference Architecture

```text
User
  ↓
Authentication
  ↓
Membership
  ↓
Organisation
  ↓
Role
  ↓
Permissions
  ↓
Static Scope + Dynamic Scope
  ↓
Authorization
  ↓
Resource Access
  ↓
Postcode API
  ↓
Adapter
  ↓
Address Service
  ↓
Sorting Engine
  ↓
Dispatch
  ↓
Driver / Courier
  ↓
Hub / PUDO
  ↓
Delivery
  ↓
Events
```

---

# 45. Final Architecture Position

Core primitives:

```text
IDENTITY
MEMBERSHIP
ORGANISATION
ROLE
PERMISSIONS
STATIC SCOPE
DYNAMIC SCOPE
ADDRESS
NETWORK
SHIPMENT
EVENTS
```

Authorization model:

```text
User
  ↓
Authentication
  ↓
Membership
  ↓
Organisation
  ↓
Role
  ↓
Permissions
  ↓
Static Scope + Dynamic Scope
  ↓
Authorization
  ↓
Resource Access
```

Logistics flow:

```text
Address
  ↓
Postcode
  ↓
Sorting
  ↓
Node
  ↓
Capacity
  ↓
Dispatch
  ↓
Movement
  ↓
Delivery
  ↓
Events
```

Kunemi's authorization architecture therefore does not treat access as a simple relationship between a user, organisation, role and permission. It evaluates the user's **active membership**, **organisation context**, **role**, **permissions**, **static geographic or organisational scope**, **dynamic operational scope** and **resource-level policy** before granting access.

This model supports both stable operational boundaries, such as hub and zone assignments, and temporary logistics relationships, such as routes, manifests, assignments and shipment custody. It provides a stronger foundation for secure multi-organisation operations, mobile actors, offline workflows, auditability and future service extraction.

---

## Source Basis

Consolidated from the Kunemi Technical PRD and system design framework.
