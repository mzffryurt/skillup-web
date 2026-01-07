// Home page functionality
// Component-based structure ready for React conversion

// Helper function to create course card HTML
function createCourseCard(course) {
  return `
    <div class="card">
      <img src="${course.thumbnail}" alt="${course.title}" class="card-img">
      <div class="card-body">
        <span class="badge">${course.category}</span>
        <h3 class="card-title">${course.title}</h3>
        <p class="card-text">${course.description}</p>
        <div class="course-meta">
          <div class="course-meta-item">
            <span>👨‍🏫</span>
            <span>${course.instructor}</span>
          </div>
          <div class="course-meta-item">
            <div class="rating">
              <span>⭐</span>
              <span>${course.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">
            $${course.price}
          </span>
          <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm">
            View Course
          </a>
        </div>
      </div>
    </div>
  `;
}

// Load popular courses
async function loadPopularCourses() {
  const container = document.getElementById('popularCourses');
  
  try {
    const data = await api.getCourses();
    const courses = data.courses.slice(0, 3); // Get first 3 courses
    
    container.innerHTML = courses.map(course => createCourseCard(course)).join('');
  } catch (error) {
    console.error('Error loading courses:', error);
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <p style="color: var(--error);">Failed to load courses. Please try again later.</p>
      </div>
    `;
  }
}

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
  loadPopularCourses();
});
