// Test page functionality
let testData = null;
let currentQuestionIndex = 0;
let testTimer = null;
let timeRemaining = 3600; // 60 minutes in seconds
let userAnswers = {};
let testStartTime = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeTestPage();
});

function initializeTestPage() {
    // Initialize agree terms checkbox
    const agreeTerms = document.getElementById('agreeTerms');
    const startTestBtn = document.getElementById('startTestBtn');
    
    if (agreeTerms && startTestBtn) {
        agreeTerms.addEventListener('change', function() {
            startTestBtn.disabled = !this.checked;
        });
    }
    
    // Load test data
    loadTestData();
}

function loadTestData() {
    // Sample test questions
    testData = {
        title: "Mathematics Test",
        duration: 3600, // 60 minutes
        questions: [
            {
                id: 1,
                text: "What is the derivative of x² + 3x + 2?",
                options: [
                    "2x + 3",
                    "x² + 3",
                    "2x + 2",
                    "x + 3"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                text: "Solve for x: 2x + 5 = 13",
                options: [
                    "x = 4",
                    "x = 3",
                    "x = 5",
                    "x = 6"
                ],
                correctAnswer: 0
            },
            {
                id: 3,
                text: "What is the area of a circle with radius 5?",
                options: [
                    "25π",
                    "10π",
                    "15π",
                    "20π"
                ],
                correctAnswer: 0
            },
            {
                id: 4,
                text: "What is the slope of the line y = 3x + 2?",
                options: [
                    "3",
                    "2",
                    "1",
                    "0"
                ],
                correctAnswer: 0
            },
            {
                id: 5,
                text: "Evaluate: ∫(2x + 1)dx",
                options: [
                    "x² + x + C",
                    "2x² + x + C",
                    "x² + 2x + C",
                    "2x + 1 + C"
                ],
                correctAnswer: 0
            },
            {
                id: 6,
                text: "What is the value of sin(30°)?",
                options: [
                    "1/2",
                    "√3/2",
                    "1",
                    "√2/2"
                ],
                correctAnswer: 0
            },
            {
                id: 7,
                text: "Solve: x² - 5x + 6 = 0",
                options: [
                    "x = 2, 3",
                    "x = 1, 6",
                    "x = 2, 6",
                    "x = 1, 3"
                ],
                correctAnswer: 0
            },
            {
                id: 8,
                text: "What is the determinant of [[2,1],[3,4]]?",
                options: [
                    "5",
                    "8",
                    "7",
                    "6"
                ],
                correctAnswer: 0
            },
            {
                id: 9,
                text: "What is log₂(8)?",
                options: [
                    "3",
                    "2",
                    "4",
                    "8"
                ],
                correctAnswer: 0
            },
            {
                id: 10,
                text: "What is the sum of angles in a triangle?",
                options: [
                    "180°",
                    "360°",
                    "90°",
                    "270°"
                ],
                correctAnswer: 0
            },
            {
                id: 11,
                text: "What is the quadratic formula?",
                options: [
                    "x = (-b ± √(b²-4ac))/2a",
                    "x = (-b ± √(b²+4ac))/2a",
                    "x = (b ± √(b²-4ac))/2a",
                    "x = (-b ± √(b²-4ac))/a"
                ],
                correctAnswer: 0
            },
            {
                id: 12,
                text: "What is the value of cos(60°)?",
                options: [
                    "1/2",
                    "√3/2",
                    "1",
                    "0"
                ],
                correctAnswer: 0
            },
            {
                id: 13,
                text: "What is 5! (5 factorial)?",
                options: [
                    "120",
                    "25",
                    "15",
                    "100"
                ],
                correctAnswer: 0
            },
            {
                id: 14,
                text: "What is the distance formula?",
                options: [
                    "d = √[(x₂-x₁)² + (y₂-y₁)²]",
                    "d = (x₂-x₁)² + (y₂-y₁)²",
                    "d = |x₂-x₁| + |y₂-y₁|",
                    "d = √[(x₂+x₁)² + (y₂+y₁)²]"
                ],
                correctAnswer: 0
            },
            {
                id: 15,
                text: "What is the mean of 2, 4, 6, 8, 10?",
                options: [
                    "6",
                    "5",
                    "7",
                    "8"
                ],
                correctAnswer: 0
            },
            {
                id: 16,
                text: "What is 3² × 3³?",
                options: [
                    "3⁵ = 243",
                    "3⁶ = 729",
                    "3⁴ = 81",
                    "3⁷ = 2187"
                ],
                correctAnswer: 0
            },
            {
                id: 17,
                text: "What is the perimeter of a square with side 4?",
                options: [
                    "16",
                    "8",
                    "12",
                    "20"
                ],
                correctAnswer: 0
            },
            {
                id: 18,
                text: "What is the volume of a cube with side 3?",
                options: [
                    "27",
                    "9",
                    "18",
                    "12"
                ],
                correctAnswer: 0
            },
            {
                id: 19,
                text: "What is √64?",
                options: [
                    "8",
                    "6",
                    "10",
                    "7"
                ],
                correctAnswer: 0
            },
            {
                id: 20,
                text: "What is 15% of 200?",
                options: [
                    "30",
                    "25",
                    "35",
                    "40"
                ],
                correctAnswer: 0
            }
        ]
    };
}

function startTest() {
    // Hide instructions
    document.getElementById('testInstructions').style.display = 'none';
    
    // Show test interface
    document.getElementById('testSection').style.display = 'block';
    
    // Initialize test
    testStartTime = new Date();
    timeRemaining = testData.duration;
    currentQuestionIndex = 0;
    userAnswers = {};
    
    // Generate question navigation
    generateQuestionNavigation();
    
    // Load first question
    loadQuestion(0);
    
    // Start timer
    startTimer();
}

function generateQuestionNavigation() {
    const questionGrid = document.getElementById('questionGrid');
    questionGrid.innerHTML = '';
    
    for (let i = 0; i < testData.questions.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'question-nav-btn';
        btn.textContent = i + 1;
        btn.onclick = () => loadQuestion(i);
        btn.id = `nav-btn-${i}`;
        questionGrid.appendChild(btn);
    }
    
    // Mark first question as current
    updateQuestionNavigation();
}

function updateQuestionNavigation() {
    const buttons = document.querySelectorAll('.question-nav-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('current', 'answered');
        
        if (index === currentQuestionIndex) {
            btn.classList.add('current');
        } else if (userAnswers[index] !== undefined) {
            btn.classList.add('answered');
        }
    });
}

function loadQuestion(questionIndex) {
    currentQuestionIndex = questionIndex;
    const question = testData.questions[questionIndex];
    
    // Update question display
    document.getElementById('currentQuestionNum').textContent = questionIndex + 1;
    document.getElementById('questionText').textContent = question.text;
    
    // Generate options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(index);
        
        const isSelected = userAnswers[questionIndex] === index;
        if (isSelected) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <input type="radio" name="question-${questionIndex}" value="${index}" ${isSelected ? 'checked' : ''}>
            <span class="option-text">${String.fromCharCode(65 + index)}. ${option}</span>
        `;
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = questionIndex === 0;
    nextBtn.textContent = questionIndex === testData.questions.length - 1 ? 'Finish' : 'Next';
    
    // Update question navigation
    updateQuestionNavigation();
}

function selectOption(optionIndex) {
    // Save answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = index === optionIndex;
    });
    
    // Update navigation
    updateQuestionNavigation();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < testData.questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        // Last question, show submit confirmation
        submitTest();
    }
}

function startTimer() {
    testTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            // Time's up, auto-submit
            clearInterval(testTimer);
            autoSubmitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (timerDisplay) {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Change color when time is running low
        if (timeRemaining <= 300) { // Last 5 minutes
            timerDisplay.style.background = '#ef4444';
        } else if (timeRemaining <= 600) { // Last 10 minutes
            timerDisplay.style.background = '#f59e0b';
        }
    }
}

function submitTest() {
    // Update submit modal with current stats
    const answeredCount = Object.keys(userAnswers).length;
    const remainingTime = `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;
    
    document.getElementById('answeredCount').textContent = answeredCount;
    document.getElementById('remainingTime').textContent = remainingTime;
    
    // Show submit modal
    document.getElementById('submitModal').style.display = 'block';
}

function closeSubmitModal() {
    document.getElementById('submitModal').style.display = 'none';
}

function confirmSubmit() {
    // Stop timer
    if (testTimer) {
        clearInterval(testTimer);
    }
    
    // Calculate results
    const results = calculateResults();
    
    // Save test result
    saveTestResult(results);
    
    // Show completion message and redirect
    showNotification('Test submitted successfully! Redirecting to results...', 'success');
    
    setTimeout(() => {
        window.location.href = 'result.html';
    }, 2000);
}

function autoSubmitTest() {
    showNotification('Time\'s up! Test submitted automatically.', 'warning');
    
    // Calculate results
    const results = calculateResults();
    
    // Save test result
    saveTestResult(results);
    
    setTimeout(() => {
        window.location.href = 'result.html';
    }, 2000);
}

function calculateResults() {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unanswered = 0;
    
    testData.questions.forEach((question, index) => {
        if (userAnswers[index] !== undefined) {
            if (userAnswers[index] === question.correctAnswer) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        } else {
            unanswered++;
        }
    });
    
    const totalQuestions = testData.questions.length;
    const attempted = correctAnswers + wrongAnswers;
    const score = (correctAnswers / totalQuestions) * 100;
    const accuracy = attempted > 0 ? (correctAnswers / attempted) * 100 : 0;
    
    return {
        testId: 'math-quiz-current',
        testName: testData.title,
        subject: 'Mathematics',
        dateTaken: new Date().toLocaleDateString(),
        totalQuestions: totalQuestions,
        attempted: attempted,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        unanswered: unanswered,
        score: Math.round(score),
        accuracy: Math.round(accuracy * 10) / 10,
        timeTaken: Math.floor((testData.duration - timeRemaining) / 60),
        userAnswers: userAnswers,
        questions: testData.questions
    };
}

function saveTestResult(results) {
    // Get existing results
    let testResults = JSON.parse(localStorage.getItem('testResults')) || [];
    
    // Add new result
    testResults.unshift(results); // Add to beginning
    
    // Save back to localStorage
    localStorage.setItem('testResults', JSON.stringify(testResults));
}

// Utility function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✗'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);