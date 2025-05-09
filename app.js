const express = require('express');
const cors = require('cors');
const app = express();
const dogRoutes = require('./routes/dogRoutes');

app.use(cors({
  origin: ['http://localhost:3001', 'http://192.241.148.118:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/dogs', dogRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/dogs`);
});

