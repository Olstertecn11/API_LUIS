
const db = require('../config/db');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const [user] = await db.execute('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]);

    if (user.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const sessionToken = generateToken();

    const expiresAt = new Date(Date.now() + 3600000);

    await db.execute('INSERT INTO access_token (user_id, token, expires_at) VALUES (?, ?, ?)', [
      user[0].id,
      sessionToken,
      expiresAt
    ]);

    res.json({
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role_id: user[0].role_id,
        image: user[0].image,
        created_at: user[0].created_at,
      },
      token: sessionToken,
      expiresAt
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  const { token } = req.body;

  try {
    await db.execute('DELETE FROM access_token WHERE token = ?', [token]);

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};


exports.me = async (req, res, next) => {
  const { token } = req.body;

  try {
    const [session] = await db.execute('SELECT * FROM access_token WHERE token = ?', [token]);

    if (session.length === 0) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const userId = session[0].user_id;

    const [user] = await db.execute('SELECT * FROM user WHERE id = ?', [userId]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role_id: user[0].role_id,
        image: user[0].image,
        created_at: user[0].created_at,
      },
      token: token,
      expiresAt: session[0].expires_at
    });
  } catch (err) {
    next(err);
  }
};

