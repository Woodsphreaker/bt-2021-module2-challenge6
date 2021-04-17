import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async listAll(): Promise<Category[]> {
    const categories = await this.find();
    return categories;
  }

  public async add(title: string): Promise<Category> {
    const category = await this.save(this.create({ title }));
    return category;
  }
}

export default CategoriesRepository;
