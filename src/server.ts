import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3333, () => console.log('Server ON !!!'));
