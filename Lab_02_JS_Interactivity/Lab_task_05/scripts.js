function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    const name = nameInput.value.trim();
    
    if (name === '') {
        displayError(nameError, 'Name cannot be empty!');
        markFieldInvalid(nameInput);
        return false;
    } else {
        clearError(nameError);
        markFieldValid(nameInput);
        return true;
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const email = emailInput.value.trim();
    
    if (email === '') {
        displayError(emailError, 'Email cannot be empty!');
        markFieldInvalid(emailInput);
        return false;
    } else if (!email.includes('@')) {
        displayError(emailError, 'Email must contain @ symbol!');
        markFieldInvalid(emailInput);
        return false;
    } else {
        clearError(emailError);
        markFieldValid(emailInput);
        return true;
    }
}

function validateAge() {
    const ageInput = document.getElementById('age');
    const ageError = document.getElementById('age-error');
    const age = parseInt(ageInput.value);
    
    if (isNaN(age) || ageInput.value.trim() === '') {
        displayError(ageError, 'Age is required!');
        markFieldInvalid(ageInput);
        return false;
    } else if (age < 18) {
        displayError(ageError, 'Age must be at least 18!');
        markFieldInvalid(ageInput);
        return false;
    } else if (age > 60) {
        displayError(ageError, 'Age must be 60 or below!');
        markFieldInvalid(ageInput);
        return false;
    } else {
        clearError(ageError);
        markFieldValid(ageInput);
        return true;
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const password = passwordInput.value;
    
    if (password === '') {
        displayError(passwordError, 'Password cannot be empty!');
        markFieldInvalid(passwordInput);
        return false;
    } else if (password.length < 6) {
        displayError(passwordError, 'Password must be at least 6 characters!');
        markFieldInvalid(passwordInput);
        return false;
    } else {
        clearError(passwordError);
        markFieldValid(passwordInput);
        return true;
    }
}

function displayError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function markFieldInvalid(inputElement) {
    inputElement.classList.add('invalid');
    inputElement.classList.remove('valid');
}

function markFieldValid(inputElement) {
    inputElement.classList.add('valid');
    inputElement.classList.remove('invalid');
}

function handleSubmit(event) {
    event.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isAgeValid = validateAge();
    const isPasswordValid = validatePassword();
    
    if (isNameValid && isEmailValid && isAgeValid && isPasswordValid) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const age = document.getElementById('age').value;
        
        const confirmSubmission = confirm('Do you want to submit the registration form?');
        
        if (confirmSubmission) {
            showSuccessMessage(name, email, age);
            
            alert('Thank you for registering! Your account has been created successfully.');
            
            const additionalInfo = prompt('Would you like to add a phone number? (Optional)');
            
            if (additionalInfo && additionalInfo.trim() !== '') {
                alert(`Phone number "${additionalInfo}" has been saved to your profile!`);
            }
            
            setTimeout(() => {
                resetForm();
            }, 5000);
        }
    } else {
        alert('Please fix all errors before submitting!');
    }
    
    return false;
}

function showSuccessMessage(name, email, age) {
    const successMessage = document.getElementById('success-message');
    const successDetails = document.getElementById('success-details');
    
    successDetails.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Age:</strong> ${age}
    `;
    
    successMessage.style.display = 'block';
    successMessage.classList.add('show');
}

function resetForm() {
    document.getElementById('registration-form').reset();
    
    const errorMessages = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorMessages.length; i++) {
        clearError(errorMessages[i]);
    }
    
    const inputs = document.querySelectorAll('.form-input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('valid', 'invalid');
    }
    
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'none';
    successMessage.classList.remove('show');
    
    document.getElementById('name').focus();
}

document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('age').addEventListener('blur', validateAge);
document.getElementById('password').addEventListener('blur', validatePassword);

window.onload = function() {
    document.getElementById('name').focus();
};
