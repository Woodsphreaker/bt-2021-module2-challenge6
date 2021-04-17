import { Router } from 'express';
import transactionController from '../controllers/transactionController';
import importController from '../controllers/importController';
import upload from '../middlewares/upload';

const transactionsRouter = Router();

transactionsRouter.get('/', transactionController.index);
transactionsRouter.post('/', transactionController.store);
transactionsRouter.delete('/:id', transactionController.destroy);
transactionsRouter.post('/import', upload, importController.store);

export default transactionsRouter;
