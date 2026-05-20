# AGENTIC.md

# Agentic Coding Process

## 1. Tools Used

### ChatGPT
I used ChatGPT throughout most of the project lifecycle.

Main uses:
- Generating specific code files
- Debugging Prisma, Docker, and JWT issues
- Generating and improving README documentation
- Assisting with Docker and Prisma setup
- Helping create and understand unit tests

---

### GitHub Copilot (Free Version)

I mainly used Copilot inside the editor for:
- Fast autocomplete
- Small repetitive code
- Initial unit test generation

Copilot was especially useful for generating the initial Jest test structure.

---

## 2. My Approach

I did not ask AI to generate the entire project at once.

Instead, I followed an iterative approach:

1. I first designed the project structure manually using Clean Architecture principles.
2. Then I used AI to generate specific pieces:
   - DTOs
   - Use cases
   - Prisma repositories
   - Docker configuration
   - Authentication setup
   - Unit tests
3. I constantly modified, debugged, and adapted the generated code.
4. I frequently refined prompts after encountering errors or edge cases.

AI was mainly used as:
- A coding assistant
- A debugging assistant
- A way to accelerate work
- A learning tool for technologies I was less familiar with (especially testing)

A significant amount of time was spent validating and correcting AI-generated outputs.

---

## 3. Key Prompts

### Prompt 1

#### Prompt

```txt
dame un dockerFile optimo para el backend, donde no se copie la app completa con las dependencias ni el dist sino que se cree dentro del contenedor y luego ahi si se levante la app automaticamente, luego dame el docker compose que contenga un servicio para levantar la base de datos postgres y uno para la API
```

### What the AI Generated

The AI generated:

- A multi-stage Dockerfile
- A Docker Compose file with:
  - PostgreSQL service
  - Backend service
- Automatic application startup commands

Later, I improved the Docker setup by adding Prisma migration deployment during container startup.

###E valuation

I used most of the generated structure but modified:

- Prisma migration flow
- Build behavior

### Prompt 2

```txt
toma el use-case de register que hice, y en base a ese haz uno para el login, luego ayudame a retornar los https error code correctos, ya que ese es otro requisito de la prueba
```

### What the AI Generated

The AI generated:

- A base login use case
- Credential validation logic
- Initial HTTP exception handling

###Evaluation

I later added with another prompts and my corrections:

- JWT token generation
- Guards
- Strategy validation
- Proper authentication flow

I also improved some exception handling and request validation.

### Prompt 3

```txt
Hay otro problema, baje los contenedores antes y no puede hacer migracion sin que esten levantados, asi que el orden correcto creo que seria levantar los contenedores en segundo plano y luego ejecutar la migracion, cuales serian los comandos que deberian usarse en el readmi en ese caso?
```

### What the AI Generated

The AI explained:

- The correct execution order
- Docker commands
- Prisma migration workflow
- Suggested README setup instructions

### Evaluation

This type of prompt was especially useful for:

- Remembering commands
- Understanding execution flow
- Debugging infrastructure issues quickly

I adapted the final workflow after experimenting with migrations and container startup behavior.

## 4. Critical Evaluation

### Significant AI-Generated Component: Unit Tests

One major AI-assisted area was unit testing using Jest.

The AI correctly generated:

- Mock repositories
- Test module setup
- Basic success/error test cases
- Mock usage for bcrypt

However, several problems needed to be fixed manually:

### Issues Found
- Missing Jest type definitions
- Incorrect project path resolution
- Jest configuration conflicts

### Verification Process

I verified correctness by:

- Running tests directly with npm
- Checking expected success and failure cases
- Confirming mocked dependencies behaved correctly
- Testing API behavior manually using Postman

###Security / Bad Practices Introduced by AI

One issue introduced during debugging was temporarily hardcoding JWT secrets while troubleshooting authentication problems.

This was useful for debugging but not ideal practice for production systems.

I also noticed AI sometimes suggested:

- Overly simplified Docker flows
- Incomplete Prisma migration handling
- Missing environment configuration considerations

These required manual correction.
## 5. What I Learned

The area where I learned the most was automated testing with Jest.

Before this project, I rarely worked with unit testing.

During the project I learned:

- How to structure unit tests
- How to mock dependencies
- How NestJS testing modules work
- How to isolate business logic
- How to test success and failure cases
- How to use Jest mocks with repositories and bcrypt

AI accelerated development significantly, but many generated solutions still needed manual debugging and adaptation before working correctly.
