import { injectable } from 'inversify'
import { IProductRepository } from '../interfaces/repositories'
import IProductService from '../interfaces/services/IProductService'
import { Product } from '../models/Product'

@injectable()
export default class ProductService implements IProductService {
  constructor(private respository: IProductRepository) {}

  async getById(id: number): Promise<Product | undefined> {
    return await this.respository.getById(id)
  }
  async list(): Promise<Product[]> {
    return await this.respository.list()
  }
  async upsert(product: Product): Promise<any> {
    return await this.respository.upsert(product)
  }

  async delete(id: number): Promise<any> {
    return await this.respository.delete(id)
  }
}
