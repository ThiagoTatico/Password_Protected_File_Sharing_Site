import bcrypt from 'bcrypt';
import { Request } from 'express';

import File from '../models/File';

interface IFileDataDTO {
  path: string;
  originalName: string;
  password?: string;
}

async function handleUpload(req: Request) {
  const fileData: IFileDataDTO = {
    path: req.file.path,
    originalName: req.file.originalname,
  };

  if (req.body.password != null && req.body.password !== '') {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await File.mongooseModel.create(fileData);

  return file;
}

export { handleUpload };
