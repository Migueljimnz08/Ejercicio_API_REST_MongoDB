const express = require('express');
const cowsay = require('cowsay');
const app = express()
const port = 3000

// Leer fichero .env
require('dotenv').config()

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const productRoutes = require('./routes/products.routes');
const providerRoutes = require('./routes/providers.routes');

app.use(express.json());

// Rutas
//API
app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);


// Gestionar ruta inexistente
app.use(error404);

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "tux", // Use the tux ASCII art // tux
    })
  );
});