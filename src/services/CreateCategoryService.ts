import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repositories/CategoriesRepository';

import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const categoryWithTitle = await categoryRepository.findOne({
      where: { title },
    });

    if (categoryWithTitle) {
      return categoryWithTitle;
    }

    const newCategory = await categoryRepository.add(title);
    return newCategory;
  }
}

export default CreateCategoryService;
