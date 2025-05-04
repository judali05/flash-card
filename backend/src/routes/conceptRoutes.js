const express = require('express');
const router = express.Router();
const controller = require('../controllers/conceptController');

router.get('/', controller.getConcepts);
router.post('/', controller.addConcept);

module.exports = router;
