import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_id: string;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async listAll(): Promise<Transaction[]> {
    const transactions = await this.find({ relations: ['category'] });
    return transactions;
  }

  public async add({
    title,
    value,
    type,
    category_id,
  }: TransactionDTO): Promise<Transaction> {
    const transaction = await this.save(
      this.create({ title, value, type, category_id }),
    );

    return transaction;
  }
}

export default TransactionsRepository;
