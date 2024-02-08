import { injectable } from 'inversify'
import IUserController from '../../../domain/interfaces/controllers/IUserController'
import { IUserService } from '../../../domain/interfaces/services'
import { Request, Response } from 'express'

@injectable()
export class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async getByCPF(req: Request, res: Response) {
    const user = await this.service.getByCPF(req.body.cpf)
    res.json(user)
  }

  async getById(req: Request, res: Response) {
    const id: number = +req.params.id
    const user = await this.service.getById(id)
    res.json(user)
  }

  async getByEmail(req: Request, res: Response) {
    const user = await this.service.getByEmail(req.body.email)
    res.json(user)
  }

  async list(req: Request, res: Response) {
    const allUsers = await this.service.list()
    res.json(allUsers)
  }

  async transaction(req: Request, res: Response) {
    const transaction = await this.service.transaction(req.body)
    res.json(transaction)
  }

  async createAdmin(req: Request, res: Response) {
    const user = await this.service.createAdmin(req.body)
    res.json(user)
  }

  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body)
    res.json(user)
  }

  async update(req: Request, res: Response) {
    const user = await this.service.update(req.body)
    res.json(user)
  }
}
