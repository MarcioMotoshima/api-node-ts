import { Product } from '../../domain/models'
import { ProductResponseDto } from '../../domain/DTO'

export default abstract class ProductMapper {
  static mapOne(query: Product): ProductResponseDto {
    return new Product(query.nome, query.pontos, query.usuario, query.id)
  }

  static mapMany(query: Product[]): ProductResponseDto[] {
    return query.map(row => this.mapOne(row))
  }
}
