const express = require('express');
const ItemModel = require('../models/itemModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await ItemModel.getAllActiveItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/deleted', async (req, res) => {
  try {
    const items = await ItemModel.getAllDeletedItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const items = await ItemModel.searchItems(name);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = await ItemModel.addItem(req.body);
    res.status(201).json({ id: newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await ItemModel.updateItem(req.params.id, req.body);
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ItemModel.softDeleteItem(req.params.id);
    res.json({ message: 'Item soft-deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;