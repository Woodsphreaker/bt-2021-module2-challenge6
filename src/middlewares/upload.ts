import { Request, Response, NextFunction } from 'express';
import storage from '../config/storage';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const upload = storage().single('file');

  upload(req, res, (err: Error | string): Response | void => {
    if (err) {
      const error = err as Error;
      return res.status(500).json({ status: 'error', message: error.message });
    }
    return next();
  });
};
