// Course detail page functionality
// Component-based structure ready for React conversion

let currentCourse = null;

// Load course details
async function loadCourseDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');
  
  if (!courseId) {
    window.location.href = 'courses.html';
    return;
  }
  
  const loadingState = document.getElementById('loadingState');
  const courseContent = document.getElementById('courseContent');
  
  try {
    // Load course data
    const course = await api.getCourse(courseId);
    currentCourse = course;
    
    // Populate course details
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLevel').textContent = course.level;
    document.getElementById('courseRating').textContent = `${course.rating} (${course.studentsEnrolled} students)`;
    document.getElementById('courseThumbnail').src = course.thumbnail;
    document.getElementById('courseThumbnail').alt = course.title;
    document.getElementById('courseLongDescription').textContent = course.longDescription;
    document.getElementById('coursePrice').textContent = course.price;
    document.getElementById('courseStudents').textContent = course.studentsEnrolled.toLocaleString();
    
    // Set page title
    document.title = `${course.title} - SkillUp`;
    
    // Populate lessons
    const lessonsContainer = document.getElementById('courseLessons');
    lessonsContainer.innerHTML = `
      <ul style="list-style: none; padding: 0;">
        ${course.lessons.map((lesson, index) => `
          <li style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between;">
            <span>
              <span style="color: var(--primary-color); font-weight: 600; margin-right: 0.5rem;">
                ${index + 1}.
              </span>
              ${lesson.title}
            </span>
            <span style="color: var(--text-secondary);">${lesson.duration}</span>
          </li>
        `).join('')}
      </ul>
    `;
    
    // Populate tags
    const tagsContainer = document.getElementById('courseTags');
    tagsContainer.innerHTML = course.tags.map(tag => `
      <span class="tag">${tag}</span>
    `).join('');
    
    // Check if user is enrolled
    if (auth.isAuthenticated()) {
      try {
        const enrollmentData = await api.getEnrolledCourses();
        const isEnrolled = enrollmentData.courses.some(c => c.id === courseId);
        
        if (isEnrolled) {
          document.getElementById('enrollmentSection').classList.add('hidden');
          document.getElementById('enrolledSection').classList.remove('hidden');
        } else {
          document.getElementById('enrollmentSection').classList.remove('hidden');
          document.getElementById('enrolledSection').classList.add('hidden');
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    }
    
    // Show content, hide loading
    loadingState.classList.add('hidden');
    courseContent.classList.remove('hidden');
  } catch (error) {
    console.error('Error loading course:', error);
    loadingState.innerHTML = `
      <div class="container text-center">
        <p style="color: var(--error);">Failed to load course details. Please try again later.</p>
        <a href="courses.html" class="btn btn-primary">Back to Courses</a>
      </div>
    `;
  }
}

// Handle enrollment
async function handleEnroll() {
  if (!auth.isAuthenticated()) {
    window.location.href = 'login.html?redirect=course-detail.html?id=' + currentCourse.id;
    return;
  }
  
  const enrollBtn = document.getElementById('enrollBtn');
  const originalText = enrollBtn.textContent;
  enrollBtn.disabled = true;
  enrollBtn.textContent = 'Enrolling...';
  
  try {
    await api.enrollInCourse(currentCourse.id);
    
    // Show success and switch to enrolled state
    document.getElementById('enrollmentSection').classList.add('hidden');
    document.getElementById('enrolledSection').classList.remove('hidden');
    
    // Show temporary success message
    const enrolledSection = document.getElementById('enrolledSection');
    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success';
    successMsg.textContent = '🎉 Successfully enrolled! You can now access this course.';
    enrolledSection.insertBefore(successMsg, enrolledSection.firstChild);
    
    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  } catch (error) {
    console.error('Error enrolling:', error);
    alert(error.message || 'Failed to enroll. Please try again.');
    enrollBtn.disabled = false;
    enrollBtn.textContent = originalText;
  }
}

// Initialize course detail page
document.addEventListener('DOMContentLoaded', () => {
  loadCourseDetails();
  
  // Set up event listeners
  document.getElementById('enrollBtn').addEventListener('click', handleEnroll);
  document.getElementById('goToDashboardBtn').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });
});
