import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateCategoryService from '../services/CreateCategoryService';

import CategoriesRepository from '../repositories/CategoriesRepository';

const index = async (req: Request, res: Response): Promise<Response> => {
  const categoriesRepository = getCustomRepository(CategoriesRepository);
  const categories = await categoriesRepository.listAll();

  return res.json(categories);
};

const store = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.body;

  const createCategoryService = new CreateCategoryService();
  const newCategory = await createCategoryService.execute(title);

  return res.json(newCategory);
};

export default { index, store };
