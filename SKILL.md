---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications.
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

## Backend & System Design

Before implementing any backend or architecture, first understand the system:

- **Purpose**: What problem does the system solve? Who are the users? What is the expected scale?
- **Traffic Profile**: Estimate concurrent users, requests per second, data growth, read/write ratio, and latency requirements.
- **Constraints**: Budget, infrastructure, language/framework, deployment model, compliance, security, and availability requirements.
- **Failure Scenarios**: Design assuming components will fail. Identify bottlenecks and recovery strategies.
- **Differentiation**: Optimize for simplicity first, then scalability. Avoid unnecessary complexity.

## Architecture Principles

Design systems that are:

- Modular and loosely coupled
- Horizontally scalable
- Observable (logging, metrics, tracing)
- Fault tolerant
- Secure by default
- Easy to maintain and extend

Choose the simplest architecture that satisfies the requirements. Introduce complexity only when justified.

## API Design

- Follow REST or GraphQL best practices based on the use case.
- Maintain consistent naming conventions.
- Use proper HTTP status codes.
- Implement validation at every boundary.
- Return structured error responses.
- Support pagination, filtering, sorting, and search where appropriate.
- Version APIs when introducing breaking changes.

## Database Design

Design schemas for both correctness and performance.

Consider:
- Normalization vs denormalization
- Indexing strategy
- Read/write patterns
- Query optimization
- Partitioning or sharding when necessary
- Data retention policies
- Backup and recovery

Choose SQL for strong consistency and relational workloads. Choose NoSQL only when it clearly benefits the application's access patterns.

## Caching

Use caching intentionally.

Possible layers:
- Browser cache
- CDN
- Reverse proxy
- Application cache
- Distributed cache (Redis)

Prevent cache stampedes using techniques like:
- Mutex locking
- Request coalescing
- Stale-while-revalidate
- Randomized TTL
- Background refresh

## Concurrency

Handle concurrent operations safely.

Consider:
- Race conditions
- Distributed locking
- Optimistic locking
- Pessimistic locking
- Idempotency
- Atomic operations
- Event ordering

## Scalability

Design for growth.

Consider:
- Horizontal scaling
- Load balancing
- Stateless services
- Background workers
- Message queues
- Event-driven architecture
- Database replicas
- CDN usage

Avoid premature optimization while ensuring future scalability.

## Performance

Identify critical paths.

Optimize:
- Database queries
- Network round trips
- Serialization
- Memory usage
- CPU-intensive tasks
- Async processing
- Connection pooling

Always measure before optimizing.

## Reliability

Design for resilience.

Include:
- Retries with exponential backoff
- Circuit breakers
- Timeouts
- Dead-letter queues
- Health checks
- Graceful shutdown
- Disaster recovery

Avoid single points of failure.

## Security

Security is mandatory, not optional.

Always consider:
- Authentication
- Authorization (RBAC/ABAC)
- Input validation
- SQL Injection
- XSS
- CSRF
- SSRF
- IDOR
- Rate limiting
- Secure session management
- Secret management
- Encryption in transit and at rest
- Principle of least privilege

Never trust client-side validation.

## Observability

Every production system should include:

- Structured logging
- Metrics
- Distributed tracing
- Monitoring dashboards
- Alerting
- Audit logs

Design systems so failures can be diagnosed quickly.

## Deployment

Prefer modern deployment practices.

Consider:
- Docker
- Kubernetes (when appropriate)
- CI/CD
- Blue-Green deployments
- Rolling updates
- Canary releases
- Infrastructure as Code
- Environment isolation

## Code Quality

Backend code should be:

- Clean
- Modular
- Testable
- Well-documented
- Consistent
- Production-ready

Avoid unnecessary abstractions, duplicated logic, and over-engineering.

## Output Expectations

When asked to design a backend or system:

- Explain architectural decisions.
- Include architecture diagrams (Mermaid) when useful.
- Describe request/data flow.
- Discuss trade-offs.
- Identify bottlenecks.
- Explain scaling strategy.
- Cover security considerations.
- Recommend database schema and indexing.
- Describe caching strategy.
- Explain deployment architecture.
- Mention monitoring and observability.
- Produce production-grade code that follows industry best practices rather than simplified examples.
## File Structure

Organize projects with a clear, scalable, production-ready structure. Avoid dumping everything into a few files.

### General Principles

- Group files by feature rather than file type whenever practical.
- Keep related components, hooks, services, and tests together.
- Separate business logic from presentation.
- Avoid circular dependencies.
- Use meaningful, consistent naming conventions.
- Keep modules focused on a single responsibility.

### Frontend Structure

A frontend project should typically separate:

- Components
- Pages / Routes
- Layouts
- Hooks
- Context / State
- Services / API
- Utilities
- Types
- Styles
- Assets
- Constants
- Config
- Tests

Example:

```text
src/
├── app/
├── components/
│   ├── ui/
│   └── features/
├── layouts/
├── hooks/
├── services/
├── lib/
├── utils/
├── types/
├── constants/
├── styles/
├── assets/
├── context/
├── store/
├── config/
└── tests/
```

### Backend Structure

Separate responsibilities clearly.

A backend project should typically include:

- Routes
- Controllers
- Services
- Repositories / Data Access
- Models
- Middleware
- Validators
- Authentication
- Authorization
- Configuration
- Utilities
- Database
- Jobs / Workers
- Events
- Tests

Example:

```text
src/
├── config/
├── routes/
├── controllers/
├── services/
├── repositories/
├── models/
├── middleware/
├── validators/
├── auth/
├── database/
│   ├── migrations/
│   └── seeders/
├── cache/
├── events/
├── jobs/
├── queues/
├── utils/
├── constants/
├── types/
└── tests/
```

### Naming Conventions

Use consistent naming throughout the project.

- Components: PascalCase
- Classes: PascalCase
- Interfaces: PascalCase
- Files: kebab-case or framework convention
- Variables: camelCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Environment variables: UPPER_SNAKE_CASE

### Code Organization

- Keep files reasonably small and focused.
- Extract reusable logic instead of duplicating code.
- Prefer composition over inheritance.
- Separate business logic from framework-specific code.
- Keep configuration centralized.
- Place shared utilities in dedicated modules.

### Output Expectations

When generating a project:

- Always propose a complete folder structure before writing code.
- Place every generated file in its correct location.
- Follow framework conventions unless there is a strong reason not to.
- Use scalable architecture suitable for production projects rather than small demos.
- Keep the structure easy to navigate and extend.