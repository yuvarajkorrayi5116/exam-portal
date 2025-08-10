// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

function initializeLoginPage() {
    // Check URL parameters for login type
    const urlParams = new URLSearchParams(window.location.search);
    const loginType = urlParams.get('type');
    
    if (loginType === 'student') {
        showLoginForm('student');
    } else if (loginType === 'admin') {
        showLoginForm('admin');
    }
}

function showLoginTypeSelection() {
    document.getElementById('loginTypeSelection').style.display = 'grid';
    document.getElementById('studentLoginForm').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'none';
}

function showLoginForm(type) {
    document.getElementById('loginTypeSelection').style.display = 'none';
    
    if (type === 'student') {
        document.getElementById('studentLoginForm').style.display = 'block';
        document.getElementById('adminLoginForm').style.display = 'none';
    } else if (type === 'admin') {
        document.getElementById('studentLoginForm').style.display = 'none';
        document.getElementById('adminLoginForm').style.display = 'block';
    }
}

function handleStudentLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const studentId = formData.get('studentId');
    const password = formData.get('password');
    
    // Simple validation - in real app, this would be server-side
    if (studentId && password) {
        // Simulate login success
        const userData = {
            type: 'student',
            id: studentId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            branch: 'CSE'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation - in real app, this would be server-side
    if (email && password) {
        // Simulate login success
        const userData = {
            type: 'admin',
            email: email,
            name: 'Admin User',
            id: 'admin001'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showNotification('Admin login successful! Redirecting...', 'success');
        
        // Redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Utility functions (same as in script.js)
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