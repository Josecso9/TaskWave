const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Asegúrate de tener cors instalado con npm install cors
const config = require('./config');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const app = express();
const auth = require('./middlewares/auth');

// Configuración de CORS para permitir solicitudes de un origen específico
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

// Aplicar middleware CORS a todas las solicitudes
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});