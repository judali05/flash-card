const db = require('../db');

async function getAllConcepts() {
  const [rows] = await db.query('SELECT * FROM concepts');
  return rows;
}

async function createConcept({ title, description, tags }) {
  const [result] = await db.query(
    'INSERT INTO concepts (title, description, tags) VALUES (?, ?, ?)',
    [title, description, tags]
  );
  return result.insertId;
}

module.exports = { getAllConcepts, createConcept };
