import { IEmailService, IUserService } from '../interfaces/services'
import {
  CreateUserAdminDto,
  CreateUserDto,
  TransactionDto,
  UpdateUserDto,
  UserResponseDto
} from '../DTO'
import { injectable } from 'inversify'
import { IUserRepository } from '../interfaces/repositories'
import { User } from '../models'
import UserMapper from '../../infra/mappers/UserMapper'
import { ForgotPasswordDto } from '../DTO/Authentication'

@injectable()
export default class UserService implements IUserService {
  constructor(
    private respository: IUserRepository,
    private emailService?: IEmailService
  ) {}

  public cleanFPF(cpf: string): string {
    return cpf.replace(/[.-]/g, '')
  }

  async getByCPF(cpf: string): Promise<UserResponseDto | undefined> {
    const user = await this.respository.getByCPF(this.cleanFPF(cpf))
    return user ? UserMapper.mapOne(user) : user
  }

  async getByCPFAuth(cpf: string): Promise<User | undefined> {
    return await this.respository.getByCPF(cpf)
  }

  async getById(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.respository.getById(id)
    return user ? UserMapper.mapOne(user) : user
  }

  async getByIdAuth(id: number): Promise<User | undefined> {
    return await this.respository.getById(id)
  }

  async getByEmail(email: string): Promise<UserResponseDto | undefined> {
    const user = await this.respository.getByEmail(email)
    return user ? UserMapper.mapOne(user) : user
  }

  async list(): Promise<UserResponseDto[]> {
    const users = await this.respository.list()
    return users ? UserMapper.mapMany(users) : users
  }

  async transaction(body: TransactionDto): Promise<any> {
    return await this.respository.transaction(body)
  }

  async createAdmin(body: CreateUserAdminDto) {
    const { name, cpf, email, mobile, userId } = body

    const userCpf = await this.getByCPF(this.cleanFPF(cpf))
    if (userCpf)
      return {
        error:
          'Usuário ja possui cadastro com este CPF, tente recuperar a senha'
      }

    const userEmail = await this.getByEmail(email.toLowerCase().trim())
    if (userEmail)
      return {
        error: 'Email já esta sendo usado em outra conta, use outro email'
      }

    const registerUser = await this.getByIdAuth(userId)
    if (registerUser && registerUser.perfil != 1)
      return {
        error: 'Este usuário não está autorizado para cadastrar cliente'
      }

    const password = Math.floor(Math.random() * 1000000)

    const newUser = await this.respository.create({
      name,
      email,
      cpf: this.cleanFPF(cpf),
      password: String(password),
      confirmPassword: String(password),
      mobile,
      userId,
      loja: 'Indaiatuba'
    })

    if (newUser) {
      await this.emailService!.register({
        name,
        email,
        password: String(password)
      })
      return
    }
    return { error: 'Erro ao Cadastrar' }
  }

  async create(body: CreateUserDto) {
    const { name, cpf, password, confirmPassword, email, mobile } = body
    const userCpf = await this.getByCPF(this.cleanFPF(cpf))
    if (userCpf)
      return {
        error:
          'Usuário ja possui cadastro com este CPF, tente recuperar a senha'
      }

    const userEmail = await this.getByEmail(email.toLowerCase().trim())
    if (userEmail)
      return {
        error: 'Email já esta sendo usado em outra conta, use outro email'
      }

    if (password != confirmPassword)
      return {
        error: 'Verifique suas senhas, não são iguais'
      }

    const newUser = await this.respository.create({
      name,
      email,
      cpf: this.cleanFPF(cpf),
      password: String(password),
      confirmPassword: String(password),
      mobile,
      userId: 0,
      loja: 'Via Site'
    })

    if (newUser) {
      await this.emailService!.register({
        name,
        email,
        password
      })
      return
    }
    return { error: 'Erro ao cadastrar verifique por favor os dados' }
  }

  async update(body: UpdateUserDto) {
    const { id, name, cpf, email, mobile } = body
    const user = await this.getByIdAuth(id)
    const userEmail = await this.getByEmail(email.toLowerCase().trim())
    if (!user) {
      return {
        error: 'Usuário não encontrado'
      }
    }

    if (userEmail && userEmail.id != id)
      return {
        error: 'Email já esta sendo usado em outra conta, use outro email'
      }

    const updatedUser = await this.respository.update({
      id,
      name,
      email,
      cpf: this.cleanFPF(cpf),
      mobile
    })
    if (updatedUser) {
      return await this.respository.update(updatedUser)
    }
    return
  }

  async forgotPassword(user: User) {
    await this.respository.forgotPassword(user)
    await this.emailService!.forgotPassword({
      email: user.email,
      name: user.nome,
      link: 'http://linkdosistema'
    })
    return {
      message:
        'Enviaremos um link ao email cadastrado, por favor verifique seu email.'
    }
  }
}
