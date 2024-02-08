import { Product } from '../../models'

export default abstract class IProductRepository {
  abstract getById(id: number): Promise<Product | undefined>
  abstract list(): Promise<Product[]>
  abstract upsert(product: any): Promise<any>
  abstract delete(id: number): Promise<void>
}
