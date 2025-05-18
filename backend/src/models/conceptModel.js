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
    query += ' LIMIT ?';
    params.push(parseInt(limit));
  }

  const [result] = await db.query(query, params);
  return result;
}

async function postword({ english, spanish }) {
  const [result] = await db.query(
    'INSERT INTO words (english, spanish) VALUES (?, ?)',
    [english, spanish]
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

async function patchProgress({wordId, correct}) {
  const [wordRows] = await pool.query('SELECT times_practiced, times_correct FROM words WHERE id = ?', [wordId]);

  let { times_practiced, times_correct } = wordRows[0];
  times_practiced += 1;
  if (correct) {
    times_correct += 1;
  }

  const [result] = await db.query(
    'UPDATE words SET times_practiced = ?, times_correct = ?, last_practiced_at = NOW() WHERE id = ?',
     [times_practiced, times_correct, wordId]
  );
  return result;
}

module.exports = { 
  getWords,
  postword,
  getCategories,
  postCategorie,
  patchProgress,
};
