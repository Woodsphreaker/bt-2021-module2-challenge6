import crypto from 'crypto';
import multer, { Multer } from 'multer';
import path from 'path';

import paths from './paths';

export default function multerStorage(): Multer {
  const targetFolder = paths.uploadFolder;

  const storage = multer.diskStorage({
    destination: targetFolder,
    filename: (req, file, callback) => {
      const hashName = crypto.randomBytes(10).toString('hex');

      callback(null, `${hashName}${path.extname(file.originalname)}`);
    },
  });

  return multer({ storage });
}
