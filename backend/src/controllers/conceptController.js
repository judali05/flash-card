const model = require('../models/conceptModel');

async function getConcepts(req, res) {
  try {
    const data = await model.getAllConcepts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching concepts' });
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

module.exports = { getConcepts, addConcept };
