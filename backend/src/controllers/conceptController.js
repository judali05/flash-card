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

async function takeWordsCount(req, res) {
  const { status, category_id } = req.query;

  try {
    const data = await model.getWordsCount({status, category_id});
    const count = Array.isArray(data) ? result[0]?.total : 0;
    res.json({ total: count });
    res.json(data);
  } catch (err) {
    console.error('Error in obtaining filtered words:', err);
    res.status(500).json({ error: 'Error fetching concepts' });
  }
}

async function addWord(req, res) {
  const { english, spanish, category_id, description } = req.body;
  if (!english || !spanish) return res.status(400).json({ error: 'Missing fields' });

  try {
    const id = await model.postword({ english, spanish, category_id, description });
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
  const { id } = req.params;
  const { correct } = req.body;

  try {
    const data = await model.patchProgress({id, correct})
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ error: 'error when updating the process' });
  }
  
}

module.exports = { 
  takeWords,
  takeWordsCount,
  addWord, 
  takeCategories,
  addCategorie,
  updateProgress,
};
