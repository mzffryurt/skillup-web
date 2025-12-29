const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const { authenticateToken } = require('../middleware/auth');

// Enroll in a course
router.post('/', authenticateToken, (req, res) => {
  try {
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    const course = Course.getById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already enrolled
    if (user.enrolledCourses.some(ec => ec.courseId === courseId)) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Add enrollment
    const enrollment = {
      courseId,
      enrolledAt: new Date(),
      progress: 0
    };
    
    user.enrolledCourses.push(enrollment);
    
    res.status(201).json({
      message: 'Successfully enrolled',
      enrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

// Get user's enrolled courses
router.get('/my-courses', authenticateToken, (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const enrolledCourses = user.enrolledCourses.map(enrollment => {
      const course = Course.getById(enrollment.courseId);
      return {
        ...course,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress
      };
    }).filter(course => course !== undefined);

    res.json({ courses: enrolledCourses });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Unenroll from a course
router.delete('/:courseId', authenticateToken, (req, res) => {
  try {
    const { courseId } = req.params;
    
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const enrollmentIndex = user.enrolledCourses.findIndex(
      ec => ec.courseId === courseId
    );

    if (enrollmentIndex === -1) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    user.enrolledCourses.splice(enrollmentIndex, 1);
    
    res.json({ message: 'Successfully unenrolled' });
  } catch (error) {
    console.error('Unenrollment error:', error);
    res.status(500).json({ error: 'Failed to unenroll' });
  }
});

module.exports = router;
