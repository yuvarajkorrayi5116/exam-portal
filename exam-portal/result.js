// Result page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeResultPage();
});

function initializeResultPage() {
    // Load and display test results
    loadTestResults();
    
    // Update summary statistics
    updateSummaryStats();
}

function loadTestResults() {
    // For demo purposes, we'll add some sample results if none exist
    let testResults = JSON.parse(localStorage.getItem('testResults')) || [];
    
    if (testResults.length === 0) {
        // Add sample data for demonstration
        testResults = getSampleResults();
        localStorage.setItem('testResults', JSON.stringify(testResults));
    }
    
    // Update the results table with actual data
    updateResultsTable(testResults);
}

function getSampleResults() {
    return [
        {
            testId: 'math-quiz-1',
            testName: 'Mathematics Quiz',
            subject: 'Mathematics',
            dateTaken: 'Dec 20, 2024',
            totalQuestions: 20,
            attempted: 18,
            correctAnswers: 17,
            wrongAnswers: 1,
            unanswered: 2,
            score: 85,
            accuracy: 94.4,
            timeTaken: 45,
            grade: 'A'
        },
        {
            testId: 'physics-test-1',
            testName: 'Physics Test',
            subject: 'Physics',
            dateTaken: 'Dec 18, 2024',
            totalQuestions: 25,
            attempted: 25,
            correctAnswers: 23,
            wrongAnswers: 2,
            unanswered: 0,
            score: 92,
            accuracy: 92.0,
            timeTaken: 55,
            grade: 'A+'
        },
        {
            testId: 'cs-quiz-1',
            testName: 'Computer Science Quiz',
            subject: 'Computer Science',
            dateTaken: 'Dec 15, 2024',
            totalQuestions: 30,
            attempted: 28,
            correctAnswers: 22,
            wrongAnswers: 6,
            unanswered: 2,
            score: 78,
            accuracy: 78.6,
            timeTaken: 48,
            grade: 'B+'
        },
        {
            testId: 'english-test-1',
            testName: 'English Test',
            subject: 'English',
            dateTaken: 'Dec 12, 2024',
            totalQuestions: 20,
            attempted: 20,
            correctAnswers: 18,
            wrongAnswers: 2,
            unanswered: 0,
            score: 88,
            accuracy: 90.0,
            timeTaken: 42,
            grade: 'A'
        },
        {
            testId: 'chemistry-quiz-1',
            testName: 'Chemistry Quiz',
            subject: 'Chemistry',
            dateTaken: 'Dec 10, 2024',
            totalQuestions: 25,
            attempted: 24,
            correctAnswers: 16,
            wrongAnswers: 8,
            unanswered: 1,
            score: 65,
            accuracy: 66.7,
            timeTaken: 50,
            grade: 'B'
        },
        {
            testId: 'biology-test-1',
            testName: 'Biology Test',
            subject: 'Biology',
            dateTaken: 'Dec 8, 2024',
            totalQuestions: 20,
            attempted: 18,
            correctAnswers: 7,
            wrongAnswers: 11,
            unanswered: 2,
            score: 35,
            accuracy: 38.9,
            timeTaken: 38,
            grade: 'F'
        },
        {
            testId: 'history-quiz-1',
            testName: 'History Quiz',
            subject: 'History',
            dateTaken: 'Dec 5, 2024',
            totalQuestions: 15,
            attempted: 15,
            correctAnswers: 11,
            wrongAnswers: 4,
            unanswered: 0,
            score: 72,
            accuracy: 73.3,
            timeTaken: 35,
            grade: 'B'
        },
        {
            testId: 'geography-test-1',
            testName: 'Geography Test',
            subject: 'Geography',
            dateTaken: 'Dec 3, 2024',
            totalQuestions: 20,
            attempted: 19,
            correctAnswers: 16,
            wrongAnswers: 3,
            unanswered: 1,
            score: 80,
            accuracy: 84.2,
            timeTaken: 45,
            grade: 'B+'
        }
    ];
}

function updateResultsTable(results) {
    const tableBody = document.querySelector('.results-table tbody');
    if (!tableBody) return;
    
    // Clear existing rows except the sample ones if we want to replace them
    // For now, we'll keep the existing structure and just update if needed
    
    // The table already has sample data in HTML, so we'll leave it as is
    // In a real application, you would dynamically generate these rows
}

function updateSummaryStats() {
    const testResults = JSON.parse(localStorage.getItem('testResults')) || getSampleResults();
    
    if (testResults.length === 0) return;
    
    // Calculate statistics
    const totalTests = testResults.length;
    const passedTests = testResults.filter(result => result.score >= 40).length;
    const averageScore = Math.round(testResults.reduce((sum, result) => sum + result.score, 0) / totalTests);
    const bestScore = Math.max(...testResults.map(result => result.score));
    
    // Update summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    if (summaryCards.length >= 4) {
        summaryCards[0].querySelector('h3').textContent = totalTests;
        summaryCards[1].querySelector('h3').textContent = averageScore + '%';
        summaryCards[2].querySelector('h3').textContent = passedTests;
        summaryCards[3].querySelector('h3').textContent = bestScore + '%';
    }
}

function viewDetailedResult(testId) {
    const modal = document.getElementById('resultModal');
    
    // Get test result data
    const testResults = JSON.parse(localStorage.getItem('testResults')) || getSampleResults();
    const result = testResults.find(r => r.testId === testId) || getDetailedSampleResult(testId);
    
    // Populate modal with result data
    populateResultModal(result);
    
    // Show modal
    modal.style.display = 'block';
    
    // Add click outside to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeResultModal();
        }
    };
}

function getDetailedSampleResult(testId) {
    const sampleResults = {
        'math-quiz-1': {
            testId: 'math-quiz-1',
            testName: 'Mathematics Quiz',
            subject: 'Mathematics',
            dateTaken: 'Dec 20, 2024',
            duration: 45,
            totalQuestions: 20,
            attempted: 18,
            correctAnswers: 17,
            wrongAnswers: 1,
            unanswered: 2,
            score: 85,
            accuracy: 94.4
        },
        'physics-test-1': {
            testId: 'physics-test-1',
            testName: 'Physics Test',
            subject: 'Physics',
            dateTaken: 'Dec 18, 2024',
            duration: 55,
            totalQuestions: 25,
            attempted: 25,
            correctAnswers: 23,
            wrongAnswers: 2,
            unanswered: 0,
            score: 92,
            accuracy: 92.0
        },
        'cs-quiz-1': {
            testId: 'cs-quiz-1',
            testName: 'Computer Science Quiz',
            subject: 'Computer Science',
            dateTaken: 'Dec 15, 2024',
            duration: 48,
            totalQuestions: 30,
            attempted: 28,
            correctAnswers: 22,
            wrongAnswers: 6,
            unanswered: 2,
            score: 78,
            accuracy: 78.6
        }
    };
    
    return sampleResults[testId] || sampleResults['math-quiz-1'];
}

function populateResultModal(result) {
    // Update modal title
    document.getElementById('resultModalTitle').textContent = `${result.testName} - Detailed Results`;
    
    // Update overview
    document.getElementById('detailTestName').textContent = result.testName;
    document.getElementById('detailDate').textContent = result.dateTaken;
    document.getElementById('detailDuration').textContent = `${result.duration || 45} minutes`;
    document.getElementById('detailTotalQuestions').textContent = result.totalQuestions;
    
    // Update score
    document.getElementById('detailScore').textContent = result.score;
    document.getElementById('detailAttempted').textContent = `${result.attempted}/${result.totalQuestions}`;
    document.getElementById('detailCorrect').textContent = result.correctAnswers;
    document.getElementById('detailWrong').textContent = result.wrongAnswers;
    document.getElementById('detailUnanswered').textContent = result.unanswered;
    document.getElementById('detailAccuracy').textContent = result.accuracy + '%';
    
    // Update progress circle
    updateProgressCircle(result.score);
}

function updateProgressCircle(score) {
    const circle = document.querySelector('.score-circle');
    if (circle) {
        // Calculate stroke-dasharray for progress
        const circumference = 2 * Math.PI * 56; // radius of 56
        const offset = circumference - (score / 100) * circumference;
        
        // You could add SVG circle here for actual progress visualization
        // For now, we'll just update the border color based on score
        if (score >= 80) {
            circle.style.borderColor = '#10b981'; // Green
        } else if (score >= 60) {
            circle.style.borderColor = '#f59e0b'; // Yellow
        } else {
            circle.style.borderColor = '#ef4444'; // Red
        }
    }
}

function closeResultModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'none';
}

function printResult() {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get the modal content
    const modalContent = document.querySelector('.result-detail-container').innerHTML;
    const testName = document.getElementById('detailTestName').textContent;
    
    // Create print document
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${testName} - Test Result</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .result-overview { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
                .overview-item { padding: 0.5rem; }
                .overview-item label { font-weight: bold; color: #666; }
                .score-summary { display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; }
                .score-circle { width: 100px; height: 100px; border: 6px solid #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
                .score-details { flex: 1; }
                .score-stat { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee; }
                .analysis-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 0.5rem; }
                .analysis-item { padding: 0.5rem; text-align: center; border-radius: 4px; font-size: 0.8rem; }
                .analysis-item.correct { background: #d1fae5; }
                .analysis-item.wrong { background: #fee2e2; }
                .analysis-item.unanswered { background: #fef3c7; }
                @media print {
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            <h1>${testName} - Test Result</h1>
            ${modalContent}
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}