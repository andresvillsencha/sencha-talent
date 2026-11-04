const express = require('express');
const testController = require('../controllers/test.controller');

const router = express.Router();

router.get('/', testController.getTest);
router.get('/resume/', testController.getResume);

module.exports = router;