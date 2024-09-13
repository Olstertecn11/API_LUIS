const express = require('express');
const app = express();
const cors = require('cors')
const authRoutes = require('./routes/user.routes');



app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', authRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
