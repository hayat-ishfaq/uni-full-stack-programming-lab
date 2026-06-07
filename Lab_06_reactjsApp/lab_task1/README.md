# Counter Application - Lab Task 1

## Objective
Practice using React State to manage dynamic data with a counter application.

## Features
✅ React State Management using `useState` hook
✅ Increment button - increases counter by 1
✅ Decrement button - decreases counter by 1 (prevents going below 0)
✅ Reset button - resets counter to 0
✅ Current count display
✅ Responsive design with modern UI

## Project Structure
```
lab_task1/
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── App.js            # Main App component
│   ├── App.css           # App styling
│   ├── Counter.js        # Counter component (main logic)
│   ├── index.js          # React entry point
│   └── index.css         # Global styling
├── package.json          # Project dependencies
└── README.md             # This file
```

## How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
The app will open at http://localhost:3000

### 3. Build for Production
```bash
npm build
```

## Key Concepts Demonstrated

### 1. React Hooks - useState
```javascript
const [count, setCount] = useState(0);
```
- Manages the counter state
- `count` holds the current value
- `setCount` updates the state

### 2. Event Handling
```javascript
<button onClick={handleIncrement}>Increment</button>
```
- Responds to button clicks
- Updates state using event handlers

### 3. Conditional Logic
```javascript
if (count > 0) {
  setCount(count - 1);
}
```
- Prevents count from going below 0
- Implements business logic validation

### 4. Component Props & Composition
- Counter component encapsulates all counter logic
- Can be reused in different parts of the app

## Styling Features
- **Modern Gradient Background**: Purple/teal gradient
- **Responsive Design**: Works on mobile and desktop
- **Button Effects**: Hover animations and color changes
  - Green for Increment
  - Orange for Decrement
  - Red for Reset
- **Large Display**: Easy to read counter value

## Technologies Used
- React 18.2.0
- CSS3
- React Hooks

## Learning Outcomes
- Understand React functional components
- Master the `useState` hook for state management
- Implement event listeners in React
- Apply conditional logic in state updates
- Create responsive, user-friendly UI
