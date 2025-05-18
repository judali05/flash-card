const express = require('express');
const router = express.Router();
const controller = require('../controllers/conceptController');

router.get('/words', controller.takeWords);
router.post('/word', controller.addWord);
router.get('/categories', controller.takeCategories);
router.post('/categorie', controller.addCategorie);
router.put('/words/:id/progress', controller.updateProgress);

module.exports = router;
