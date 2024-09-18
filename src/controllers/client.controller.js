const db = require('../config/db');

exports.createClient = async (req, res, next) => {
  const { user_id, address, name, phone, assigned_seller } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO client (user_id, address, name, phone, assigned_seller) VALUES (?, ?, ?, ?, ?)',
      [user_id, address, name, phone, assigned_seller]
    );

    res.status(201).json({
      message: 'Client created successfully',
      clientId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating client',
      error: err.message
    });
  }
};

exports.getAllClients = async (req, res, next) => {
  try {
    const [clients] = await db.execute('SELECT * FROM client');
    res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching clients',
      error: err.message
    });
  }
};

exports.getClientById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [client] = await db.execute('SELECT * FROM client WHERE id = ?', [id]);

    if (client.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching client',
      error: err.message
    });
  }
};

exports.updateClient = async (req, res, next) => {
  const { id } = req.params;
  const { address, name, phone, assigned_seller } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE client SET address = ?, name = ?, phone = ?, assigned_seller = ? WHERE id = ?',
      [address, name, phone, assigned_seller, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error updating client',
      error: err.message
    });
  }
};

exports.deleteClient = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM client WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error deleting client',
      error: err.message
    });
  }
};
