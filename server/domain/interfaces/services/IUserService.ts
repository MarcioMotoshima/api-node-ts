import {
  CreateUserAdminDto,
  CreateUserDto,
  TransactionDto,
  UpdateUserDto,
  UserResponseDto
} from '../../DTO'
import { ForgotPasswordDto } from '../../DTO/Authentication'
import { User } from '../../models'

export default abstract class IUserService {
  abstract cleanFPF(cpf: string): string
  abstract getByCPF(cpf: string): Promise<UserResponseDto | undefined>
  abstract getByCPFAuth(cpf: string): Promise<User | undefined>
  abstract getById(id: number): Promise<UserResponseDto | undefined>
  abstract getByEmail(email: string): Promise<UserResponseDto | undefined>
  abstract list(): Promise<UserResponseDto[]>
  abstract transaction(body: TransactionDto): Promise<any>
  abstract createAdmin(body: CreateUserAdminDto): Promise<any>
  abstract create(body: CreateUserDto): Promise<any>
  abstract update(body: UpdateUserDto): Promise<any>
  abstract forgotPassword(data: ForgotPasswordDto): Promise<any>
}
