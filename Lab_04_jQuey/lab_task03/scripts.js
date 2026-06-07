// Get form and all input elements
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const age = document.getElementById('age');
const country = document.getElementById('country');
const terms = document.getElementById('terms');
const successMessage = document.getElementById('successMessage');
const closeSuccess = document.getElementById('closeSuccess');

// Validation functions
function validateFullName() {
    const value = fullName.value.trim();
    const formGroup = fullName.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Full name is required');
        return false;
    } else if (value.length < 3) {
        setError(formGroup, errorMessage, 'Name must be at least 3 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError(formGroup, errorMessage, 'Name can only contain letters');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

function validateEmail() {
    const value = email.value.trim();
    const formGroup = email.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Email is required');
        return false;
    } else if (!isValidEmail(value)) {
        setError(formGroup, errorMessage, 'Please enter a valid email address');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

function validatePhone() {
    const value = phone.value.trim();
    const formGroup = phone.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Phone number is required');
        return false;
    } else if (!/^\d{10,15}$/.test(value.replace(/[\s-]/g, ''))) {
        setError(formGroup, errorMessage, 'Please enter a valid phone number');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

function validatePassword() {
    const value = password.value;
    const formGroup = password.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Password is required');
        return false;
    } else if (value.length < 8) {
        setError(formGroup, errorMessage, 'Password must be at least 8 characters');
        return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        setError(formGroup, errorMessage, 'Password must contain uppercase, lowercase, and number');
        return false;
    } else {
        setSuccess(formGroup);
        // Revalidate confirm password if it has a value
        if (confirmPassword.value !== '') {
            validateConfirmPassword();
        }
        return true;
    }
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    const formGroup = confirmPassword.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Please confirm your password');
        return false;
    } else if (value !== password.value) {
        setError(formGroup, errorMessage, 'Passwords do not match');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

function validateAge() {
    const value = age.value.trim();
    const formGroup = age.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Age is required');
        return false;
    } else if (isNaN(value) || value < 18 || value > 120) {
        setError(formGroup, errorMessage, 'Age must be between 18 and 120');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

function validateCountry() {
    const value = country.value;
    const formGroup = country.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (value === '') {
        setError(formGroup, errorMessage, 'Please select your country');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

function validateTerms() {
    const formGroup = terms.parentElement.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (!terms.checked) {
        setError(formGroup, errorMessage, 'You must agree to the terms and conditions');
        return false;
    } else {
        setSuccess(formGroup);
        return true;
    }
}

// Helper function to set error state
function setError(formGroup, errorMessage, message) {
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorMessage.textContent = message;
}

// Helper function to set success state
function setSuccess(formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add blur event listeners to all fields
fullName.addEventListener('blur', validateFullName);
email.addEventListener('blur', validateEmail);
phone.addEventListener('blur', validatePhone);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);
age.addEventListener('blur', validateAge);
country.addEventListener('blur', validateCountry);
terms.addEventListener('change', validateTerms);

// Add input event listeners for real-time validation after first blur
let hasBlurred = {
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    age: false,
    country: false
};

fullName.addEventListener('blur', () => hasBlurred.fullName = true);
fullName.addEventListener('input', () => {
    if (hasBlurred.fullName) validateFullName();
});

email.addEventListener('blur', () => hasBlurred.email = true);
email.addEventListener('input', () => {
    if (hasBlurred.email) validateEmail();
});

phone.addEventListener('blur', () => hasBlurred.phone = true);
phone.addEventListener('input', () => {
    if (hasBlurred.phone) validatePhone();
});

password.addEventListener('blur', () => hasBlurred.password = true);
password.addEventListener('input', () => {
    if (hasBlurred.password) validatePassword();
});

confirmPassword.addEventListener('blur', () => hasBlurred.confirmPassword = true);
confirmPassword.addEventListener('input', () => {
    if (hasBlurred.confirmPassword) validateConfirmPassword();
});

age.addEventListener('blur', () => hasBlurred.age = true);
age.addEventListener('input', () => {
    if (hasBlurred.age) validateAge();
});

country.addEventListener('blur', () => hasBlurred.country = true);
country.addEventListener('change', () => {
    if (hasBlurred.country) validateCountry();
});

// Form submission handler
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    
    // Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isAgeValid = validateAge();
    const isCountryValid = validateCountry();
    const isTermsValid = validateTerms();
    
    // Check if all fields are valid
    const isFormValid = isFullNameValid && isEmailValid && isPhoneValid && 
                       isPasswordValid && isConfirmPasswordValid && isAgeValid && 
                       isCountryValid && isTermsValid;
    
    if (isFormValid) {
        // Show success message
        showSuccessMessage();
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Show success message
function showSuccessMessage() {
    const formWrapper = document.querySelector('.form-wrapper');
    formWrapper.classList.add('blur');
    successMessage.classList.add('show');
}

// Close success message and reset form
closeSuccess.addEventListener('click', function() {
    const formWrapper = document.querySelector('.form-wrapper');
    formWrapper.classList.remove('blur');
    successMessage.classList.remove('show');
    
    // Reset form
    form.reset();
    
    // Remove all validation classes
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
    
    // Reset hasBlurred object
    Object.keys(hasBlurred).forEach(key => {
        hasBlurred[key] = false;
    });
});
