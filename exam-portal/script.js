// Global variables
let currentUser = null;
let isLoggedIn = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize hamburger menu
    initializeHamburgerMenu();
    
    // Initialize agree terms checkbox for test page
    initializeAgreeTerms();
}

function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        isLoggedIn = true;
        showDashboard();
    }
}

function showDashboard() {
    const heroSection = document.getElementById('heroSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const featuresSection = document.getElementById('featuresSection');
    
    if (heroSection && dashboardSection && featuresSection) {
        heroSection.style.display = 'none';
        featuresSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        
        // Update user name in dashboard
        const userName = document.getElementById('userName');
        if (userName && currentUser) {
            userName.textContent = currentUser.name || currentUser.email || 'User';
        }
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    isLoggedIn = false;
    
    const heroSection = document.getElementById('heroSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const featuresSection = document.getElementById('featuresSection');
    
    if (heroSection && dashboardSection && featuresSection) {
        heroSection.style.display = 'block';
        featuresSection.style.display = 'block';
        dashboardSection.style.display = 'none';
    }
}

function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

function initializeAgreeTerms() {
    const agreeTerms = document.getElementById('agreeTerms');
    const startTestBtn = document.getElementById('startTestBtn');
    
    if (agreeTerms && startTestBtn) {
        agreeTerms.addEventListener('change', function() {
            startTestBtn.disabled = !this.checked;
        });
    }
}

// Utility functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);