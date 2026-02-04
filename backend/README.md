# Auteur AI Backend (Spring Boot)

Java 21 + Spring Boot 3.2 backend API.

## Setup

Requirements:

- Java 21 LTS
- Maven 3.9+

## Configuration

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   _(Note: I created a `.env` file for you, duplicate it as `.env.example` if you want to commit a template)_

2. Open `.env` and configure your MongoDB URI:
   ```properties
   MONGODB_URI=mongodb+srv://user:pass@cluster...
   ```

## Development

```bash
mvn spring-boot:run
```

## Build

```bash
mvn clean package
```

## Compile

```bash
mvn compile
```

The JAR file will be generated in `target/`.

---

**Note**: Backend implementation starts in Week 4 of the roadmap.
