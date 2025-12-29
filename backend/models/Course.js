// In-memory course storage with sample data
const courses = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    instructor: 'Sarah Johnson',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    longDescription: 'This comprehensive course covers everything you need to know to start your web development journey. From HTML structure to CSS styling and JavaScript interactivity, you\'ll build real projects and gain practical skills.',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8 weeks',
    price: 49.99,
    rating: 4.8,
    studentsEnrolled: 1234,
    thumbnail: 'https://via.placeholder.com/400x225/4F46E5/ffffff?text=Web+Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
    lessons: [
      { id: '1-1', title: 'Introduction to HTML', duration: '45 min' },
      { id: '1-2', title: 'CSS Basics', duration: '60 min' },
      { id: '1-3', title: 'JavaScript Fundamentals', duration: '90 min' }
    ]
  },
  {
    id: '2',
    title: 'React for Beginners',
    instructor: 'Mike Chen',
    description: 'Master React.js and build dynamic, interactive web applications.',
    longDescription: 'Dive deep into React and learn how to create modern single-page applications. You\'ll understand components, hooks, state management, and best practices for building scalable React applications.',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '6 weeks',
    price: 59.99,
    rating: 4.9,
    studentsEnrolled: 892,
    thumbnail: 'https://via.placeholder.com/400x225/06B6D4/ffffff?text=React+Course',
    tags: ['React', 'JavaScript', 'Frontend', 'Components'],
    lessons: [
      { id: '2-1', title: 'React Basics', duration: '50 min' },
      { id: '2-2', title: 'Components and Props', duration: '65 min' },
      { id: '2-3', title: 'State and Hooks', duration: '80 min' }
    ]
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    instructor: 'Alex Rivera',
    description: 'Build robust backend applications with Node.js and Express.',
    longDescription: 'Learn server-side JavaScript with Node.js. Create RESTful APIs, work with databases, implement authentication, and deploy production-ready backend applications.',
    category: 'Backend Development',
    level: 'Intermediate',
    duration: '10 weeks',
    price: 69.99,
    rating: 4.7,
    studentsEnrolled: 756,
    thumbnail: 'https://via.placeholder.com/400x225/10B981/ffffff?text=Node.js+Backend',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    lessons: [
      { id: '3-1', title: 'Node.js Fundamentals', duration: '55 min' },
      { id: '3-2', title: 'Express Framework', duration: '70 min' },
      { id: '3-3', title: 'Database Integration', duration: '85 min' }
    ]
  },
  {
    id: '4',
    title: 'Python for Data Science',
    instructor: 'Dr. Emily Watson',
    description: 'Analyze data and create visualizations using Python.',
    longDescription: 'Master Python programming for data science. Learn pandas, NumPy, matplotlib, and more. Work with real datasets and build data analysis projects.',
    category: 'Data Science',
    level: 'Beginner',
    duration: '12 weeks',
    price: 79.99,
    rating: 4.9,
    studentsEnrolled: 1567,
    thumbnail: 'https://via.placeholder.com/400x225/F59E0B/ffffff?text=Python+Data+Science',
    tags: ['Python', 'Data Science', 'Analytics', 'Pandas'],
    lessons: [
      { id: '4-1', title: 'Python Basics', duration: '60 min' },
      { id: '4-2', title: 'Data Structures', duration: '75 min' },
      { id: '4-3', title: 'Data Analysis with Pandas', duration: '90 min' }
    ]
  },
  {
    id: '5',
    title: 'UI/UX Design Masterclass',
    instructor: 'Jessica Martinez',
    description: 'Create beautiful, user-friendly interfaces with modern design principles.',
    longDescription: 'Learn the art and science of UI/UX design. Understand user research, wireframing, prototyping, and design systems. Master tools like Figma and create stunning interfaces.',
    category: 'Design',
    level: 'Beginner',
    duration: '7 weeks',
    price: 54.99,
    rating: 4.8,
    studentsEnrolled: 1089,
    thumbnail: 'https://via.placeholder.com/400x225/EC4899/ffffff?text=UI+UX+Design',
    tags: ['UI/UX', 'Design', 'Figma', 'Wireframing'],
    lessons: [
      { id: '5-1', title: 'Design Principles', duration: '40 min' },
      { id: '5-2', title: 'User Research', duration: '55 min' },
      { id: '5-3', title: 'Prototyping', duration: '70 min' }
    ]
  },
  {
    id: '6',
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Robert Kim',
    description: 'Introduction to machine learning algorithms and applications.',
    longDescription: 'Explore the exciting world of machine learning. Learn supervised and unsupervised learning, neural networks, and how to build ML models with Python and scikit-learn.',
    category: 'Data Science',
    level: 'Advanced',
    duration: '14 weeks',
    price: 89.99,
    rating: 4.9,
    studentsEnrolled: 645,
    thumbnail: 'https://via.placeholder.com/400x225/8B5CF6/ffffff?text=Machine+Learning',
    tags: ['Machine Learning', 'AI', 'Python', 'Neural Networks'],
    lessons: [
      { id: '6-1', title: 'ML Introduction', duration: '50 min' },
      { id: '6-2', title: 'Supervised Learning', duration: '80 min' },
      { id: '6-3', title: 'Neural Networks', duration: '95 min' }
    ]
  }
];

const courseModel = {
  getAll: (filters = {}) => {
    let filtered = [...courses];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(course => 
        course.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by level
    if (filters.level && filters.level !== 'all') {
      filtered = filtered.filter(course => 
        course.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    // Search in title, description, instructor
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  },

  getById: (id) => {
    return courses.find(course => course.id === id);
  },

  getCategories: () => {
    const categories = [...new Set(courses.map(course => course.category))];
    return categories;
  },

  getLevels: () => {
    return ['Beginner', 'Intermediate', 'Advanced'];
  }
};

module.exports = courseModel;
