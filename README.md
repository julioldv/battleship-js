# Battleship

A browser-based implementation of the classic Battleship game, built with vanilla JavaScript

The project focuses on test-driven development, object design, separation of game logic from DOM manipulation, and coordinating multiple modules in a complete interactive application.

## Features

- Interactive 10×10 Battleship boards
- Player fleet placement
- Horizontal and vertical ship orientation
- Full fleet with ships of lengths 5, 4, 3, 3, and 2
- Placement validation for:
  - Board boundaries
  - Overlapping ships

- Randomized computer fleet placement
- Random computer attacks
- Prevention of repeated attacks
- Hit and miss tracking
- Automatic turn handling
- Win detection when an entire fleet is sunk
- Hidden enemy ships until they are hit

## Built With

- HTML
- CSS
- JavaScript
- Webpack
- Jest
- ESLint
- Prettier

## Architecture

The game is divided into modules with separate responsibilities:

- **Ship** — tracks ship length, received hits, and whether the ship has sunk.
- **Gameboard** — manages ship placement, attacks, misses, and fleet state.
- **Player** — owns a gameboard and handles player or computer attacks.
- **Game controller** — coordinates setup, turns, fleet placement, and win conditions.
- **DOM module** — renders gameboards and translates user interaction into game actions.

Game logic is kept separate from DOM manipulation so that the core behavior can be tested independently of the user interface.

## Testing

The core game logic was developed using Jest and a test-driven approach.

Tests cover behavior such as:

- Ship hits and sinking
- Horizontal and vertical ship placement
- Out-of-bounds placement
- Ship overlap prevention
- Hits and misses
- Repeated attacks
- Fleet destruction
- Independent player gameboards
- Computer attacks
- Game setup and turn flow
- Win conditions
- Human fleet placement

Run the test suite with:

```bash
npm test
```

## Running Locally

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd battleship
```

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

## What I Learned

This project helped me practice designing an application by breaking a larger problem into smaller objects with clear responsibilities.

Some of the main concepts I worked with were:

- Test-driven development
- Factory functions and closures
- Encapsulation and public interfaces
- Separation of concerns
- Two-dimensional arrays and coordinate-based state
- Delegation between objects
- Game state and turn management
- Event delegation
- DOM rendering based on application state
- Incremental refactoring

One of the main lessons from the project was to build the simplest working behavior first and allow the architecture to evolve as new requirements introduced real needs.

## Future Improvements

Possible improvements include:

- Additional responsive and visual polish
- Improved feedback during ship placement
- Restart / new game functionality
- Smarter computer targeting after a successful hit
- Drag-and-drop ship placement
