# Dynamic Web Homework

## Table of Contents

- [Overview](#overview)
- [Projects](#projects)
  - [Final Project](#final-project)
  - [Midterm Project](#midterm-project)
  - [Week 09 - Context API](#week-09---context-api)
  - [Component Library](#component-library)
  - [Class Tutorials](#class-tutorials)
- [Tech Stack](#tech-stack)
- [Learning Progression](#learning-progression)
- [Assignment Status](#assignment-status)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## Overview

This repository contains projects from a Dynamic Web Development course, showcasing progression from basic React concepts to advanced implementations with Web Audio API, Three.js, and state management patterns.

Projects are organized by week number, following the course structure. Each project demonstrates specific React concepts and patterns learned throughout the semester.

---

## Projects

### Final Project

#### **[Final/](./Final/)** - Audio Visualizer
**React + Web Audio API + Three.js**

A real-time audio visualization experiment that captures microphone input and creates reactive 3D visuals using custom shaders.

**Key Features:**
- Real-time frequency analysis (Bass/Mid/Treble)
- Three.js shader-based 3D sphere visualization
- SVG circular sliders for audio levels
- React Context API for state management
- Beat detection algorithm
- Graceful fallback to simulated audio

**Tech:** React, Three.js, Web Audio API, GLSL Shaders, Vite

---

### Midterm Project

#### **[Midterm/](./Midterm/)** - Digital Synthesizer (Digi Seq)
**React + Tone.js + Component Architecture**

A digital music sequencer with pattern-based step sequencing, BPM controls, and envelope (ADSR) controls.

**Key Features:**
- 4x8 step sequencer grid
- Real-time audio synthesis with Tone.js
- BPM control with circular slider
- ADSR envelope controls
- Pattern selection and management
- Multi-page routing with React Router

**Tech:** React, Tone.js, React Router, Tailwind CSS

**Documentation:** Includes architecture diagrams and component flow documentation

---

### Week 09 - Context API

#### **[Week09/V2/](./Week09/V2/)** - Todo App (Props-based)
**React + JSON Server + Axios**

A todo application using traditional prop drilling pattern with JSON Server for data persistence.

**Key Features:**
- CRUD operations (Create, Read, Update, Delete)
- JSON Server API integration
- Props-based data flow
- REST API client testing

**Tech:** React, JSON Server, Axios

#### **[Week09/V3/](./Week09/V3/)** - Todo App (Context-based)
**React + Context API + JSON Server**

Refactored version using React Context API to eliminate prop drilling.

**Key Features:**
- Context API for global state
- Custom hooks (`useTodosContext`)
- Clean component architecture
- Same CRUD functionality as V2

**Tech:** React, Context API, JSON Server, Axios

**Documentation:** Includes `CONTEXT_EXPLAINED.md` with detailed diagrams

#### **[Week09/V4-hmwk/](./Week09/V4-hmwk/)** - Todo App (Context Homework)
**React + Context API + Styled Components**

Homework assignment implementing Context API with modern styling.

**Key Features:**
- Context-based state management
- Custom hook pattern
- Modern CSS styling
- Clean UI/UX

**Tech:** React, Context API, CSS Modules

---

### Component Library

#### **[Week04-component-library/](./Week04-component-library/)** - Component Library
**React + Tailwind CSS**

A reusable component library with various UI components.

**Components:**
- Accordion
- Banner
- Button
- Card
- Carousel
- Dropdown
- Hero
- Modal
- Navigation
- Sequencer components

**Tech:** React, Tailwind CSS, PostCSS

---

### Class Tutorials

#### **[Week03-memory-game/](./Week03-memory-game/)**
**React State Management**

Memory card matching game demonstrating React state management.

**Key Concepts:**
- useState hooks
- Component state
- Event handling
- Conditional rendering

**Tech:** React, CSS Modules

#### **[Week05-api-integration/](./Week05-api-integration/)**
**API Integration**

Image search application using Unsplash API.

**Key Concepts:**
- API fetching with Axios
- Component composition
- Search functionality
- Image display

**Tech:** React, Axios, Unsplash API

#### **[Week09-context-exercise/](./Week09-context-exercise/)**
**React Context API Practice**

Exercise project comparing state management vs Context API.

**Key Concepts:**
- useState vs Context
- Provider pattern
- Custom hooks
- State vs Context comparison

**Tech:** React, Context API, Tailwind CSS

---

## Tech Stack

### Core Technologies
- **React** - UI framework
- **JavaScript (ES6+)** - Programming language
- **Node.js** - Runtime environment
- **npm** - Package manager

### Libraries & Tools
- **Three.js** - 3D graphics
- **Tone.js** - Web Audio synthesis
- **React Router** - Routing
- **Axios** - HTTP client
- **JSON Server** - Mock REST API
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool
- **Web Audio API** - Audio processing

### State Management
- **React Context API** - Global state
- **useState** - Local component state
- **Custom Hooks** - Reusable logic

---

## Learning Progression

### Phase 1: Fundamentals
1. **Component Basics** - Building reusable UI components
2. **State Management** - useState and component state
3. **Event Handling** - User interactions

### Phase 2: Data & APIs
4. **API Integration** - Fetching external data
5. **Data Persistence** - JSON Server and CRUD operations
6. **Component Composition** - Building complex UIs

### Phase 3: Advanced Patterns
7. **Context API** - Global state management
8. **Custom Hooks** - Reusable logic extraction
9. **Routing** - Multi-page applications

### Phase 4: Advanced Topics
10. **Audio Processing** - Web Audio API
11. **3D Graphics** - Three.js integration
12. **Shader Programming** - GLSL and GPU acceleration

---

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser
- Code editor (VS Code recommended)

### Running a Project

Each project has its own setup. Navigate to the project folder and follow its README:

```bash
# Example: Running the Final project
cd Final
npm install
npm run dev
```

### Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
DynamicWebHomework/
├── Final/                     # Final project - Audio Visualizer
├── Midterm/                  # Midterm - Digital Synthesizer
├── Week03-memory-game/       # Week 03 - Memory game (State management)
├── Week04-component-library/ # Week 04 - Component Library
├── Week05-api-integration/   # Week 05 - API Integration (Unsplash)
├── Week09/
│   ├── V2/                   # Todo App (Props-based with JSON Server)
│   ├── V3/                   # Todo App (Context-based)
│   └── V4-hmwk/              # Context API Homework
├── Week09-context-exercise/  # Context API practice exercise
├── ASSIGNMENT_STATUS.md      # Detailed assignment tracking
└── README.md                 # This file
```

---

## Notes

- Each project folder contains its own `README.md` with specific instructions
- Projects are independent and can be run separately
- Some projects require additional setup (e.g., JSON Server for Week09 projects)
- Check individual project READMEs for detailed setup instructions
- See [ASSIGNMENT_STATUS.md](./ASSIGNMENT_STATUS.md) for detailed assignment tracking

---

## Assignment Status
 
**Quick Summary:**
- Week03 - Memory Game
- Week04 - Component Library
- Week05 - API Integration
- Week09 - Context API (3 versions)
- Midterm Project - Digital Synthesizer
- Final Project - Audio Visualizer

---

## Key Learning Outcomes

- React component architecture
- State management patterns (useState, Context API)
- API integration and data fetching
- Custom hooks and reusable logic
- Routing and navigation
- Audio processing and visualization
- 3D graphics with Three.js
- Shader programming
- Modern build tools (Vite, Webpack)
- CSS frameworks (Tailwind CSS)

---

## License

Educational projects - open for learning purposes.

---

## Author

**Issac Ting**

Dynamic Web Development Course Projects

---

## Acknowledgments

- Course instructors and materials
- React and Three.js communities
- Web Audio API documentation
- Open source libraries and tools
