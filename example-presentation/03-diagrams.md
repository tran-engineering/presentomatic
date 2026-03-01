# Mermaid Diagrams

Click any diagram to open it fullscreen with pan & zoom

---

## Flowchart

```mermaid
flowchart LR
    A([Start]) --> B{Is it working?}
    B -- Yes --> C([Ship it! 🚀])
    B -- No --> D[Read the error]
    D --> E{Understand it?}
    E -- Yes --> F[Fix the bug]
    E -- No --> G[Google it]
    G --> H[Stack Overflow]
    H --> F
    F --> B
```

---

## Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant API
    participant DB

    User->>Browser: Click "Login"
    Browser->>API: POST /auth/login
    API->>DB: SELECT user WHERE email=?
    DB-->>API: user row
    API-->>Browser: 200 OK + JWT token
    Browser-->>User: Redirect to dashboard
```

---

## Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email
        datetime created_at
    }
    POST {
        int id PK
        int user_id FK
        string title
        text body
        datetime published_at
    }
    COMMENT {
        int id PK
        int post_id FK
        int user_id FK
        text body
    }
    TAG {
        int id PK
        string name
    }

    USER ||--o{ POST : writes
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST }o--o{ TAG : tagged_with
```

---

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Fetching: user submits form
    Fetching --> Success: 200 OK
    Fetching --> Error: network failure
    Fetching --> Error: 4xx / 5xx
    Success --> Idle: reset
    Error --> Fetching: retry
    Error --> Idle: dismiss
    Success --> [*]: done
```

---

## Gantt Chart

```mermaid
gantt
    title Q1 Release Plan
    dateFormat YYYY-MM-DD
    section Backend
        API design        :done,    be1, 2025-01-06, 7d
        Implementation    :done,    be2, after be1, 14d
        Testing           :active,  be3, after be2, 7d
    section Frontend
        UI mockups        :done,    fe1, 2025-01-06, 5d
        Component build   :active,  fe2, after fe1, 14d
        Integration       :         fe3, after fe2, 7d
    section DevOps
        CI pipeline       :done,    ops1, 2025-01-06, 3d
        Staging deploy    :         ops2, after be3, 3d
```

---

## Pie Chart

```mermaid
pie title Where does the time go?
    "Writing code" : 20
    "Reading docs" : 15
    "Debugging" : 30
    "Meetings" : 25
    "Coffee breaks" : 10
```

---

## Git Graph

```mermaid
gitGraph
    commit id: "init"
    commit id: "feat: auth"
    branch feature/dashboard
    checkout feature/dashboard
    commit id: "feat: dashboard"
    commit id: "feat: charts"
    checkout main
    commit id: "fix: login bug"
    merge feature/dashboard id: "Merge dashboard"
    commit id: "chore: release v1.0"
```

---

## C4 Context Diagram

```mermaid
C4Context
    title System Context: Online Shop
    Person(customer, "Customer", "Places orders online")
    System(shop, "Online Shop", "Handles catalogue, cart, checkout")
    System_Ext(payment, "Payment Gateway", "Processes payments (Stripe)")
    System_Ext(email, "Email Service", "Sends order confirmations")

    Rel(customer, shop, "Browses & orders")
    Rel(shop, payment, "Charges card")
    Rel(shop, email, "Sends receipts")
```

---

# Click to zoom!

Every diagram opens fullscreen with **pan & zoom** support.

Press **Escape** or click outside to close.
