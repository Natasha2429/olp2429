// backend/routes/courses.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');
const router = express.Router();

// Setup file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Upload new course
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfPath = `/uploads/${req.file.filename}`;
    const newCourse = new Course({ title, pdfPath });
    await newCourse.save();

    res.json({ message: 'Course uploaded successfully' });
  } catch (error) {
    console.error("UPLOAD ERROR:", error); // <-- Add this line
    res.status(500).json({ error: "Server error during upload" });
  }
});


// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Delete a course
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Course deleted' });
});

module.exports = router;
