# Scalability & Architecture (Short Note)

This project is designed to be secure, maintainable, and ready to scale from a single-node deployment to a multi-instance architecture.

## Stack (Today)
- Backend: Node.js + Express
- Database: MongoDB Atlas (Mongoose)
- Cache: Redis (optional but wired-in)
- Frontend: React
- Packaging: Docker + Docker Compose

## What Already Scales
- Stateless APIs with JWT (no server sessions)
- Modular, layered design (controllers, services, models, middleware)
- API versioning: /api/v1
- Input validation, rate limiting, security headers
- MongoDB indexes on hot paths (email, userId, status, priority, createdAt)

## Quick Wins (0–2 weeks)
- Database
  - Ensure indexes:
    - users: { email: 1 } unique
    - tasks: { userId: 1, createdAt: -1 }
    - tasks: { userId: 1, status: 1, priority: 1, createdAt: -1 }
  - Add pagination + bounded projections on all list endpoints
- Caching (Redis)
  - Cache per-user task lists: key `tasks:user:${userId}:filtersHash`, TTL 300s
  - Invalidate on task create/update/delete
- API Performance
  - Gzip compression, HTTP keep-alive
  - Reduce payload size (exclude password, large nested docs)
- Ops
  - Request concurrency limits, 429 with sliding window rate limiter
  - Structured logs (JSON) with correlation id (x-request-id)

## Horizontal Scale (1–2 months)
- Compute
  - Run multiple API replicas behind a load balancer (Nginx/ALB)
  - Keep the app stateless; share nothing except Redis
- Data
  - MongoDB Atlas Replica Set: primary for writes, secondaries for reads (where safe)
  - Use connection string options: retryWrites=true, appropriate readPreference
  - Connection pool tuning (e.g., 50–200 per pod) based on p95 latency
- Redis
  - Managed Redis or Redis Cluster for HA; separate DB/index for rate limits vs cache

## When to Split to Microservices
- Only when one module’s scale/complexity dominates or release cadence diverges.
- Suggested boundaries: Auth, Tasks, Admin/User Management.
- Use REST for synchronous flows; Kafka/RabbitMQ for async events (e.g., task.created).
- Apply the outbox pattern for reliable event emission from DB changes.

## Data Model Guidance (MongoDB)
- Keep documents small and focused; avoid unbounded growth in a single document.
- Prefer referencing over embedding when lists can grow large (tasks reference userId).
- Consider sharding by userId when:
  - Collection size grows to hundreds of GB, or
  - Per-shard write ops approach limits.
- Pick a shard key with good cardinality and distribution (e.g., userId).

## Observability & Reliability
- Metrics: request rate, error rate, p95/p99 latency, DB/Redis timings
- Tracing: OpenTelemetry spans for HTTP + DB
- Health probes: /health (liveness), /ready (readiness)
- Backups: MongoDB automated backups + PITR; test restore
- SLOs & Alerts: e.g., 99.9% availability; alert on error rate >1%, latency spikes

## Security Essentials
- Store secrets in environment/secret manager (never in VCS)
- Rotate JWT secrets/keys; short-lived tokens with refresh if needed
- Strict CORS, Helmet, input validation, and output encoding
- Rate-limit by IP and optionally by userId

## Deployment Path
- Today: Docker Compose for local and single-node deployment
- Next: Container orchestrator (Kubernetes/AKS/EKS)
  - Rolling updates, HPA on CPU/RPS/latency
  - PodDisruptionBudget and resource requests/limits
  - Blue/green or canary releases via Ingress/Gateway

## Minimal Checklist for Scale-Up
- [ ] Indexes in place and verified by query plans
- [ ] Pagination on all list endpoints
- [ ] Redis cache + invalidation for hot reads
- [ ] API replicas behind a load balancer
- [ ] MongoDB replica set; pool tuned; backups validated
- [ ] Metrics, logs, traces; actionable alerts
- [ ] Security hardening and rate limits

This note focuses on practical steps to evolve from a single instance to a resilient, horizontally scalable system using MongoDB Atlas and Redis.
