import { Request, Response } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionsService from '../services/ListTransactionsService';
import DeleteTransactionService from '../services/DeleteTransactionService';

const index = async (req: Request, res: Response): Promise<Response> => {
  const transactionRepository = new ListTransactionsService();
  const transactions = await transactionRepository.execute();
  return res.json(transactions);
};

const store = async (req: Request, res: Response): Promise<Response> => {
  const { title, value, type, category } = req.body;

  const createTransactionService = new CreateTransactionService();
  const newTransaction = await createTransactionService.execute({
    title,
    category,
    type,
    value,
  });

  return res.json(newTransaction);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const deleteTransactionService = new DeleteTransactionService();
  await deleteTransactionService.execute(id);

  return res.json({ status: 'transaction removed' });
};

export default { index, store, destroy };
