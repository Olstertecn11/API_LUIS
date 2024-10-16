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
  const { username, role_id, email, image } = req.body;

  try {
    let query = 'UPDATE user SET username = ?, role_id = ?, email = ?';
    const values = [username, role_id, email];

    if (image) {
      query += ', image = ?';
      values.push(image);
    }

    query += ' WHERE id = ?';
    values.push(id);

    const [result] = await db.execute(query, values);

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



exports.updatePassword = async (req, res, next) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const [user] = await db.execute('SELECT password FROM user WHERE id = ?', [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user[0].password !== currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const [result] = await db.execute('UPDATE user SET password = ? WHERE id = ?', [newPassword, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Error updating password' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error updating password',
      error: err.message
    });
  }
};
