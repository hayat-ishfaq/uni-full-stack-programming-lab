// Function to validate inputs using conditional statements
function validateInputs(num1, num2, operation) {
    // Check if numbers are valid
    if (isNaN(num1) || num1 === '') {
        return { valid: false, message: 'Please enter a valid first number!' };
    }
    
    if (isNaN(num2) || num2 === '') {
        return { valid: false, message: 'Please enter a valid second number!' };
    }
    
    // Check if operation is selected
    if (!operation || operation === '') {
        return { valid: false, message: 'Please select an operation!' };
    }
    
    // Prevent division by zero
    if (operation === 'divide' && parseFloat(num2) === 0) {
        return { valid: false, message: '⚠️ Cannot divide by zero!' };
    }
    
    return { valid: true, message: 'Valid inputs' };
}

// Function to calculate result based on operation
function calculate(num1, num2, operation) {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let result;
    let operationSymbol;
    
    // Use conditional statements to determine operation
    if (operation === 'add') {
        result = number1 + number2;
        operationSymbol = '+';
    } else if (operation === 'subtract') {
        result = number1 - number2;
        operationSymbol = '-';
    } else if (operation === 'multiply') {
        result = number1 * number2;
        operationSymbol = '×';
    } else if (operation === 'divide') {
        result = number1 / number2;
        operationSymbol = '÷';
    }
    
    return {
        result: result,
        operation: operationSymbol,
        num1: number1,
        num2: number2
    };
}

// Function to display result dynamically using DOM manipulation
function displayResult() {
    // Get input values
    const num1Input = document.getElementById('number1').value;
    const num2Input = document.getElementById('number2').value;
    const operation = document.getElementById('operation').value;
    
    // Validate inputs
    const validation = validateInputs(num1Input, num2Input, operation);
    
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Calculate result
    const calculationResult = calculate(num1Input, num2Input, operation);
    
    // Get result container and display elements
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result-display');
    const operationDetails = document.getElementById('operation-details');
    
    // Clear existing content
    resultDisplay.innerHTML = '';
    operationDetails.innerHTML = '';
    
    // Create result text element
    const resultText = document.createElement('span');
    resultText.className = 'result-text';
    resultText.textContent = calculationResult.result.toFixed(2);
    
    // Change background color based on positive or negative value (BONUS)
    if (calculationResult.result > 0) {
        resultDisplay.className = 'result-display positive';
    } else if (calculationResult.result < 0) {
        resultDisplay.className = 'result-display negative';
    } else {
        resultDisplay.className = 'result-display neutral';
    }
    
    // Create operation details
    const detailsParagraph = document.createElement('p');
    detailsParagraph.textContent = `${calculationResult.num1} ${calculationResult.operation} ${calculationResult.num2} = ${calculationResult.result.toFixed(2)}`;
    
    // Append elements to DOM
    resultDisplay.appendChild(resultText);
    operationDetails.appendChild(detailsParagraph);
    
    // Show result container with animation
    resultContainer.classList.add('show');
}

// Function to clear calculator
function clearCalculator() {
    // Clear input fields
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('operation').value = '';
    
    // Reset result display using DOM manipulation
    const resultDisplay = document.getElementById('result-display');
    const operationDetails = document.getElementById('operation-details');
    
    resultDisplay.innerHTML = '<span class="result-text">--</span>';
    resultDisplay.className = 'result-display';
    operationDetails.innerHTML = '';
    
    // Hide result container
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('show');
    
    // Focus on first input
    document.getElementById('number1').focus();
}

// Event listeners
document.getElementById('calculate-btn').addEventListener('click', displayResult);
document.getElementById('clear-btn').addEventListener('click', clearCalculator);

// Allow Enter key to calculate
document.getElementById('number1').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        displayResult();
    }
});

document.getElementById('number2').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        displayResult();
    }
});

// Log initialization
console.log('Interactive Calculator initialized successfully!');
