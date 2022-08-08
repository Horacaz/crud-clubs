const express = require('express');

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
  res.end('Hola, Mundo');
});

app.listen(PORT);
console.log(`Escuchando en el puerto ${PORT}`);
