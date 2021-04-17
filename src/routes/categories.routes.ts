import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.post('/', categoriesController.store);

export default categoriesRouter;
