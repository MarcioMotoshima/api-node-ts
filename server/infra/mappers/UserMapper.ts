import { Product, User } from '../../domain/models'
import { UserResponseDto } from '../../domain/DTO'

export default abstract class UserMapper {
  static mapOne(user: User): UserResponseDto {
    return {
      id: user.id || 0,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      niver: user.niver || '',
      datac: user.datac || '',
      ponto: user.ponto
    }
  }

  static mapMany(query: User[]): UserResponseDto[] {
    return query.map(row => this.mapOne(row))
  }
}
