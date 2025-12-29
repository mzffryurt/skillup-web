// Authentication helper functions
// Structure ready for React expansion - can be converted to React Context or custom hooks

const auth = {
  // Check if user is logged in
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Require authentication - redirect to login if not authenticated
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // Update navigation based on auth state
  updateNavigation() {
    const navLogin = document.getElementById('navLogin');
    const navLogout = document.getElementById('navLogout');
    const navDashboard = document.getElementById('navDashboard');

    if (this.isAuthenticated()) {
      // User is logged in
      if (navLogin) navLogin.classList.add('hidden');
      if (navLogout) {
        navLogout.classList.remove('hidden');
        navLogout.addEventListener('click', (e) => {
          e.preventDefault();
          api.logout();
        });
      }
      if (navDashboard) {
        navDashboard.classList.remove('hidden');
        navDashboard.href = 'dashboard.html';
      }
    } else {
      // User is not logged in
      if (navLogin) {
        navLogin.classList.remove('hidden');
        navLogin.href = 'login.html';
      }
      if (navLogout) navLogout.classList.add('hidden');
      if (navDashboard) navDashboard.classList.add('hidden');
    }
  },

  // Initialize mobile menu
  initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (mobileMenuToggle && navbarMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
      });

      // Close menu when clicking a link
      const menuLinks = navbarMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          navbarMenu.classList.remove('active');
        });
      });
    }
  },
};

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', () => {
  auth.updateNavigation();
  auth.initMobileMenu();
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.auth = auth;
}
