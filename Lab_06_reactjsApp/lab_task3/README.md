# Interactive Buttons App - Lab Task 3

## Objective
Practice different types of event handling in React, including click events and mouse events.

## Features
✅ Three interactive buttons with onClick handlers
✅ Show Message button - displays dynamic message
✅ Change Background Color button - random color selection from palette
✅ Show Alert button - displays browser alert
✅ Text color change on onMouseOver - hover effect on title
✅ Message clearing functionality
✅ Smooth transitions and animations
✅ Event information display
✅ Responsive design

## Project Structure
```
lab_task3/
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── App.js            # Main App component
│   ├── App.css           # App styling
│   ├── Actions.js        # Actions component (event handling)
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

## Key Event Handlers Demonstrated

### 1. onClick Events
```javascript
// Show Message
<button onClick={handleShowMessage}>Show Message</button>

// Change Background Color
<button onClick={handleChangeBackground}>Change Background Color</button>

// Show Alert
<button onClick={handleShowAlert}>Show Alert</button>
```
- Triggers when button is clicked
- Each button has different functionality
- Updates component state

### 2. onMouseOver Event
```javascript
const handleMouseOver = () => {
  setIsHovering(true);
  setTextColor('#667eea');
};
```
- Changes text color when mouse hovers over title
- Updates state to track hover status
- Provides visual feedback

### 3. onMouseOut Event
```javascript
const handleMouseOut = () => {
  setIsHovering(false);
  setTextColor('#333333');
};
```
- Resets text color when mouse leaves element
- Returns component to initial state
- Completes hover interaction cycle

## Button Functionality Details

### Show Message Button
- **Event**: onClick
- **Color**: Purple/Blue gradient
- **Function**: 
  - Sets a message in state
  - Message displays in a dedicated section below
  - Includes a "Clear Message" button to hide
  - Animates in with slideIn effect

### Change Background Color Button
- **Event**: onClick
- **Color**: Pink/Red gradient
- **Function**:
  - Selects random color from predefined palette
  - Smoothly transitions background color
  - 8 different colors available
  - Button can be clicked multiple times

### Show Alert Button
- **Event**: onClick
- **Color**: Cyan/Blue gradient
- **Function**:
  - Displays browser alert dialog
  - Shows emoji and event handling information
  - Can be dismissed by user

### Title Hover
- **Events**: onMouseOver, onMouseOut
- **Function**:
  - Text color changes on hover (purple/blue)
  - Text scales slightly (1.02x)
  - Adds text shadow effect
  - Smooth transition animation

## State Management

```javascript
const [message, setMessage] = useState('');        // Message content
const [backgroundColor, setBackgroundColor] = useState('#ffffff');  // Background color
const [textColor, setTextColor] = useState('#333333'); // Title text color
const [isHovering, setIsHovering] = useState(false); // Hover state
```

## Color Palette Used
- `#ff6b6b` - Coral Red
- `#4ecdc4` - Teal
- `#45b7d1` - Sky Blue
- `#f9ca24` - Golden Yellow
- `#6c5ce7` - Purple
- `#a29bfe` - Light Purple
- `#fd79a8` - Pink
- `#fdcb6e` - Light Yellow

## UI Features

### Visual Feedback
- **Button Hover**: Lift effect with shadow increase
- **Button Active**: Returns to normal position
- **Title Hover**: Color change with text shadow
- **Message Appear**: Slide-in animation
- **Color Transition**: Smooth 0.5s transition

### Responsive Design
- Mobile-friendly layout
- Stacked buttons on small screens
- Adjusted font sizes for mobile
- Maintained spacing and touch targets

### User Experience
- Clear visual hierarchy
- Emoji indicators for each button
- Helpful hint text
- Event information section
- Clear message section with removal option

## Technologies Used
- React 18.2.0
- CSS3 (Gradients, Animations, Transitions)
- React Hooks (useState)
- Event Handling (onClick, onMouseOver, onMouseOut)

## Learning Outcomes
- Understand onClick event handling
- Implement onMouseOver and onMouseOut events
- Manage multiple state variables
- Update background and text colors via events
- Display and clear dynamic content
- Create smooth transitions and animations
- Provide visual feedback for user interactions
- Structure event handlers efficiently
- Build responsive, interactive components

## Interactions to Try

1. **Click "Show Message"** button
   - Message appears below the buttons
   - Click "Clear Message" to hide it
   - Message updates each time you click

2. **Click "Change Background Color"** button
   - Container background color changes
   - Changes to a random color from palette
   - Click multiple times to see different colors

3. **Click "Show Alert"** button
   - Browser alert dialog appears
   - Shows confirmation of event handling
   - Click OK to dismiss

4. **Hover over the Title**
   - Title text color changes to purple
   - Text slightly scales up
   - Text shadow effect appears
   - Color resets when mouse moves away

## Example Usage Flow
```
1. Open the app
2. Hover over "Interactive Event Handling App" title
   → See text color change to blue/purple
3. Click "Show Message" button
   → Message appears with animation
4. Click "Change Background Color" button
   → Background changes to random color
5. Hover away from title
   → Text color resets to black
6. Click "Show Alert" button
   → Alert dialog displays
7. Clear the message if you want
   → Message section disappears
```

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Supports mobile browsers
- Uses standard React and CSS3 features

## Notes
- All transitions are smooth with CSS ease timing
- State updates are immediate
- Events are properly handled with preventDefault where needed
- Component is fully responsive
