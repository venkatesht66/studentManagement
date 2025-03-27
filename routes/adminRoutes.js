const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.post('/register',adminController.createAdmin);
router.post('/login',adminController.adminLogin);

module.exports = router;