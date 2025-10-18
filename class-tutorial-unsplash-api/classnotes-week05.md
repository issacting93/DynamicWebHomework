
# 🧠 Lecture Notes: Controlled Inputs and Data Flow in React

## Using API

### 1. Understanding Controlled Components

In React, form elements like `<input>` don't manage their own state directly. Instead, their value is controlled by React state — that's why they're called controlled components.

**🔄 Controlled vs Uncontrolled Components:**
```
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│        VANILLA JS               │    │           REACT                 │
│     (Uncontrolled)              │    │        (Controlled)             │
├─────────────────────────────────┤    ├─────────────────────────────────┤
│                                 │    │                                 │
│  <input>                        │    │  const [term, setTerm] =        │
│  User types → DOM stores value  │    │      useState('');              │
│                                 │    │                                 │
│  To get value:                  │    │  <input                         │
│  document.querySelector()       │    │    value={term}                 │
│                                 │    │    onChange={setTerm}           │
│  ❌ React doesn't know value    │    │  />                             │
│                                 │    │                                 │
│  ❌ No re-renders               │    │  ✅ React controls value        │
│                                 │    │  ✅ Automatic re-renders        │
└─────────────────────────────────┘    └─────────────────────────────────┘
```

```jsx
const [term, setTerm] = useState('');

const handleChange = (event) => {
  setTerm(event.target.value);
};
```

**📊 How Controlled Components Work:**
```
User types "c" → handleChange fires → setTerm("c") → React re-renders → input shows "c"
User types "a" → handleChange fires → setTerm("ca") → React re-renders → input shows "ca"
User types "t" → handleChange fires → setTerm("cat") → React re-renders → input shows "cat"
```

**Here:**
- `term` holds the input's current value
- `setTerm()` updates it every time the user types
- `value={term}` in the input ensures React controls what's displayed

### 2. Implementing a Search Bar Component

Let's build a SearchBar that updates its value as the user types and triggers a search when submitted.

```jsx
function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState('');

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevents page reload
    onSubmit(term); // passes data to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Search..."
      />
    </form>
  );
}
```

**🔄 SearchBar Component Flow:**
```
┌─────────────────────────────────────────────────────────────────┐
│                      SearchBar Component                        │
├─────────────────────────────────────────────────────────────────┤
│  State: const [term, setTerm] = useState('')                    │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   User Types    │    │  handleChange   │    │   State      │ │
│  │   "cats"        │───▶│   fires         │───▶│   Updates    │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│         │                       │                       │       │
│         ▼                       ▼                       ▼       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │  Form Submit    │    │ handleSubmit    │    │ onSubmit()   │ │
│  │   (Enter key)   │───▶│   fires         │───▶│   calls      │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**What's Happening:**
- Every keystroke triggers `handleChange`
- The input's value updates to match the state
- On form submit, we prevent reload and send term to the parent



### 3. Parent–Child Communication (Data Flow)

**🔄 React Data Flow Pattern:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    Data Flow Direction                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Parent Component (App)                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  State: [images, setImages]                             │    │
│  │  Functions: handleSubmit()                              │    │
│  │                                                         │    │
│  │  ▼ Props DOWN ▼                                         │    │
│  │  <SearchBar onSubmit={handleSubmit} />                  │    │
│  │  <ImageList images={images} />                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│         │                               │                       │
│         ▼                               ▼                       │
│  Child Components              Child Components                 │
│  ┌─────────────────┐           ┌─────────────────┐              │
│  │   SearchBar     │           │   ImageList     │              │
│  │                 │           │                 │              │
│  │ ▲ Callback UP ▲ │           │  Receives props │              │
│  │ onSubmit(term)  │           │  images={...}   │              │
│  └─────────────────┘           └─────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

React data flows **down** via props and **up** via callbacks.

In the parent component (App), we handle the actual image search logic:

```jsx
function App() {
  const [images, setImages] = useState([]);

  const handleSubmit = async (term) => {
    const result = await searchImages(term); // API call
    setImages(result);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
    </div>
  );
}
```

**📊 Data Flow Diagram:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Types    │    │   SearchBar     │    │   App.js        │    │   ImageList     │
│   in Input      │    │   Component     │    │   Component     │    │   Component     │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
   1. Types "cats"    2. Updates term state    3. Calls searchImages()    4. Receives images
         │                       │                       │                       │
         │                       ▼                       ▼                       ▼
         │              onChange={setTerm}      const result = await     images.map() →
         │                       │               searchImages(term)      renders <img>
         │                       │                       │                       │
         │                       ▼                       ▼                       ▼
         │              value={term}             setImages(result)        User sees images
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
   User submits form    onSubmit(term) →      Parent handles API      Child displays data
```

**📁 Relevant Files:**
- **`SearchBar.js`** - Handles user input and form submission
- **`App.js`** - Manages state and API calls  
- **`ImageList.js`** - Maps through images and renders them
- **`api.js`** - Contains searchImages() function for API calls


### 4. Rendering Lists with .map()

The search results come back as an array of image objects. We can render them using `.map()`:

```jsx
function ImageList({ images }) {
  const renderedImages = images.map((image) => (
    <img
      key={image.id}
      src={image.urls.small}
      alt={image.alt_description}
    />
  ));

  return <div>{renderedImages}</div>;
}
```

**❌ Common Error:**
```
"Objects are not valid React children"
```

**🔄 What's Wrong vs What's Right:**
```
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│           ❌ WRONG              │    │           ✅ CORRECT             │
├─────────────────────────────────┤    ├─────────────────────────────────┤
│                                 │    │                                 │
│  return (                       │    │  return (                       │
│    <div>{images}</div>          │    │    <div>                        │
│  )                              │    │      {images.map(image => (     │
│                                 │    │        <img                     │
│  ❌ Trying to render objects    │    │          key={image.id}          │
│  ❌ React can't display objects │    │          src={image.urls.small}  │
│                                 │    │          alt={image.alt}         │
│                                 │    │        />                       │
│                                 │    │      ))}                        │
│                                 │    │    </div>                       │
│                                 │    │  )                              │
│                                 │    │                                 │
│                                 │    │  ✅ Return JSX elements         │
│                                 │    │  ✅ Each image becomes <img>    │
└─────────────────────────────────┘    └─────────────────────────────────┘
```

It means you're trying to render an object directly instead of returning JSX in `.map()`.

### 5. Breaking Into Smaller Components

As our app grows, we should separate logic into smaller parts:

**🏗️ Component Architecture:**
```
┌─────────────────────────────────────────────────────────────────┐
│                         App.js                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  • Manages state: [images, setImages]                   │    │
│  │  • Handles API calls: handleSubmit()                    │    │
│  │  • Coordinates between components                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│         │                     │                                │
│         ▼                     ▼                                │
│  ┌─────────────┐    ┌─────────────────┐                       │
│  │ SearchBar   │    │   ImageList     │                       │
│  │ Component   │    │   Component     │                       │
│  │             │    │                 │                       │
│  │ • Handles   │    │ • Maps through  │                       │
│  │   input     │    │   images array  │                       │
│  │ • Form      │    │ • Renders list  │                       │
│  │   submit    │    │   of ImageItems │                       │
│  └─────────────┘    └─────────────────┘                       │
│                              │                                │
│                              ▼                                │
│                     ┌─────────────────┐                       │
│                     │   ImageItem     │                       │
│                     │   Component     │                       │
│                     │                 │                       │
│                     │ • Renders       │                       │
│                     │   single image  │                       │
│                     │ • Image +       │                       │
│                     │   metadata      │                       │
│                     └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

- **App** → Manages state and API calls
- **SearchBar** → Handles input and submission
- **ImageList** → Maps through the array of images
- **ImageItem** → Renders a single image and its metadata

**Example:**
```jsx
function ImageItem({ image }) {
  return (
    <div className="image-item">
      <img src={image.urls.small} alt={image.alt_description} />
      <p>{image.alt_description}</p>
    </div>
  );
}
```


### 6. The Importance of State

We store values like `term` and `images` in state so that React knows when to re-render the component.

- `useState` = store and update dynamic data
- Updating state triggers a re-render
- The UI always reflects the most recent data

**Example:**
```jsx
const [images, setImages] = useState([]);
```

**🔄 Async/Await Flow:**
```
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│         ❌ WITHOUT AWAIT        │    │          ✅ WITH AWAIT          │
├─────────────────────────────────┤    ├─────────────────────────────────┤
│                                 │    │                                 │
│  const result = searchImages(); │    │  const result = await           │
│  console.log(result);           │    │    searchImages();              │
│  // logs: Promise {<pending>}   │    │  console.log(result);           │
│                                 │    │  // logs: [image1, image2...]   │
│  ❌ React renders immediately   │    │                                 │
│  ❌ result is undefined         │    │  ✅ React waits for data        │
│  ❌ No images displayed         │    │  ✅ result has actual data      │
│                                 │    │  ✅ Images display correctly    │
└─────────────────────────────────┘    └─────────────────────────────────┘
```

**If you forget await when fetching:**
```jsx
const result = searchImages(term); // ❌ result is a Promise
```

You'll get undefined because React renders before the data returns. **Always use await with async calls.**

### 7. The Big Picture

At the end of the day, this workflow is about connecting user input, state, and UI updates:

**🔄 Complete Application Flow:**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    User     │    │  SearchBar  │    │    App      │    │ ImageList   │
│             │    │             │    │             │    │             │
│ Types "cat" │───▶│ setTerm()   │───▶│ handleSubmit│───▶│ Receives    │
│             │    │ Updates     │    │ Calls API   │    │ images      │
│             │    │ State       │    │ setImages() │    │ Renders     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                   │                   │                   │
      ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Input      │    │  Local      │    │  API        │    │  User       │
│  Updates    │    │  State      │    │  Response   │    │  Sees       │
│  In Real    │    │  Changes    │    │  Received   │    │  Images     │
│  Time       │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

**Step-by-step:**
```
User → types term → setTerm() updates state
App → handlesSubmit(term) → fetch → setImages()
React → re-renders → ImageList displays results
```


### 8. API Integration with Unsplash

**Setting up API requests with Axios:**
```bash
npm install axios
```

**Creating API utility functions:**
```jsx
import axios from 'axios'

const searchImages = async (term) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: 'Client-ID YOUR_API_KEY_HERE'
    },
    params: {
      query: term
    }
  })
  
  return response.data.results
}
```

**Environment Variables (.env file):**
```env
REACT_APP_UNSPLASH_ACCESS_KEY=your_actual_key_here
```

**Using environment variables:**
```jsx
const searchImages = async (term) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    },
    params: {
      query: term
    }
  })
  
  return response.data.results
}
```

**🔐 Environment Variables Flow:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    Security Best Practices                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  .env file (local only)                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ REACT_APP_UNSPLASH_ACCESS_KEY=abc123xyz                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                    │
│                            ▼                                    │
│  api.js                                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ process.env.REACT_APP_UNSPLASH_ACCESS_KEY              │    │
│  │         ↓                                              │    │
│  │ Authorization: `Client-ID ${process.env.REACT_APP...}`  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ✅ API key stays secret                                        │
│  ✅ Not committed to GitHub                                     │
│  ✅ Works in development and production                         │
└─────────────────────────────────────────────────────────────────┘
```

### 9. Next Steps

Once the app works:
- Add loading and error states
- Extract `searchImages()` into a separate API utility file
- Add an `ImageItem` component for better structure and reusability
- Consider accessibility: always include alt text for images
- Use `.env` files to store API keys securely

## Key Takeaways

✅ **Controlled components** keep input in sync with React state  
✅ **Parent components** handle side effects (like fetching data)  
✅ **Always use async/await** for API calls  
✅ **Use .map()** to render lists safely  
✅ **Split logic** into small, reusable components  
✅ **Never commit API keys** to version control  
✅ **Use environment variables** for sensitive data


---

# 🐣 The Chicken Memory Game (React + useState + useEffect)

## 🎯 Learning Objectives

By the end of this session, you'll learn how to:
- Use `useState` and `useEffect` to manage interactive game logic
- Duplicate and shuffle data arrays in React
- Handle player choices and compare results
- Manage turns and game progress
- Use `classnames` and CSS modules for conditional styling

## 🐣 Introduction

We're building a Memory Matching Game featuring your real chickens 🐔: **Bilbo, Cameron, Nikki, and Pollux**.

- Each card represents a chicken
- Players click two cards at a time — if they match, they stay flipped; otherwise, they flip back
- The game also counts how many turns it takes to match all pairs

## 🧱 1. Project Setup

**Create a new React app:**
```bash
 npx create-react-app chicken-memory-game
cd chicken-memory-game
npm start
```

**Inside `src/`, create folders:**
```
 src/
├── components/
│    ├── Grid.js
│    └── Card.js
├── styles/
│    ├── Grid.module.css
│    └── UI.module.css
└── images/
     ├── bilbo.png
     ├── cameron.png
     ├── nikki.png
     └── pollux.png
```

**Install classnames (for conditional styling):**
```bash
 npm install classnames
```

## 🧩 2. The Four Pieces of State

In `Grid.js`, we'll need four key state variables to drive the game:

```jsx
const [cards, setCards] = useState([]);        // deck of cards
const [turns, setTurns] = useState(0);         // number of turns taken
const [choiceOne, setChoiceOne] = useState(null);
const [choiceTwo, setChoiceTwo] = useState(null);
const [disabled, setDisabled] = useState(false); // lock board during comparison
```

**Explanation:**
- **cards**: The shuffled deck of chicken cards
- **turns**: Increments each time two cards are flipped
- **choiceOne / choiceTwo**: Track the user's selected cards
- **disabled**: Prevents new clicks while comparing two open cards



## 🪶 3. Duplicating, Shuffling, and Dealing the Cards

Start with a base set of chicken images:

```jsx
const baseImages = [
  { src: Bilbo, matched: false },
  { src: Cameron, matched: false },
  { src: Nikki, matched: false },
  { src: Pollux, matched: false },
];
```

Now we'll duplicate, shuffle, and assign IDs when the player starts a new game:

```jsx
const shuffleCards = () => {
  const shuffled = [...baseImages, ...baseImages]
    .sort(() => Math.random() - 0.5) // randomize order
    .map((card) => ({
      ...card,
      id: crypto.randomUUID(), // unique id
    }));

  setChoiceOne(null);
  setChoiceTwo(null);
  setCards(shuffled);
  setTurns(0);
  setDisabled(false);
};
```

**✅ Key Concepts:**
- **Spread syntax (`...`)** duplicates the array
- **`.sort(() => Math.random() - 0.5)`** shuffles the array by randomly reordering its elements
  - `Math.random()` returns a number between 0 and 1
  - Subtracting 0.5 makes the result positive or negative, so sort randomly swaps elements
- **`.map()`** creates a new array where each card object is copied and given a unique id property
  - The spread operator `...card` copies all properties
  - `id: crypto.randomUUID()` assigns a new unique identifier to each card

**Game State Reset:**
- `setChoiceOne(null)` - clears the first selected card
- `setChoiceTwo(null)` - clears the second selected card  
- `setCards(shuffled)` - updates the cards state with the new shuffled deck
- `setTurns(0)` - resets the turn counter to zero
- `setDisabled(false)` - re-enables the board for user interaction

## 🧮 4. Rendering the Cards

```jsx
return (
  <>
    <button onClick={shuffleCards}>New Game</button>
    <div className={styles.grid}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
    <div>Turns: {turns}</div>
  </>
);
```

## 🐓 5. The Card Component

Each card flips on click and displays either its back or front image.

```jsx
// Card.js
import cx from 'classnames'
import styles from '../styles/UI.module.css'
import CardBack from '../images/card-back.png'

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (disabled || flipped) return
    handleChoice(card)
  }

  return (
    <div className={styles.flip_card}>
      <div
        className={cx(styles.flip_card_inner, { [styles.flipped]: flipped })}
        onClick={handleClick}
      >
        <div className={styles.flip_card_front}>
          <img src={CardBack} alt="card back" />
        </div>
        <div className={styles.flip_card_back}>
          <img src={card.src} alt="chicken card" />
        </div>
      </div>
    </div>
  )
}
```


## 🎛️ 6. Handling Player Choices

In `Grid.js`:

```jsx
const handleChoice = (card) => {
  if (disabled) return
  if (card === choiceOne) return // don't allow same card twice
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
```

## 🧠 7. Comparing the Two Choices

We'll use `useEffect` to run our comparison logic whenever both choices are set.

```jsx
useEffect(() => {
  if (!choiceOne || !choiceTwo) return
  setDisabled(true)

  const isMatch = choiceOne.src === choiceTwo.src

  if (isMatch) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.src === choiceOne.src ? { ...card, matched: true } : card
      )
    )
    resetTurn()
  } else {
    setTimeout(() => resetTurn(), 1000)
  }
}, [choiceOne, choiceTwo])
```

**Reset Turn:**
```jsx
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns((prev) => prev + 1)
  setDisabled(false)
}
```

**✅ Key Takeaways:**
- Use `useEffect` to handle side effects (comparison logic)
- Lock the board (`disabled=true`) while comparing
- Always reset state after each turn



## 💅 8. CSS: Flip Animation and Styling

**UI.module.css:**
```css
.flip_card {
  perspective: 1000px;
}

.flip_card_inner {
  position: relative;
  width: 150px;
  height: 150px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip_card_front,
.flip_card_back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip_card_back {
  transform: rotateY(180deg);
}

/* Flip trigger */
.flipped {
  transform: rotateY(180deg);
}
```

**Grid.module.css:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}
```


## 🧩 9. Game Flow Diagram

```
New Game → shuffleCards() → setCards() → render deck
Player clicks → handleChoice(card)
If 2 cards → useEffect runs
  ├── Match → set matched: true → resetTurn()
  └── No match → wait 1s → resetTurn()
Turns increment → repeat until all matched
```

## 🧠 10. Key Memory Game Concepts

### State Management:
```jsx
const [cards, setCards] = useState([])        // deck of cards
const [turns, setTurns] = useState(0)         // number of turns taken
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false) // lock board during comparison
```

### Card Shuffling Logic:
```jsx
const shuffleCards = () => {
  const shuffled = [...baseImages, ...baseImages]
    .sort(() => Math.random() - 0.5) // randomize order
    .map((card) => ({
      ...card,
      id: crypto.randomUUID(), // unique id
    }));

  setChoiceOne(null);
  setChoiceTwo(null);
  setCards(shuffled);
  setTurns(0);
  setDisabled(false);
};
```

### Choice Comparison with useEffect:
```jsx
useEffect(() => {
  if (!choiceOne || !choiceTwo) return
  setDisabled(true)

  const isMatch = choiceOne.src === choiceTwo.src

  if (isMatch) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.src === choiceOne.src ? { ...card, matched: true } : card
      )
    )
    resetTurn()
  } else {
    setTimeout(() => resetTurn(), 1000)
  }
}, [choiceOne, choiceTwo])
```

### Parent-Controlled Card Flipping:
```jsx
// Grid component controls when cards flip
flipped={card === choiceOne || card === choiceTwo || card.matched}

// Card component just receives the flipped prop
function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (disabled || flipped) return
    handleChoice(card)
  }

  return (
    <div
      className={cx(styles.flip_card_inner, { [styles.flipped]: flipped })}
      onClick={handleClick}
    >
```

## 🧠 11. Recap: What We Learned

| Concept | Description |
|---------|-------------|
| **useState** | Stores dynamic state (cards, turns, choices) |
| **useEffect** | Handles side effects (compare cards) |
| **.sort() + .map()** | Shuffles and decorates card array |
| **Conditional Props** | Control UI based on state (flipped, disabled) |
| **classnames** | Adds CSS classes dynamically |
| **CSS Modules** | Keep styles local and reusable |
| **Parent-Child State Flow** | Parent controls child component behavior via props |
| **setTimeout** | Delay actions (show cards briefly before reset) |
| **Disabled State** | Prevent user interaction during processing |


  