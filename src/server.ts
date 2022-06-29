import bcrypt from 'bcrypt';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

import File from './models/File';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();

const upload = multer({ dest: 'uploads' });

mongoose.connect(process.env.DATABASE_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
    password: '',
  };

  if (req.body.password != null && req.body.password !== '') {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await File.mongooseModel.create(fileData);
  console.log(file);
  res.send(file.originalName);
});

app.listen(process.env.PORT, () => console.log('Server ON !!!'));
