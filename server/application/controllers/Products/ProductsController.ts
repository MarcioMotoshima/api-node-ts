import { injectable } from 'inversify'
import { Request, Response } from 'express'
import IProductController from '../../../domain/interfaces/controllers/IProductController'
import IProductService from '../../../domain/interfaces/services/IProductService'

@injectable()
export class ProductController implements IProductController {
  constructor(private service: IProductService) {}

  async getById(req: Request, res: Response) {
    const id: number = +req.params.id
    const user = await this.service.getById(id)
    res.json(user)
  }

  async list(req: Request, res: Response) {
    const products = await this.service.list()
    res.json({ products })
  }

  async upsert(req: Request, res: Response): Promise<any> {
    const body = req.body
    const products = await this.service.upsert(body)
    res.json({ products })
  }

  async delete(req: Request, res: Response) {
    const id: number = +req.params.id
    const user = await this.service.delete(id)
    res.json(user)
  }
}
