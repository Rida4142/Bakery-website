require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/menu'));       // products, categories, settings
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin')); // dashboard, reports

app.get('/', (req, res) => res.send('Bakery API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/hello', (req, res) => {
  res.json({ message: 'hello works' });
});