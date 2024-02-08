import { injectable } from 'inversify'
import { IProductRepository } from '../../../domain/interfaces/repositories'
import { Product } from '../../../domain/models'
import { BaseRepository } from './BaseRepository'

@injectable()
export default class ProductRepository
  extends BaseRepository
  implements IProductRepository
{
  private table: string = 'produtos'

  async getById(id: number): Promise<Product | undefined> {
    try {
      return await this.connection(this.table).where('id', id).first()
    } catch (error) {
      return
    }
  }

  async list(): Promise<Product[]> {
    try {
      const result: Product[] = await this.connection(this.table)
      return result
    } catch (error) {
      return []
    }
  }

  async upsert(product: Product): Promise<any> {
    try {
      if (product.id) {
        await this.connection(this.table).where('id', product.id).update({
          nome: product.nome,
          pontos: product.pontos,
          usuario: product.usuario
        })
      } else {
        await this.connection(this.table).insert(product)
      }
      return
    } catch (error) {
      return { error: 'Erro ao cadastrar produto' }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      return await this.connection(this.table).where('id', id).delete()
    } catch (error) {
      return
    }
  }
}
