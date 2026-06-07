# User Form App - Lab Task 2

## Objective
Practice handling user input using React state and event handlers to build a functional form with validation and data display.

## Features
✅ Name input field with onChange handler
✅ Email input field with onChange handler
✅ Form validation (required fields & email format)
✅ Submit button with form submission handling
✅ Display submitted data below the form
✅ Clear input fields after successful submission
✅ Delete individual entries from the list
✅ Error messages for validation
✅ Responsive design with modern UI

## Project Structure
```
lab_task2/
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── App.js            # Main App component
│   ├── App.css           # App styling
│   ├── UserForm.js       # UserForm component (main logic)
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

### 1. Multiple State Management
```javascript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [submittedData, setSubmittedData] = useState([]);
const [errors, setErrors] = useState({});
```
- Manages form input state
- Stores submitted user data
- Tracks validation errors

### 2. onChange Event Handlers
```javascript
const handleNameChange = (e) => {
  setName(e.target.value);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};
```
- Captures input changes
- Updates state in real-time
- Provides live validation feedback

### 3. Form Submission with Validation
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Validation logic
  // Add to submitted data
  // Clear fields
};
```
- Prevents default form behavior
- Validates input before processing
- Adds data to list on success

### 4. Email Validation
```javascript
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```
- Regular expression for email format validation
- Checks for proper email structure

### 5. Array Manipulation
```javascript
setSubmittedData([...submittedData, newUser]);
const handleDelete = (id) => {
  setSubmittedData(submittedData.filter(item => item.id !== id));
};
```
- Adds new entries to array
- Removes entries by filtering
- Uses unique IDs (timestamp) for identification

### 6. Conditional Rendering
```javascript
{errors.name && <span className="error-message">{errors.name}</span>}
{submittedData.length > 0 && <div className="submitted-data-section">...</div>}
```
- Shows error messages when validation fails
- Displays submitted data section only when data exists

## Functionality Details

### Input Validation
- **Name**: Required field (cannot be empty)
- **Email**: Required field + valid email format
- Error messages appear on form fields with red border
- Errors clear when user starts typing

### Form Submission
1. User fills in name and email
2. Clicks Submit button
3. Form validates both fields
4. If valid:
   - Data is added to the list with unique ID
   - Input fields are cleared
   - Error state is reset
5. If invalid:
   - Error messages display
   - Form stays on the page

### Data Display
- Shows a list of all submitted users
- Each user card displays name and email
- Individual delete button for each entry
- User count displayed in header
- Empty state message when no data

## Technologies Used
- React 18.2.0
- CSS3 (Gradients, Flexbox, Transitions)
- Regular Expressions (Email validation)
- React Hooks (useState)

## User Interface Features
- **Modern Gradient Background**: Purple/violet gradient
- **Responsive Design**: Works on mobile and desktop
- **Form Validation**: Real-time error feedback
- **Delete Functionality**: Remove individual entries
- **Smooth Animations**: Hover effects and transitions
- **Clear User Feedback**: Error messages and empty states

## Learning Outcomes
- Master multiple state variables with useState
- Implement onChange event handlers for form inputs
- Create and handle form submission
- Implement client-side form validation
- Display dynamic lists of data
- Handle array operations (add/remove items)
- Work with unique identifiers
- Provide user feedback through error messages
- Build responsive, user-friendly interfaces

## Testing Features
Once running, you can:
1. Enter a name and email, then click Submit
2. See the data appear below in a user card
3. Try submitting with empty fields to see validation errors
4. Try submitting with an invalid email format
5. Click Delete to remove individual entries
6. Submit multiple entries to populate the list

## Example Usage
```
1. Enter "John Doe" in name field
2. Enter "john@example.com" in email field
3. Click Submit
4. User card appears showing the submitted data
5. Fields are cleared for next entry
6. Click Delete to remove the entry from the list
```
