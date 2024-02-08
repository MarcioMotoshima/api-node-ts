import {
  CreateUserAdminDto,
  CreateUserDto,
  TransactionDto,
  UpdateUserDto
} from '../../DTO'
import { User } from '../../models'

export default abstract class IUserRepository {
  abstract getById(id: number): Promise<User | undefined>
  abstract getByCPF(cpf: string): Promise<User | undefined>
  abstract getByEmail(email: string): Promise<User | undefined>
  abstract list(): Promise<User[]>
  abstract transaction(body: TransactionDto): Promise<void>
  abstract create(user: CreateUserDto): Promise<any>
  abstract update(user: UpdateUserDto): Promise<any>
  abstract updatePassword(id: number, newPassword: string): Promise<boolean>
  abstract forgotPassword(user: User): Promise<boolean>
}
