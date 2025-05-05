const express = require('express');
const cors = require('cors');
const app = express();
const dogRoutes = require('./routes/dogRoutes');

app.use(cors());
app.use('/api/dogs', dogRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/dogs`);
});
