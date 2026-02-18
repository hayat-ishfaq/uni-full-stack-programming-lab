// Store each question and answer in separate variables
const question1 = "Who is creator of JavaScript?";
const answer1 = "Brendan Eich";

const question2 = "HTML stands for:";
const answer2 = "HyperText Markup Language";

const question3 = "CSS stands for:";
const answer3 = "Cascading Style Sheets";

const question4 = "What is capital of Pakistan?";
const answer4 = "Islamabad";

const question5 = "What is the largest planet in our solar system?";
const answer5 = "Jupiter";

// Function to get selected answer for a question
function getSelectedAnswer(questionName) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    return selectedOption ? selectedOption.value : null;
}

// Function to check answer 1 individually
function checkAnswer1() {
    const userAnswer = getSelectedAnswer('question1');
    return userAnswer === answer1;
}

// Function to check answer 2 individually
function checkAnswer2() {
    const userAnswer = getSelectedAnswer('question2');
    return userAnswer === answer2;
}

// Function to check answer 3 individually
function checkAnswer3() {
    const userAnswer = getSelectedAnswer('question3');
    return userAnswer === answer3;
}

// Function to check answer 4 individually
function checkAnswer4() {
    const userAnswer = getSelectedAnswer('question4');
    return userAnswer === answer4;
}

// Function to check answer 5 individually
function checkAnswer5() {
    const userAnswer = getSelectedAnswer('question5');
    return userAnswer === answer5;
}

// Function to calculate total score
function calculateTotalScore() {
    let totalScore = 0;
    
    if (checkAnswer1()) totalScore++;
    if (checkAnswer2()) totalScore++;
    if (checkAnswer3()) totalScore++;
    if (checkAnswer4()) totalScore++;
    if (checkAnswer5()) totalScore++;
    
    return totalScore;
}

// Function to get message based on score using conditional statements
function getScoreMessage(score, total) {
    const percentage = (score / total) * 100;
    
    if (percentage === 100) {
        return "🎉 Perfect Score! You're a genius!";
    } else if (percentage >= 80) {
        return "🌟 Excellent! You have great knowledge!";
    } else if (percentage >= 60) {
        return "👍 Good job! Keep up the good work!";
    } else if (percentage >= 40) {
        return "📚 Not bad! A little more study will help!";
    } else {
        return "💪 Keep learning! Practice makes perfect!";
    }
}

// Function to display results dynamically using DOM manipulation
function displayResults() {
    // Validate that all answers are selected
    const answer1Input = getSelectedAnswer('question1');
    const answer2Input = getSelectedAnswer('question2');
    const answer3Input = getSelectedAnswer('question3');
    const answer4Input = getSelectedAnswer('question4');
    const answer5Input = getSelectedAnswer('question5');
    
    if (!answer1Input || !answer2Input || !answer3Input || !answer4Input || !answer5Input) {
        alert('⚠️ Please answer all questions before submitting!');
        return;
    }
    
    // Calculate score
    const totalScore = calculateTotalScore();
    const totalQuestions = 5;
    const percentage = ((totalScore / totalQuestions) * 100).toFixed(0);
    
    // Get the result container
    const resultContainer = document.getElementById('result-container');
    
    // Clear previous results
    resultContainer.innerHTML = '';
    
    // Create result title
    const resultTitle = document.createElement('h2');
    resultTitle.className = 'result-title';
    resultTitle.textContent = '📊 Quiz Results';
    
    // Create score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.textContent = `Your Score: ${totalScore} / ${totalQuestions} (${percentage}%)`;
    
    // Create message display using conditional statements
    const messageDisplay = document.createElement('div');
    messageDisplay.className = 'message-display';
    messageDisplay.textContent = getScoreMessage(totalScore, totalQuestions);
    
    // Create details title
    const detailsTitle = document.createElement('h3');
    detailsTitle.className = 'details-title';
    detailsTitle.textContent = 'Answer Breakdown:';
    
    // Create details list
    const detailsList = document.createElement('ul');
    detailsList.className = 'details-list';
    
    // Array of question details for easier iteration
    const questionDetails = [
        { num: 1, check: checkAnswer1(), userAnswer: answer1Input, correctAnswer: answer1, question: question1 },
        { num: 2, check: checkAnswer2(), userAnswer: answer2Input, correctAnswer: answer2, question: question2 },
        { num: 3, check: checkAnswer3(), userAnswer: answer3Input, correctAnswer: answer3, question: question3 },
        { num: 4, check: checkAnswer4(), userAnswer: answer4Input, correctAnswer: answer4, question: question4 },
        { num: 5, check: checkAnswer5(), userAnswer: answer5Input, correctAnswer: answer5, question: question5 }
    ];
    
    // Create list items for each question
    questionDetails.forEach(detail => {
        const listItem = document.createElement('li');
        listItem.className = detail.check ? 'correct-answer' : 'incorrect-answer';
        
        const statusIcon = detail.check ? '✓' : '✗';
        const statusText = detail.check ? 'Correct' : 'Incorrect';
        
        listItem.innerHTML = `
            <strong>Question ${detail.num}:</strong> ${statusIcon} ${statusText}<br>
            <span class="answer-detail">Your answer: "${detail.userAnswer}"</span><br>
            ${!detail.check ? `<span class="correct-answer-text">Correct answer: "${detail.correctAnswer}"</span>` : ''}
        `;
        
        detailsList.appendChild(listItem);
    });
    
    // Append all elements to result container using DOM manipulation
    resultContainer.appendChild(resultTitle);
    resultContainer.appendChild(scoreDisplay);
    resultContainer.appendChild(messageDisplay);
    resultContainer.appendChild(detailsTitle);
    resultContainer.appendChild(detailsList);
    
    // Show result container
    resultContainer.classList.add('show');
    resultContainer.style.display = 'block';
    
    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to reset quiz - clears all inputs and results
function resetQuiz() {
    // Clear all radio button selections
    const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    allRadioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Clear result container using DOM manipulation
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'none';
    resultContainer.classList.remove('show');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show confirmation
    console.log('Quiz has been reset!');
}

// Event listeners
document.getElementById('submit-btn').addEventListener('click', displayResults);

document.getElementById('reset-btn').addEventListener('click', resetQuiz);

// Log initialization
console.log('Multiple Choice Quiz initialized successfully!');
console.log('Total questions:', 5);