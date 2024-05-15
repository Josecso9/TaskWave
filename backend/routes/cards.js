const express = require('express');
const Card = require('../models/Card');
const auth = require('../middlewares/auth');  // Importa el middleware de autenticación

const router = express.Router();

// Crear una nueva card
router.post('/', auth, async (req, res) => {
  const { title, description, status } = req.body;
  const newCard = new Card({
    user: req.user.id,  // Usa el ID del usuario del token decodificado
    title,
    description,
    status
  });

  try {
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener todas las cards de un usuario
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id });
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar una card
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar una card
router.delete('/:id', auth, async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Card deleted' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;