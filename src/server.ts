import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

const app = express();

const upload = multer({ dest: 'uploads' });

mongoose.connect(process.env.DATABASE_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('hiii');
});

app.listen(process.env.PORT, () => console.log('Server ON !!!'));
