# Code Highlighting

Syntax highlighting powered by highlight.js

---

## JavaScript

Click any code block to copy it to clipboard.

```javascript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

fetchUser(42).then((user) => console.log(user.name));
```

---

## TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer";
}

function greet(user: User): string {
  return `Hello, ${user.name}! Your role is ${user.role}.`;
}
```

---

## Python

```python
from dataclasses import dataclass
from typing import Generator

@dataclass
class Fibonacci:
    limit: int

    def __iter__(self) -> Generator[int, None, None]:
        a, b = 0, 1
        while a <= self.limit:
            yield a
            a, b = b, a + b

print(list(Fibonacci(limit=100)))
```

---

## Rust

```rust
use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<&str, usize> {
    let mut counts = HashMap::new();
    for word in text.split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }
    counts
}

fn main() {
    let text = "hello world hello rust world";
    println!("{:?}", word_count(text));
}
```

---

## SQL

```sql
SELECT
  u.name,
  COUNT(o.id)    AS order_count,
  SUM(o.total)   AS lifetime_value
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= NOW() - INTERVAL '1 year'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY lifetime_value DESC
LIMIT 10;
```

---

## YAML

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        run: ./deploy.sh
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

---

## Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/var/backups/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

for db in production staging; do
  echo "Backing up $db..."
  pg_dump "$db" | gzip > "$BACKUP_DIR/$db.sql.gz"
done

echo "Done. Backups saved to $BACKUP_DIR"
```

---

## JSON

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "svelte": "^5.0.0"
  }
}
```

---

## Go

```go
package main

import (
	"fmt"
	"sort"
	"strings"
)

func anagram(s, t string) bool {
	chars := strings.Split(s, "")
	sort.Strings(chars)
	sorted := strings.Join(chars, "")
	chars = strings.Split(t, "")
	sort.Strings(chars)
	return sorted == strings.Join(chars, "")
}

func main() {
	fmt.Println(anagram("listen", "silent")) // true
}
```

---

# Click any block to copy!

All code blocks have one-click copy-to-clipboard support.
