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
    const { title } = req.body;
    const pdfPath = req.file.path;
    const newCourse = new Course({ title, pdfPath });
    await newCourse.save();
    res.json({ message: 'Course uploaded successfully' });
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
