const model = require('../models/conceptModel');

async function getWords(req, res) {
  const { status, category_id, limit } = req.query;

  try {
    const data = await model.getAllWords({status, category_id, limit});
    res.json(data);
  } catch (err) {
    console.error('Error in obtaining filtered words:', err);
    res.status(500).json({ error: 'Error fetching concepts' });
  }
}

async function updateProgress(req, res) {
    const wordId = req.params.id;
  const { correct } = req.body;

  try {
    if (model.putProgress(wordRows).length === 0) {
      return res.status(404).json({ error: 'Palabra no encontrada' });
    }

    const data = await model.putProgress({wordId, correct})
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ error: 'error when updating the process' });
  }
  
}

async function addConcept(req, res) {
  const { english, spanish } = req.body;
  if (!english || !spanish) return res.status(400).json({ error: 'Missing fields' });

  try {
    const id = await model.createConcept({ english, spanish });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Error adding concept' });
  }
}

module.exports = { 
  getWords, 
  updateProgress,
  addConcept 
};
