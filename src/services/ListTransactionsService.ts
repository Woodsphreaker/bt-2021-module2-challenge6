import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import calculateBalance from '../tools/calculateBalance';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class ListTransactionsService {
  public async execute(): Promise<object> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transactions = await transactionRepository.find({
      relations: ['category'],
    });

    const balance = calculateBalance(transactions);
    const transactionsWithBalance = { transactions, balance };

    return transactionsWithBalance;
  }
}

export default ListTransactionsService;
