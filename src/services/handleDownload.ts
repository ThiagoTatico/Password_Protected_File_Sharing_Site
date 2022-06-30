import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import File from '../models/File';

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

export { handleDownload };
