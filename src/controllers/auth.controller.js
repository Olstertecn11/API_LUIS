

exports.login = async (req, res, next) => {
  try {
    const user = { id: 0, roles: ['admin'], picture: '' };
    res.json(user);
  } catch (err) {
    next(err);
  }
};

