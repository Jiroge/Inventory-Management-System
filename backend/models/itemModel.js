const db = require('../config/database');

class ItemModel {
  static async getAllActiveItems() {
    const [rows] = await db.query('SELECT * FROM items WHERE item_status = 1');
    return rows;
  }

  static async getAllDeletedItems() {
    const [rows] = await db.query('SELECT * FROM items WHERE item_status = 0');
    return rows;
  }

  static async searchItems(name) {
    const [rows] = await db.query('SELECT * FROM items WHERE name LIKE ? AND item_status = 1', [`%${name}%`]);
    return rows;
  }

  static async addItem(itemData) {
    const [result] = await db.query('INSERT INTO items SET ?', [itemData]);
    return result.insertId;
  }

  static async updateItem(id, itemData) {
    await db.query('UPDATE items SET ? WHERE id = ?', [itemData, id]);
  }

  static async softDeleteItem(id) {
    await db.query('UPDATE items SET item_status = 0 WHERE id = ?', [id]);
  }
}

module.exports = ItemModel;