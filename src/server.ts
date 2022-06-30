import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

import File from './models/File';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads' });

mongoose.connect(process.env.DATABASE_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

async function handleDownload(req: Request, res: Response) {
  const file = await File.mongooseModel.findById(req.params.id);

  if (file.password != null) {
    if (req.body.password == null) {
      res.render('password');
      return;
    }

    if (!(await bcrypt.compare(req.body.password, file.password))) {
      res.render('password', { error: true });
      return;
    }
  }

  // eslint-disable-next-line no-plusplus
  file.downloadCount++;
  await file.save();

  res.download(file.path, file.originalName);
}

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

  res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.route('/file/:id').get(handleDownload).post(handleDownload);

app.listen(process.env.PORT, () => console.log('Server ON !!!'));
