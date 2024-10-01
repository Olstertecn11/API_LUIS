
const db = require('../config/db');

exports.createProduct = async (req, res, next) => {
  const { code, name, seed_type, quantity, unit_price, care_instructions, description, document_url, image } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO product (code, name, seed_type, quantity, unit_price, care_instructions, description, document_url, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [code, name, seed_type, quantity, unit_price, care_instructions, description, document_url, image]
    );

    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating product',
      error: err.message
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const [products] = await db.execute('SELECT * FROM product');
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching products',
      error: err.message
    });
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [product] = await db.execute('SELECT * FROM product WHERE id = ?', [id]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching product',
      error: err.message
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { code, name, seed_type, quantity, unit_price, care_instructions, description, document_url, image } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE product SET code = ?, name = ?, seed_type = ?, quantity = ?, unit_price = ?, care_instructions = ?, description = ?, document_url = ?, image = ? WHERE id = ?',
      [code, name, seed_type, quantity, unit_price, care_instructions, description, document_url, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error updating product',
      error: err.message
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM product WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error deleting product',
      error: err.message
    });
  }
};
