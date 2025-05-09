const express = require('express');
const cors = require('cors');
const pool = require('./src/db/index');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener todas las palabras
app.get('/api/words', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM words');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las palabras:', error);
    res.status(500).json({ error: 'Error al obtener las palabras' });
  }
});

// Ruta para obtener todas las categorías
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Ruta para obtener palabras por categoría
app.get('/api/words/category/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM words WHERE category_id = ?', [categoryId]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las palabras por categoría:', error);
    res.status(500).json({ error: 'Error al obtener las palabras por categoría' });
  }
});

// Ruta para actualizar el progreso de una palabra
app.put('/api/words/:id/progress', async (req, res) => {
  const wordId = req.params.id;
  const { correct } = req.body;

  try {
    const [wordRows] = await pool.query('SELECT times_practiced, times_correct FROM words WHERE id = ?', [wordId]);
    if (wordRows.length === 0) {
      return res.status(404).json({ error: 'Palabra no encontrada' });
    }

    let { times_practiced, times_correct } = wordRows[0];
    times_practiced += 1;
    if (correct) {
      times_correct += 1;
    }

    await pool.query(
      'UPDATE words SET times_practiced = ?, times_correct = ?, last_practiced_at = NOW() WHERE id = ?',
      [times_practiced, times_correct, wordId]
    );

    res.json({ message: 'Progreso actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el progreso:', error);
    res.status(500).json({ error: 'Error al actualizar el progreso' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});