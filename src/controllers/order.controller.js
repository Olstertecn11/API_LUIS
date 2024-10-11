
const db = require('../config/db');

exports.createOrder = async (req, res, next) => {
  const { client_id, items, total } = req.body;

  try {
    const [result] = await db.execute('INSERT INTO `order` (client_id, total, status) VALUES (?, ?, ?)', [
      client_id,
      total,
      'proceso',
    ]);

    const orderId = result.insertId;

    const orderItems = items.map(item => [orderId, item.product_id, item.quantity, item.unit_price, item.total]);

    await db.query(
      'INSERT INTO order_item (order_id, product_id, quantity, unit_price, total) VALUES ?',
      [orderItems]
    );

    res.status(201).json({ message: 'Pedido creado con éxito', orderId });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const [orders] = await db.execute(`
      SELECT o.id, o.client_id, o.order_date, o.status, o.total, c.name as client_name 
      FROM \`order\` o
      JOIN client c ON o.client_id = c.id
      ORDER BY o.order_date DESC
    `);

    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [order] = await db.execute(`
      SELECT o.id, o.client_id, o.order_date, o.status, o.total, c.name as client_name 
      FROM \`order\` o
      JOIN client c ON o.client_id = c.id
      WHERE o.id = ?
    `, [id]);

    if (order.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const [items] = await db.execute(`
      SELECT oi.id, oi.product_id, oi.quantity, oi.unit_price, oi.total, p.name as product_name
      FROM order_item oi
      JOIN product p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id]);

    res.json({ order: order[0], items });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db.execute('UPDATE `order` SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ message: 'Estado del pedido actualizado con éxito' });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM `order` WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ message: 'Pedido eliminado con éxito' });
  } catch (err) {
    next(err);
  }
};
