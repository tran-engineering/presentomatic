# CORIX - WORKSHOP

## Conditional / dynamic policies in front- and backend

23.01.2025 / Khôi Tran

---

## Agenda

1. Introductions
2. Scope of workshop
3. Conditional / dynamic policies
4. Food for thought when implementing conditional / dynamic policies

---

## Agenda (2)

5. Sample implementation: DEMO
6. Hands-on: Try to check out the code and run it.
7. Dynamic Programming in Spring Framework
8. Dynamic Programming in Angular
9. Sample implementation: Code Review

---

## Formalities

Presentation is available at:

https://tran-engineering.github.io/corix-workshop/

Code:

https://tran-engineering.github.io/corix-backend/

https://tran-engineering.github.io/corix-frontend/

---

# Introductions

---

## Introductions

Tell me about yourselves and knowledge about:

* Java Reflection, Annotations
* Spring Framework
* Angular / RxJS

---

# Scope of workshop

---

## Goal of workshop

* Introduction to dynamic programming in combination with Spring and Angular
* Learn about what's important about permission policies
* Get a feeling of what requirements you expect from a permission system
* Allow you to move forward

## Out of Scope

* Security
  * OAuth2, OICD, JWT
  * Row-Based security (usually known as "Mandantenfähigkeit")
  * User authentication / authorization
* Deployment / Build

---

# Dynamic / conditional policies

---

## Dynamic / conditional policies vs RBAC, ReBAC, ABAC

Most RBAC, ReBAC, ABAC implementations are not dynamic.

---

## Column based security

Access to attributes / fields, depending on:

- User Role (RBAC)
- Access rights (ABAC)
- Relation of User to the entity/field (ReBAC)

---

## Dynamic / conditional policies

The user can only mutate state of the environment / entity / user:

- Mutate `description` only when `state != DONE`
- Only allowed to schedule `meetings` in the future

---

# Open source product for dynamic policies: Casbin

---

## Casbin

Slide 1: Introduction to Casbin

Casbin is an open-source, high-performance access control library that provides a simple and efficient way to manage permissions and access control in your application.

Support for Java, Javascript, Go, Python and many more.

---

## Casbin Key features

* Policy-based Access Control (PBAC)
* Role-based Access Control (RBAC)
* Attribute-based Access Control (ABAC)

---

## Is Casbin the correct choice?

Access control mainly deals with decisions whether a subject has permission on entities or actions.

It does not have direct support for UI/UX related things.
But it can be engineered to do so.

---

# Food for thought when implementing conditional / dynamic policies

---

## Self-made or Open-Source / Commercial implementation

- Evaluation of OSS products can be tedious and must be done carefully.
- Self-made needs good knowledge about dynamic / meta-programming

---

## Software component lifecycle

- Many companies have separate lifecycles for components of a system
  Maybe this leads to separate implementations of policy enforcement too,
  since it is hard to keep it in sync.

---

## User Experience

- Frontend policy validation
- Live vs onsubmit policy checking

---

## Developer Experience

- Single source of truth, not managing policies differently on front- / backend
- Policies must be located near/at entities
- Must be easy to understand / maintain

---

# Sample implementation: DEMO

---

## Backend

- Spring Boot
- REST

---

## Frontend

- Angular

---

# Hands-On: Try to checkout and run the front- and backend

---

# Dynamic programming in Spring Framework

---

## Annotations

- Annotations are metadata that can be placed in code.
- Provide additional information, without being part of the program itself
- Can be used by compiler and runtime

Spring Boot already heavely uses annotations.

---

## Annotation Examples

Working with Annotations during Runtime requires Java Reflection.

```java
@interface Important {
}

@Value
public class Banana {
    private boolean isTasty;

    @Important
    private String sourceCountry;

    @Important
    private BigDecimal price;

    List<Field> getImportantFields() {
        return Arrays.stream(Banana.class.getDeclaredFields())
                .filter(field -> field.isAnnotationPresent(Important.class))
                .toList();
    }
}
```

---

## SpEl: Spring Expression Language

SpEl is a expression language, that is mainly used in Spring Security, Spring Integration, Spring Data Repository.

Most commonly known example is the usage in Spring Data Repositories:

```java
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :#{#username}")
    List<User> findByUsername(@Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.email = :#{#email}")
    List<User> findByEmail(@Param("email") String email);
}
```

---

# Dynamic programming in Angular / Typescript

---

## Expression parsing in JS

- Javascript native `eval` or `new Function()`
- Use a library `parse-eval`, `@casbin/expression-eval`

---

## Native `eval`

```javascript
function evalWithContext(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    return function() { return eval(js); }.call(context);
}

evalWithContext('this.todo.state === "DONE"', {todo: {state: 'DONE'}});
```

Is not recommended, since it has much more possibilities to be insecure, as the code is run in the JS runtime.

---

## `new Function()`

```javascript
function evalWithContext(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    return new Function(js).call(context);
}

evalWithContext('return this.todo.state === "DONE"', {todo: {state: 'DONE'}});
```

---

## Use libraries like `@casbin/expression-eval`

`@casbin/expression/eval` is the expression parser for Casbin.

We can use that for ourselves:

```typescript
const result = casbinEval(casbinParse("todo.state == 'DONE'"), {todo: {state: 'DONE'}});
```

Doesn't use `eval()` or similar internally

---

# Sample implementation: Code Review

---

## Backend

- Uses JPA with Spring Data
- Use Spring Data Repositories to access `@Entity` classes
- `@EditableIf`, `@VisibleIf` annotations
- PolicyController

---

## Frontend

<pre class="mermaid">

sequenceDiagram
    Frontend -->> Backend: Fetch entity
    Frontend -->> Backend: Fetch policies
    Frontend -->> Frontend: Evaluate & Apply EditableIf policy
    Frontend -->> Frontend: Evaluate & Apply Visible policy

</pre>

---

## Policy

Policy evaluation is done in `policy.service.ts`

---


# Thank you & Questions