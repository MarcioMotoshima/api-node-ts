import { IAuthService, IUserService } from '../interfaces/services'
import { injectable } from 'inversify'
import { User } from '../models'
import { createHash } from 'crypto'
import { createJwt } from '../../application/helpers/Jwt'
import { ForgotPasswordDto, LoginDTO } from '../DTO/Authentication'

@injectable()
export default class AuthService implements IAuthService {
  constructor(private _userService: IUserService) {}

  private matchPassord(password: string) {
    const hash = createHash('md5')
    hash.update(password)
    return hash.digest('hex')
  }

  async authentication(data: LoginDTO) {
    const clearFPF = this._userService.cleanFPF(data.cpf)
    const user: User | undefined = await this._userService.getByCPFAuth(
      clearFPF
    )
    if (user && user.senha == this.matchPassord(data.password)) {
      return { token: createJwt(user) }
    }
    return { error: 'Usuário ou senha inválida' }
  }

  async login(data: LoginDTO): Promise<any> {
    return await this.authentication(data)
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<any> {
    const cleanFPF = this._userService.cleanFPF(data.cpf)
    const user = await this._userService.getByCPFAuth(cleanFPF)
    if (!user) {
      return {
        message:
          'Enviaremos um link ao email cadastrado, por favor verifique seu email.'
      }
    }
    return await this._userService.forgotPassword(user)
  }
}
