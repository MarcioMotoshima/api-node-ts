import { UserPartial } from './UserPartial'

export class User extends UserPartial {
  senha!: string
  perfil!: number
  tentativa!: number
}
