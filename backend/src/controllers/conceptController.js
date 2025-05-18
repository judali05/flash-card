const model = require('../models/conceptModel');

async function takeWords(req, res) {
  const { status, category_id, limit } = req.query;

  try {
    const data = await model.getWords({status, category_id, limit});
    res.json(data);
  } catch (err) {
    console.error('Error in obtaining filtered words:', err);
    res.status(500).json({ error: 'Error fetching concepts' });
  }
}

async function addWord(req, res) {
  const { english, spanish } = req.body;
  if (!english || !spanish) return res.status(400).json({ error: 'Missing fields' });

  try {
    const id = await model.postword({ english, spanish });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Error adding concept' });
  }
}

async function takeCategories(req,res) {
  try {
    const data = await model.getCategories();
    res.json(data);
  } catch (err) {
    console.error('Error in obtaining filtered words:', err);
    res.status(500).json({ error: 'Error fetching concepts' });
  };
}

async function addCategorie(req, res) {
  const { name, description } = req.body;
  if (!name|| !description) return res.status(400).json({ error: 'Missing fields' });
  
  try {
    const id = await model.postCategorie({ name, description });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Error adding concept' });
  }
}

async function updateProgress(req, res) {
    const wordId = req.params.id;
  const { correct } = req.body;

  try {
    if (model.updateProgress(wordRows).length === 0) {
      return res.status(404).json({ error: 'Palabra no encontrada' });
    }

    const data = await model.patchProgress({wordId, correct})
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ error: 'error when updating the process' });
  }
  
}

module.exports = { 
  takeWords,
  addWord, 
  takeCategories,
  addCategorie,
  updateProgress,
};
