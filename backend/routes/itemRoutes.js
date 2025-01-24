const express = require("express");
const ItemModel = require("../models/itemModel");
const router = express.Router();

router.get("/:editor", async (req, res) => {
  try {
    const items = await ItemModel.getAllActiveItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:editor/deleted", async (req, res) => {
  try {
    const items = await ItemModel.getAllDeletedItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:editor/search", async (req, res) => {
  try {
    const { name } = req.query;
    const items = await ItemModel.searchItems(name);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:editor", async (req, res) => {
  try {
    const newItem = await ItemModel.addItem(req.body);
    res.status(201).json({ id: newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:editor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      name: req.body.name,
      item_type: req.body.item_type,
      item_amount: req.body.item_amount,
      price: req.body.price,
    };

    await ItemModel.updateItem(id, updateData);
    res.json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:editor/:id", async (req, res) => {
  try {
    await ItemModel.softDeleteItem(req.params.id);
    res.json({ message: "Item soft-deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
