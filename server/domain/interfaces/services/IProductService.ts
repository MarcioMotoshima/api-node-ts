import { Product } from '../../models'

export default abstract class IProductService {
  abstract getById(id: number): Promise<Product | undefined>
  abstract list(): Promise<Product[]>
  abstract upsert(httpRequest: any): Promise<any>
  abstract delete(id: number): Promise<void>
}
