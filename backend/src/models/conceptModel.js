const db = require('../db');

async function getAllConcepts() {
  const [rows] = await db.query('SELECT * FROM words');
  return rows;
}

async function createConcept({ english, spanish }) {
  const [result] = await db.query(
    'INSERT INTO words (english, spanish) VALUES (?, ?)',
    [english, spanish]
  );
  return result.insertId;
}

module.exports = { getAllConcepts, createConcept };
