import * as jwt from 'jsonwebtoken'
import { User } from '../../domain/models'
import dotenv from 'dotenv'
import UserService from '../../domain/services/UserService'
import UserRepository from '../../infra/data/repositories/UserRepository'
import { EmailService } from '../../domain/services'
dotenv.config()
const secret = String(process.env.JWT_PASS)
const userService = new UserService(new UserRepository())

export function createJwt(user: User) {
  const payload = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    p: user.perfil,
    pts: user.ponto
  }
  const options: jwt.SignOptions = {
    expiresIn: '8h'
  }
  return jwt.sign(payload, secret, options)
}

export async function validateJwt(token: string) {
  try {
    const result: any = jwt.verify(token, secret)
    const user = await userService.getById(result.id)
    return user ? true : false
  } catch {
    return false
  }
}

export async function isAdmin(token: string) {
  try {
    const result: any = jwt.verify(token, secret)
    const user = await userService.getByIdAuth(result.id)
    return user && user.perfil == 1 ? true : false
  } catch {
    return false
  }
}
