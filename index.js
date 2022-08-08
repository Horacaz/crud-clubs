const express = require('express');

const PORT = 8080;

const app = express();

app.get('/hola', (req, res, next) => {
  res.write('Hola, Mundo');
  next('Esto es un parametro de next');
}, (a, req, res, next) => {
  res.write(' Buenas');
  next();
}, (req, res) => {
  res.end(' Listo, terminamos');
});

app.listen(PORT);
console.log(`Escuchando en el puerto ${PORT}`);
