# Webpack Template

A reusable webpack template for modern JavaScript projects.

## Features

- Webpack configured with separate development and production configurations
- Native ES Modules (ESM)
- ESLint with recommended rules and browser/Jest globals
- Prettier for consistent code formatting
- Modern Normalize CSS reset
- Jest configured for unit testing with native ESM
- Format on save support for VS Code
- Organized project structure (`assets`, `components`, `modules`)

## Project Structure

```text
src/
├── assets/
├── components/
├── modules/
├── index.js
├── styles.css
└── template.html
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

Check code quality:

```bash
npm run lint
```

Format all files:

```bash
npm run format
```

Verify formatting:

```bash
npm run format:check
```

## Included Tools

- Webpack
- ESLint
- Prettier
- Jest
- Modern Normalize
