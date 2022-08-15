const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create();
const multer = require('multer');

const upload = multer({ dest: './uploads/imagenes' });

const PORT = 8080;
const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/uploads`));

app.listen(PORT);

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    data: {
      saludo: 'horacio'.toUpperCase(),
    },
  });
});

app.get('/teamAdd', (req, res) => {
  res.render('teamAdd', {
    layout: 'main',
  });
});

app.get('/equipos', (req, res) => {
  const equipos = fs.readFileSync('./data/equipos.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(equipos);
});

app.post('/teamAdd', upload.single('imagen'), (req, res) => {
  app.use(express.text({ type: '*/*' }));
  console.log(req.body);
  res.render('teamAdd', {
    layout: 'main',
  });
});
