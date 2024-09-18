const db = require('../config/db');



exports.createUser = async (req, res, next) => {
  const { username, password, role_id, email } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO user (username, password, role_id, email) VALUES (?, ?, ?, ?)',
      [username, password, role_id, email]
    );

    res.status(201).json({
      message: 'User created successfully',
      userId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating user',
      error: err.message
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const [users] = await db.execute('SELECT * FROM user');
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching users',
      error: err.message
    });
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [user] = await db.execute('SELECT * FROM user WHERE id = ?', [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching user',
      error: err.message
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, role_id, email } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE user SET username = ?, password = ?, role_id = ?, email = ? WHERE id = ?',
      [username, password, role_id, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error updating user',
      error: err.message
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM user WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error deleting user',
      error: err.message
    });
  }
};

