const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses with optional filters
router.get('/', (req, res) => {
  try {
    const { category, level, search } = req.query;
    const courses = Course.getAll({ category, level, search });
    
    res.json({
      courses,
      total: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get single course by ID
router.get('/:id', (req, res) => {
  try {
    const course = Course.getById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Get all categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = Course.getCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all levels
router.get('/meta/levels', (req, res) => {
  try {
    const levels = Course.getLevels();
    res.json({ levels });
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'Failed to fetch levels' });
  }
});

module.exports = router;
