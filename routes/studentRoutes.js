const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addstudent',authMiddleware,studentController.createStudent);
router.get('/allstudents',authMiddleware,studentController.getStudents);
router.get('/student/:phone',authMiddleware,studentController.singleStudent);
router.put('/update/:phone',authMiddleware,studentController.updateStudent);
router.delete('/delete/:phone',authMiddleware,studentController.deleteStudent);

module.exports = router;