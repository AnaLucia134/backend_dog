const express = require('express');
const cors = require('cors');
const dogRoutes = require('./routes/dogRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/dogs', dogRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api/dogs`);
  });
}
