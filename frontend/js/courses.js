// Courses page functionality
// Component-based structure ready for React conversion

// State management (can be easily converted to React state or Redux)
let currentFilters = {
  search: '',
  category: 'all',
  level: 'all'
};

// Helper function to create course card HTML
function createCourseCard(course) {
  return `
    <div class="card">
      <img src="${course.thumbnail}" alt="${course.title}" class="card-img">
      <div class="card-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="badge">${course.category}</span>
          <span class="badge badge-warning">${course.level}</span>
        </div>
        <h3 class="card-title">${course.title}</h3>
        <p class="card-text">${course.description}</p>
        <div class="course-meta">
          <div class="course-meta-item">
            <span>👨‍🏫</span>
            <span>${course.instructor}</span>
          </div>
          <div class="course-meta-item">
            <span>⏱️</span>
            <span>${course.duration}</span>
          </div>
          <div class="course-meta-item">
            <div class="rating">
              <span>⭐</span>
              <span>${course.rating}</span>
            </div>
          </div>
        </div>
        <div class="tags">
          ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">
            $${course.price}
          </span>
          <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm">
            View Details
          </a>
        </div>
      </div>
    </div>
  `;
}

// Load and display courses
async function loadCourses() {
  const container = document.getElementById('coursesGrid');
  const countElement = document.getElementById('coursesCount');
  const emptyState = document.getElementById('emptyState');
  
  container.innerHTML = '<div class="spinner"></div>';
  emptyState.classList.add('hidden');
  
  try {
    const data = await api.getCourses(currentFilters);
    const courses = data.courses;
    
    if (courses.length === 0) {
      container.innerHTML = '';
      emptyState.classList.remove('hidden');
      countElement.textContent = 'No courses found';
    } else {
      container.innerHTML = courses.map(course => createCourseCard(course)).join('');
      countElement.textContent = `Showing ${courses.length} course${courses.length !== 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Error loading courses:', error);
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <p style="color: var(--error);">Failed to load courses. Please try again later.</p>
      </div>
    `;
  }
}

// Update filters and reload courses
function updateFilters() {
  currentFilters.search = document.getElementById('searchInput').value;
  currentFilters.category = document.getElementById('categoryFilter').value;
  currentFilters.level = document.getElementById('levelFilter').value;
  loadCourses();
}

// Clear all filters
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = 'all';
  document.getElementById('levelFilter').value = 'all';
  currentFilters = { search: '', category: 'all', level: 'all' };
  loadCourses();
}

// Load categories for filter dropdown
async function loadCategories() {
  try {
    const data = await api.getCourses();
    const categories = [...new Set(data.courses.map(c => c.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

// Parse URL parameters and apply filters
function applyUrlFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('category')) {
    const category = urlParams.get('category');
    currentFilters.category = category;
    document.getElementById('categoryFilter').value = category;
  }
  
  if (urlParams.has('level')) {
    const level = urlParams.get('level');
    currentFilters.level = level;
    document.getElementById('levelFilter').value = level;
  }
  
  if (urlParams.has('search')) {
    const search = urlParams.get('search');
    currentFilters.search = search;
    document.getElementById('searchInput').value = search;
  }
}

// Initialize courses page
document.addEventListener('DOMContentLoaded', () => {
  // Load categories first
  loadCategories();
  
  // Apply URL filters if present
  applyUrlFilters();
  
  // Load courses
  loadCourses();
  
  // Set up event listeners
  document.getElementById('searchBtn').addEventListener('click', updateFilters);
  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateFilters();
    }
  });
  
  document.getElementById('categoryFilter').addEventListener('change', updateFilters);
  document.getElementById('levelFilter').addEventListener('change', updateFilters);
  document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);
  document.getElementById('emptyStateClearBtn').addEventListener('click', clearFilters);
});
