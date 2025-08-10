// Registration page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeRegistrationPage();
});

function initializeRegistrationPage() {
    // Any initialization code for registration page
}

function showRegistrationForm(testId) {
    const modal = document.getElementById('registrationModal');
    const testInfo = document.getElementById('testInfo');
    
    // Get test information based on testId
    const testData = getTestData(testId);
    
    // Populate test information
    testInfo.innerHTML = `
        <h4>${testData.name}</h4>
        <div class="test-details">
            <p><strong>Subject:</strong> ${testData.subject}</p>
            <p><strong>Date & Time:</strong> ${testData.datetime}</p>
            <p><strong>Duration:</strong> ${testData.duration}</p>
            <p><strong>Max Marks:</strong> ${testData.maxMarks}</p>
        </div>
    `;
    
    // Store test ID for form submission
    document.getElementById('registrationForm').dataset.testId = testId;
    
    // Show modal
    modal.style.display = 'block';
    
    // Add click outside to close
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeRegistrationForm();
        }
    };
}

function closeRegistrationForm() {
    const modal = document.getElementById('registrationModal');
    modal.style.display = 'none';
    
    // Reset form
    document.getElementById('registrationForm').reset();
}

function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const testId = event.target.dataset.testId;
    
    // Get form data
    const registrationData = {
        testId: testId,
        name: formData.get('name'),
        studentId: formData.get('studentId'),
        email: formData.get('email'),
        branch: formData.get('branch'),
        phone: formData.get('phone'),
        registrationDate: new Date().toISOString()
    };
    
    // Validate required fields
    if (!registrationData.name || !registrationData.studentId || 
        !registrationData.email || !registrationData.branch) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Save registration to localStorage
    saveRegistration(registrationData);
    
    // Close modal
    closeRegistrationForm();
    
    // Show success popup
    showSuccessPopup(registrationData);
}

function saveRegistration(data) {
    // Get existing registrations
    let registrations = JSON.parse(localStorage.getItem('testRegistrations')) || [];
    
    // Add new registration
    registrations.push(data);
    
    // Save back to localStorage
    localStorage.setItem('testRegistrations', JSON.stringify(registrations));
}

function showSuccessPopup(data) {
    const popup = document.getElementById('successPopup');
    const message = document.getElementById('successMessage');
    const testData = getTestData(data.testId);
    
    message.innerHTML = `
        You have been successfully registered for <strong>${testData.name}</strong>.<br>
        Registration details have been sent to <strong>${data.email}</strong>.
    `;
    
    popup.style.display = 'block';
    
    // Add click outside to close
    popup.onclick = function(event) {
        if (event.target === popup) {
            closeSuccessPopup();
        }
    };
}

function closeSuccessPopup() {
    const popup = document.getElementById('successPopup');
    popup.style.display = 'none';
}

function getTestData(testId) {
    const tests = {
        'math-mid-term': {
            name: 'Mid-Term Mathematics',
            subject: 'Mathematics',
            datetime: 'Dec 25, 2024 - 10:00 AM',
            duration: '2 hours',
            maxMarks: '100'
        },
        'physics-semester': {
            name: 'Physics Semester Exam',
            subject: 'Physics',
            datetime: 'Dec 28, 2024 - 2:00 PM',
            duration: '3 hours',
            maxMarks: '150'
        },
        'cs-quiz': {
            name: 'Computer Science Quiz',
            subject: 'Computer Science',
            datetime: 'Jan 2, 2025 - 11:00 AM',
            duration: '1 hour',
            maxMarks: '50'
        },
        'english-lit': {
            name: 'English Literature Test',
            subject: 'English',
            datetime: 'Jan 5, 2025 - 9:00 AM',
            duration: '2.5 hours',
            maxMarks: '120'
        }
    };
    
    return tests[testId] || tests['math-mid-term'];
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
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