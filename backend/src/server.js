require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/users');
// const listingRoutes = require('./routes/listings'); // Anchal's half
// const orderRoutes = require('./routes/orders');       // Anchal's half

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', healthRoutes);          // -> /health
app.use('/api/users', userRoutes);   // -> /api/users/register, /login, /me
// app.use('/api/listings', listingRoutes);
// app.use('/api/orders', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`AgriConnect backend listening on port ${PORT}`);
});

module.exports = app;
