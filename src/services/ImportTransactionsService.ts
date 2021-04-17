import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateCategoryService from './CreateCategoryService';

interface TransactionsDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(transactions: TransactionsDTO[]): Promise<Transaction[]> {
    const createCategoryService = new CreateCategoryService();
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const categories = await Promise.all(
      transactions.map(({ category }) =>
        createCategoryService.execute(category),
      ),
    );

    const createTransactions = transactions.map(transaction => {
      const { title, type, value, category } = transaction;
      return {
        title,
        type,
        value: Number(value),
        category_id: categories.find(cat => cat.title === category)?.id,
      };
    });

    const transactionsToSave = transactionsRepository.create(
      createTransactions,
    );

    const newTransactions = await transactionsRepository.save(
      transactionsToSave,
    );

    return newTransactions;
  }
}

export default ImportTransactionsService;
