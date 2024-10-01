const express = require('express');
const app = express();
const cors = require('cors')
const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/client.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const morgan = require('morgan');



app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/user', userRoutes);
app.use('', productRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
