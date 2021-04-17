// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import calculateBalance from '../tools/calculateBalance';
import AppError from '../errors/AppError';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: TransactionDTO): Promise<Transaction> {
    const createCategoryService = new CreateCategoryService();
    const { id: category_id } = await createCategoryService.execute(category);

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionRepository.listAll();
    const { total } = calculateBalance(transaction);

    const hasEnoughBalance = total >= value;

    if (type === 'outcome' && !hasEnoughBalance) {
      throw new AppError('no balance enough to complete operation', 400);
    }

    const newTransaction = await transactionRepository.add({
      title,
      value,
      type,
      category_id,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
