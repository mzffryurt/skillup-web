// Dashboard page functionality
// Component-based structure ready for React conversion

// Check authentication on page load
if (!auth.requireAuth()) {
  // Will redirect to login if not authenticated
}

// Helper function to create enrolled course card
function createEnrolledCourseCard(course) {
  const enrolledDate = new Date(course.enrolledAt).toLocaleDateString();
  const progress = course.progress || 0;
  
  return `
    <div class="card">
      <img src="${course.thumbnail}" alt="${course.title}" class="card-img">
      <div class="card-body">
        <span class="badge">${course.category}</span>
        <h3 class="card-title">${course.title}</h3>
        <p class="card-text">${course.description}</p>
        
        <div style="margin: 1rem 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem;">
            <span style="color: var(--text-secondary);">Progress</span>
            <span style="font-weight: 600; color: var(--primary-color);">${progress}%</span>
          </div>
          <div style="width: 100%; height: 8px; background-color: var(--bg-tertiary); border-radius: 4px; overflow: hidden;">
            <div style="width: ${progress}%; height: 100%; background-color: var(--primary-color); transition: width 0.3s ease;"></div>
          </div>
        </div>
        
        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Enrolled on ${enrolledDate}
        </div>
      </div>
      <div class="card-footer">
        <div style="display: flex; gap: 0.5rem;">
          <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm" style="flex: 1;">
            Continue Learning
          </a>
          <button class="btn btn-outline btn-sm" onclick="unenrollFromCourse('${course.id}')" style="flex: 0;">
            Unenroll
          </button>
        </div>
      </div>
    </div>
  `;
}

// Load dashboard data
async function loadDashboard() {
  const loadingState = document.getElementById('loadingState');
  const dashboardContent = document.getElementById('dashboardContent');
  
  try {
    // Get current user
    const user = auth.getCurrentUser();
    if (user) {
      document.getElementById('userName').textContent = user.firstName;
    }
    
    // Get enrolled courses
    const data = await api.getEnrolledCourses();
    const courses = data.courses;
    
    // Update stats
    document.getElementById('enrolledCount').textContent = courses.length;
    
    const completed = courses.filter(c => c.progress === 100).length;
    document.getElementById('completedCount').textContent = completed;
    
    const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length;
    document.getElementById('inProgressCount').textContent = inProgress;
    
    // Calculate total hours (estimate based on duration)
    const totalHours = courses.reduce((sum, course) => {
      const match = course.duration.match(/(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
    document.getElementById('hoursLearned').textContent = totalHours;
    
    // Display enrolled courses
    const coursesGrid = document.getElementById('enrolledCoursesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (courses.length === 0) {
      coursesGrid.classList.add('hidden');
      emptyState.classList.remove('hidden');
    } else {
      coursesGrid.innerHTML = courses.map(course => createEnrolledCourseCard(course)).join('');
      coursesGrid.classList.remove('hidden');
      emptyState.classList.add('hidden');
    }
    
    // Show content, hide loading
    loadingState.classList.add('hidden');
    dashboardContent.classList.remove('hidden');
  } catch (error) {
    console.error('Error loading dashboard:', error);
    loadingState.innerHTML = `
      <div class="container text-center">
        <p style="color: var(--error);">Failed to load dashboard. Please try again later.</p>
        <button class="btn btn-primary" onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }
}

// Unenroll from a course
async function unenrollFromCourse(courseId) {
  if (!confirm('Are you sure you want to unenroll from this course?')) {
    return;
  }
  
  try {
    await api.unenrollFromCourse(courseId);
    
    // Reload dashboard
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('dashboardContent').classList.add('hidden');
    loadDashboard();
  } catch (error) {
    console.error('Error unenrolling:', error);
    alert(error.message || 'Failed to unenroll. Please try again.');
  }
}

// Make unenrollFromCourse available globally
window.unenrollFromCourse = unenrollFromCourse;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
});
