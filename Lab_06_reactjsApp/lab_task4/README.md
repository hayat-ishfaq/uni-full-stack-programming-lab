# Routing App - Multi-Page Website - Lab Task 4

## Objective
Practice navigation and routing using React Router to build a multi-page website application.

## Features
✅ Multi-page navigation using React Router
✅ Navigation component with Links for page navigation
✅ Home page with hero section, features, and quick links
✅ About page with company information and achievements
✅ Contact Us page with contact form and business information
✅ Products page with product listings and Add to Cart functionality
✅ 404 Not Found page for invalid routes
✅ Cart functionality with item tracking
✅ Form validation on contact form
✅ Responsive design with modern UI

## Project Structure
```
lab_task4/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Navigation.js       # Navigation with Links
│   │   └── Navigation.css      # Navigation styling
│   ├── pages/
│   │   ├── Home.js            # Home page
│   │   ├── Home.css           # Home styling
│   │   ├── About.js           # About page
│   │   ├── About.css          # About styling
│   │   ├── ContactUs.js       # Contact form page
│   │   ├── ContactUs.css      # Contact styling
│   │   ├── Products.js        # Products page
│   │   ├── Products.css       # Products styling
│   │   ├── NotFound.js        # 404 page
│   │   └── NotFound.css       # 404 styling
│   ├── App.js                 # Main app with Routes
│   ├── App.css                # App styling
│   ├── index.js               # React entry point
│   └── index.css              # Global styling
├── package.json               # Project dependencies
└── README.md                  # This file
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

## React Router Implementation

### Routes Configuration
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Navigation with Links
```javascript
<Link to="/">Home</Link>
<Link to="/about">About</Link>
<Link to="/products">Products</Link>
<Link to="/contact">Contact Us</Link>
```

## Pages Overview

### 1. Home Page
- Hero section with call-to-action button
- Features section showcasing benefits
- Quick navigation cards
- Newsletter subscription form
- All sections are fully responsive

### 2. About Page
- Company story and mission
- Core values displayed in cards
- Reasons to choose the company
- Achievements statistics
- Professional layout with organized content

### 3. Contact Us Page
- Contact information section (address, phone, email, hours)
- Social media links
- Fully functional contact form with:
  - Name field (required)
  - Email field (required + validation)
  - Message field (required, minimum 10 characters)
  - Form validation with error messages
  - Success notification after submission
- Responsive two-column layout

### 4. Products Page
- Grid of 8 sample products
- Each product displays:
  - Product icon/emoji
  - Title and description
  - Price
  - Star rating
  - "Add to Cart" button
- Shopping cart functionality:
  - Tracks items added to cart
  - Shows cart count in header
  - Displays cart summary with total
  - Toast notification when item added
- Responsive grid layout

### 5. Not Found (404) Page
- Creative 404 error page
- Helpful navigation links
- Back to home button
- Browse products quick link
- Animated illustration

## Key Concepts Demonstrated

### React Router
- BrowserRouter for navigation
- Routes and Route components
- Link component for navigation
- Wildcard route (*) for 404 handling
- Dynamic routing and page switching

### Component Organization
- Separate page components
- Navigation component
- Modular CSS files
- Reusable patterns

### State Management
- useState for form data
- useState for cart items
- useState for notifications
- State updates and rendering

### Form Handling
- Controlled components
- Form validation
- Error handling
- Success messages
- Input state management

### Responsive Design
- Mobile-first approach
- Media queries
- Flexible grids
- Touch-friendly buttons
- Optimized layouts

## Technologies Used
- React 18.2.0
- React Router DOM 6.14.0
- CSS3 (Gradients, Flexbox, Grid)
- React Hooks (useState)

## UI/UX Features

### Navigation
- Sticky navbar with gradient
- Smooth hover effects
- Active link indicators
- Responsive menu

### Design
- Modern gradient color scheme (purple/blue)
- Card-based layouts
- Smooth animations and transitions
- Clear visual hierarchy
- Consistent spacing and typography

### Interactivity
- Add to cart with notifications
- Form submission with validation
- Hover effects on all interactive elements
- Smooth page transitions

## Learning Outcomes

After completing this lab, you'll understand:
- Setting up React Router in a project
- Creating multiple pages/components
- Navigation between pages using Link
- Configuring routes with Routes and Route
- Handling 404 errors with wildcard routes
- Building multi-page applications
- Form handling in React
- State management for shopping cart
- Responsive design principles
- Component composition and organization

## Features to Explore

1. **Home Page**: Explore the hero section and features
2. **Navigation**: Click navigation links to move between pages
3. **About Page**: Learn about the company's values and achievements
4. **Products Page**: 
   - Add products to cart
   - See cart counter update
   - View cart summary
   - Check total price
5. **Contact Page**:
   - Fill contact form
   - Try submitting with empty fields (see validation)
   - Try invalid email (see validation)
   - Submit valid form (see success message)
6. **404 Page**: 
   - Try navigating to invalid URL (e.g., /invalid)
   - See helpful navigation options

## Testing the App

### Test Navigation
- Click each navigation link
- Verify page content changes
- Check URL in browser updates

### Test Products
- Add multiple items to cart
- Verify cart count increases
- See cart summary updates
- Check total calculation

### Test Contact Form
- Try submitting empty form (validation errors)
- Enter invalid email (validation error)
- Enter short message (validation error)
- Submit valid form (success message)

### Test 404
- Try accessing invalid routes
- See helpful links
- Navigate back to valid pages

## Browser Compatibility
- Works in all modern browsers
- Chrome, Firefox, Safari, Edge
- Mobile browsers supported
- Responsive design on all screen sizes

## Notes
- All CSS is included within the project
- No external CSS libraries required
- Uses inline gradients and modern CSS features
- Fully responsive design
- Production-ready code structure
