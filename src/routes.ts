import { Router } from 'express';
import multer from 'multer';

import { handleDownload } from './services/handleDownload';
import { handleUpload } from './services/handleUpload';

const routes = Router();

const upload = multer({ dest: 'uploads' });

routes.get('/', (req, res) => {
  res.render('index');
});

routes.post('/upload', upload.single('file'), async (req, res) => {
  const file = await handleUpload(req);

  res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

routes.route('/file/:id').get(handleDownload).post(handleDownload);

export { routes };
