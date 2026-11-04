# System Design Skill

A structured skill for designing scalable systems — from blank slate to production-ready architecture. Useful for engineering planning, technical interviews, and architecture reviews.

Based on [The System Design Primer](https://github.com/donnemartin/system-design-primer).

---

## How to approach any system design question

**Step 1 — Clarify requirements (5 min)**
- What are the use cases? (write down each one)
- Who are the users? How many? (order of magnitude: 1K / 10K / 1M / 100M DAU)
- What scale does it need to handle? (reads/writes per second, storage volume)
- What are the latency requirements? (< 100 ms? eventual consistency OK?)
- Read-heavy or write-heavy?

**Step 2 — Estimate capacity (3 min)**
- Traffic: QPS at peak, average
- Storage: data per record × records per day × retention period
- Bandwidth: data in/out per second
- Memory (cache): what % of hot data fits in RAM?

**Step 3 — High-level design (10 min)**
- Draw the main components: client → DNS → CDN → load balancer → app servers → database
- Identify the core data models and their relationships
- Define the main APIs (REST/GraphQL): methods, inputs, outputs

**Step 4 — Detailed design (15 min)**
- Dive into 2–3 components the interviewer cares about
- Justify every choice as a trade-off, not a "best practice"

**Step 5 — Identify bottlenecks (5 min)**
- Single points of failure?
- What breaks at 10× current load?
- How do you monitor and alert?

---

## Core concepts

### Performance vs Scalability
- **Performance problem**: slow for a single user
- **Scalability problem**: fast for 1 user, slow for 1 000 → usually means stateful bottleneck

### Latency vs Throughput
- Optimize for **maximum throughput** at **acceptable latency**
- Latency target → drives caching and read path
- Throughput target → drives sharding and write path

### CAP Theorem
Every distributed system picks two of three:
- **Consistency** — every read returns the latest write
- **Availability** — every request gets a response (possibly stale)
- **Partition tolerance** — system works across network splits

In practice: partition tolerance is mandatory for distributed systems, so the real choice is **CP vs AP**.

---

## Component selection guide

### DNS
- Use **Route 53** or **Cloudflare DNS** with weighted routing for traffic splitting
- TTL trade-off: low TTL = faster failover, more DNS queries; high TTL = cheaper, slower failover

### CDN
- **Push CDN**: upload content proactively — good for small, predictable content
- **Pull CDN**: cache on first request — good for large, dynamic traffic spikes
- Invalidation cost: design objects with version keys (`/assets/v3/logo.png`) to avoid cache purge

### Load Balancer
- **Layer 4** (TCP): fast, dumb, no content inspection — use for raw throughput
- **Layer 7** (HTTP): can route by URL/header, sticky sessions, SSL termination — use for apps
- Horizontal scaling: add servers behind LB; vertical scaling: bigger server (hits ceiling faster)
- Active-passive vs active-active: active-active doubles capacity but needs coordination

### App Servers
- Stateless > stateful (state lives in cache/DB, any server handles any request)
- Scale horizontally: add/remove behind LB
- Microservices: good for independent scaling and deploy; bad for distributed tracing and latency

### Databases

**When to use SQL (PostgreSQL, MySQL)**
- Complex queries, joins, transactions (ACID)
- Relational data with clear schema
- Read replicas for horizontal read scaling; primary for writes

**When to use NoSQL**
- Key-value (Redis, DynamoDB): session store, leaderboards, rate limiting
- Document (MongoDB): flexible schema, nested objects (user profiles, product catalogs)
- Wide-column (Cassandra, HBase): time-series, write-heavy, massive scale (IoT, analytics)
- Graph (Neo4j): relationships are first-class (social graphs, recommendation engines)

**Sharding strategy**
- Hash sharding: even distribution, bad for range queries
- Range sharding: good for range queries, can hotspot
- Directory: flexible, single point of failure

**Replication**
- Primary-replica: eventual consistency, read scaling
- Primary-primary: write scaling, conflict resolution needed
- Consistency level: strong / bounded staleness / session / eventual

### Cache

**Levels**
1. Client cache (browser)
2. CDN
3. Web server cache (Nginx reverse proxy cache)
4. Application cache (Redis / Memcached in front of DB)
5. Database cache (query cache, buffer pool)

**Eviction policies**: LRU (most common) / LFU / FIFO

**Write patterns**
- **Cache-aside** (lazy loading): app checks cache, miss → reads DB → writes cache. Simple, risk of stale data.
- **Write-through**: write to cache AND DB together. Consistent, adds write latency.
- **Write-behind** (write-back): write to cache, async flush to DB. Fast writes, risk of data loss.
- **Refresh-ahead**: cache refreshes before expiry. Reduces miss spikes, wastes resources if mispredict.

**Cache invalidation** is the hardest part. Avoid per-entity TTL magic; prefer event-driven invalidation or versioned keys.

### Async / Message Queues (Kafka, SQS, RabbitMQ)
- Decouple producer from consumer; absorb traffic spikes
- Use when: processing > 100 ms, failures should retry, fan-out to multiple consumers
- **Kafka**: durable, ordered, replay — analytics, event sourcing
- **SQS**: managed, at-least-once — task queues, decoupling microservices
- Idempotency: design consumers to handle duplicate delivery safely

---

## Common system design patterns

### Rate Limiting
- Token bucket: smooth bursts, standard choice
- Leaky bucket: strict rate, no burst
- Fixed window: simple, boundary surge problem
- Sliding window: accurate, more memory
- Store state in Redis; shard by user ID

### Consistent Hashing
- Distribute load evenly across nodes
- Adding/removing a node moves only `K/N` keys (not all)
- Use when: distributed caching (Memcached), sharded DB, CDN routing

### Leader Election
- Use ZooKeeper, etcd, or Raft consensus
- Prevents split-brain in primary-primary setups
- Required any time only one node should perform an action (cron job, DB primary)

### Event Sourcing + CQRS
- Event sourcing: store events, derive state — audit log, replay, time travel
- CQRS: separate read model from write model — optimize each independently
- Complexity cost: use only when audit trail or complex read projections are required

---

## Non-functional requirements checklist

| Concern | Approach |
|---|---|
| **High availability** | Active-active across AZs, health checks, circuit breakers |
| **Fault tolerance** | Retry with exponential backoff, dead-letter queues, graceful degradation |
| **Data durability** | Replication factor ≥ 3, cross-region backup, WAL/fsync |
| **Security** | TLS everywhere, least-privilege IAM, rate limiting, WAF |
| **Observability** | Structured logs, distributed traces, RED metrics (Rate / Error / Duration) |
| **Consistency** | Pick the CAP trade-off explicitly; document it |
| **Cost** | Spot instances for stateless workers, reserved for DB, S3 for cold storage |

---

## Interview anti-patterns to avoid
- Jumping to a specific technology without justifying the choice
- Ignoring failure modes ("what happens when the cache is down?")
- Over-engineering for Day 1 (design for 10× current scale, not 1000×)
- Vague requirements ("it should be fast") — force numbers
- One-size-fits-all SQL for everything or NoSQL for everything

---

## References
- [The System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Designing Data-Intensive Applications — Kleppmann](https://dataintensive.net/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
