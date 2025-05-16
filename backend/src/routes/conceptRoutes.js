const express = require('express');
const router = express.Router();
const controller = require('../controllers/conceptController');

router.get('/api/words', controller.getWords);
router.put('/api/words/:id/progress', controller.updateProgress);
router.post('/', controller.addConcept);

module.exports = router;
