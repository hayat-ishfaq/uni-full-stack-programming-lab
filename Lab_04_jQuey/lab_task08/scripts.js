const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "What is the correct JavaScript syntax to write 'Hello World'?",
        options: [
            "System.out.println('Hello World')",
            "console.log('Hello World')",
            "print('Hello World')",
            "echo('Hello World')"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: [
            "<script>",
            "<css>",
            "<style>",
            "<stylesheet>"
        ],
        correct: 2
    },
    {
        question: "How do you select an element with id 'demo' in CSS?",
        options: [
            ".demo",
            "*demo",
            "#demo",
            "demo"
        ],
        correct: 2
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: [
            "onchange",
            "onclick",
            "onmouseclick",
            "onmouseover"
        ],
        correct: 1
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        options: [
            "add()",
            "append()",
            "push()",
            "insert()"
        ],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "/* */",
            "//",
            "Both // and /* */"
        ],
        correct: 3
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image?",
        options: [
            "title",
            "alt",
            "src",
            "caption"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);
let score = 0;

const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const backToResultBtn = document.getElementById('backToResultBtn');

const currentQuestionElement = document.getElementById('currentQuestion');
const totalQuestionsElement = document.getElementById('totalQuestions');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const progressFill = document.getElementById('progressFill');
const currentScoreElement = document.getElementById('currentScore');

const finalScoreElement = document.getElementById('finalScore');
const totalScoreElement = document.getElementById('totalScore');
const scorePercentageElement = document.getElementById('scorePercentage');
const resultMessageElement = document.getElementById('resultMessage');
const correctCountElement = document.getElementById('correctCount');
const incorrectCountElement = document.getElementById('incorrectCount');
const reviewContainer = document.getElementById('reviewContainer');

function showScreen(screen) {
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    reviewScreen.classList.remove('active');
    screen.classList.add('active');
}

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    score = 0;
    showScreen(quizScreen);
    totalQuestionsElement.textContent = quizData.length;
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(optionElement);
    });
    
    updateNavigation();
    updateProgress();
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;
    
    const options = answersContainer.querySelectorAll('.answer-option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
    
    nextBtn.disabled = false;
}

function updateNavigation() {
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
    } else {
        nextBtn.textContent = 'Next →';
    }
    
    if (userAnswers[currentQuestionIndex] === null) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function finishQuiz() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / quizData.length) * 100);
    const incorrectCount = quizData.length - score;
    
    finalScoreElement.textContent = score;
    totalScoreElement.textContent = quizData.length;
    scorePercentageElement.textContent = percentage + '%';
    correctCountElement.textContent = score;
    incorrectCountElement.textContent = incorrectCount;
    
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! Outstanding performance! 🌟';
    } else if (percentage >= 80) {
        message = 'Excellent work! Great job! 👏';
    } else if (percentage >= 60) {
        message = 'Good effort! Keep learning! 📚';
    } else if (percentage >= 40) {
        message = 'Not bad! Room for improvement! 💪';
    } else {
        message = 'Keep practicing! You can do better! 📖';
    }
    
    resultMessageElement.textContent = message;
    showScreen(resultScreen);
}

function showReview() {
    reviewContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const userAnswerIndex = userAnswers[index];
        const correctAnswerIndex = question.correct;
        const isCorrect = userAnswerIndex === correctAnswerIndex;
        
        let answerHTML = '';
        if (isCorrect) {
            answerHTML = `
                <div class="review-answer both-correct">
                    ✓ Your Answer: ${question.options[userAnswerIndex]}
                </div>
            `;
        } else {
            answerHTML = `
                <div class="review-answer user-answer">
                    ✗ Your Answer: ${question.options[userAnswerIndex]}
                </div>
                <div class="review-answer correct-answer">
                    ✓ Correct Answer: ${question.options[correctAnswerIndex]}
                </div>
            `;
        }
        
        reviewItem.innerHTML = `
            <div class="review-question">
                <strong>Question ${index + 1}:</strong> ${question.question}
            </div>
            ${answerHTML}
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
    
    showScreen(reviewScreen);
}

function restartQuiz() {
    startQuiz();
}

function backToResults() {
    showScreen(resultScreen);
}

startBtn.addEventListener('click', startQuiz);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultBtn.addEventListener('click', backToResults);

showScreen(startScreen);