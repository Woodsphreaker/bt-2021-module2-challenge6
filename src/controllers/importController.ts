import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import parse from 'csv-parse';
import paths from '../config/paths';

import ImportTransactionService from '../services/ImportTransactionsService';

interface TransactionsDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

const readCSVFile = (filename: string): Promise<TransactionsDTO[]> => {
  const { uploadFolder } = paths;
  const filePath = path.join(uploadFolder, filename);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
      }

      parse(
        data,
        { delimiter: ',', columns: true, trim: true },
        (err, output) => {
          if (err) {
            reject(err);
          }
          resolve(output);
        },
      );
    });
  });
};

const store = async (req: Request, res: Response): Promise<void> => {
  const { filename } = req.file;

  const transactions = await readCSVFile(filename);

  const importTransactionService = new ImportTransactionService();
  const newTransactions = await importTransactionService.execute(transactions);

  res.json(newTransactions);
};

export default { store };
