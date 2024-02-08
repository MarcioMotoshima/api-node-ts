import { injectable } from 'inversify'
import { User } from '../../../domain/models'
import { IUserRepository } from '../../../domain/interfaces/repositories'
import {
  CreateUserDto,
  TransactionDto,
  UpdateUserDto
} from '../../../domain/DTO'
import { BaseRepository } from './BaseRepository'
import { createHash } from 'crypto'
import momentTz from 'moment-timezone'

@injectable()
export default class UserRepository
  extends BaseRepository
  implements IUserRepository
{
  private table: string = 'usuarios'

  async getById(id: number): Promise<User | undefined> {
    try {
      return await this.connection(this.table).where('id', id).first()
    } catch (error) {
      return
    }
  }

  async getByCPF(cpf: string): Promise<User | undefined> {
    try {
      return await this.connection(this.table).where('cpf', cpf).first()
    } catch (error) {
      return
    }
  }

  async getByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.connection(this.table).where('email', email).first()
    } catch (error) {
      return
    }
  }
  async list(): Promise<User[]> {
    try {
      return await this.connection(this.table).where('perfil', 0)
    } catch (error) {
      return []
    }
  }

  async transaction(body: TransactionDto): Promise<any> {
    try {
      const user = await this.getById(body.id)
      if (!user) return

      const receivedValue = Math.floor(parseInt(body.value))
      if (body.type == 1) {
        const newValue = user.ponto + receivedValue
        await this.connection(this.table)
          .where('id', body.id)
          .update({ ponto: newValue })
      } else {
        if (user.ponto > receivedValue) {
          const newValue = user.ponto - receivedValue
          await this.connection(this.table)
            .where('id', body.id)
            .update({ ponto: newValue })
        } else {
          return { error: 'Usuário contem pontos insuficiente' }
        }
      }
      return await this.connection(this.table)
    } catch (error) {
      return
    }
  }

  private createHash(password: string) {
    const hash = createHash('md5')
    hash.update(password)
    return hash.digest('hex')
  }

  async create(user: CreateUserDto): Promise<User | undefined> {
    try {
      return await this.connection(this.table).insert({
        nome: user.name,
        email: user.email,
        cpf: user.cpf,
        tel: user.mobile,
        senha: this.createHash(user.password),
        ponto: 0,
        perfil: 0,
        loja: user.loja,
        tentativa: 3,
        niver: momentTz.tz('America/Sao_Paulo').format('DD/MM/YYYY'),
        datac: momentTz.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
      })
    } catch (error) {
      return
    }
  }

  async update(user: UpdateUserDto): Promise<any> {
    try {
      return await this.connection(this.table).where('id', user.id).update({
        nome: user.name,
        email: user.email,
        tel: user.mobile
      })
    } catch (error) {
      throw new Error('Method not implemented.')
    }
  }

  async updatePassword(id: number, newPassword: string): Promise<boolean> {
    try {
      await this.connection(this.table)
        .where('id', id)
        .update({
          senha: this.createHash(newPassword)
        })
      return true
    } catch (error) {
      return false
    }
  }

  async forgotPassword(user: User): Promise<any> {
    await this.connection('usuarios_token').insert({
      id_usuario: user.id,
      hash: this.createHash(String(Math.floor(Math.random() * 1000000))),
      used: 0
    })
  }
}
