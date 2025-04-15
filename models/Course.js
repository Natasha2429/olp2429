// backend/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    pdfPath: String,
});

module.exports = mongoose.model('Course', courseSchema);
