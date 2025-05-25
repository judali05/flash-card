const db = require('../db');

async function getWords({ status, category_id, limit }) {
  let query = 'SELECT * FROM words WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (category_id) {
    query += ' AND category_id = ?';
    params.push(category_id);
  }

  if (limit) {
    query += ' ORDER BY RAND() LIMIT ?';
    params.push(parseInt(limit));
  } else {
    query += ' ORDER BY english ASC'
  }

  const [result] = await db.query(query, params);
  return result;
}

async function getWordsCount({ status, category_id }) {
  let query = 'SELECT * FROM words WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (category_id) {
    query += ' AND category_id = ?';
    params.push(category_id);
  }

  const [result] = await db.query(query, params);
  return result;
}

async function postword({ english, spanish, category_id, description}) {
  const [result] = await db.query(
    'INSERT INTO words (english, spanish, category_id, description) VALUES (?, ?, ?, ?)',
    [english, spanish, category_id || null, description || null]
  );
  return result.insertId;
}

async function getCategories() {
  const [result] = await db.query(
    'SELECT * FROM categories ORDER BY created_at DESC'
  );
  return result;
}

async function postCategorie({ name, description}) {
  const [result] = await db.query(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description]
  );
  return result.insertId;
}

async function patchProgress({id, correct}) {
  const [word] = await db.query('SELECT * FROM words WHERE id = ?', [id]);

  if (!word || word.length === 0) {
    return res.status(404).json({ message: 'Palabra no encontrada' });
  }
  const currentWord = word[0];

  const updatedTimesPracticed = Number(currentWord.times_practiced || 0) + 1;
  const updatedTimesCorrect = correct
    ? Number(currentWord.times_correct || 0) + 1
    : Number(currentWord.times_correct || 0);

  let history = [];
  if (currentWord.practice_history) {
    try {
      history = JSON.parse(currentWord.practice_history);
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }
  }

  history.push(correct);
  if (history.length > 5) {
    history.shift();
  }

  const correctCount = history.filter((v) => v === true).length;
  const accuracy = correctCount / history.length;

  let newStatus = 'en_proceso'; 

  if (history.length === 0) {
    newStatus = 'por_aprender';
  } else if (accuracy >= 0.8 && history.length >= 3) {
    newStatus = 'aprendida';
  } else {
    newStatus = 'en_proceso';
  }

  const [result] = await db.query(
    `UPDATE words SET times_practiced = ?, times_correct = ?, last_practiced_at = NOW(), status = ?, practice_history = ? WHERE id = ?`,
    [updatedTimesPracticed, updatedTimesCorrect, newStatus, JSON.stringify(history), id]
  );
  return result;
}

module.exports = { 
  getWords,
  getWordsCount,
  postword,
  getCategories,
  postCategorie,
  patchProgress,
};
