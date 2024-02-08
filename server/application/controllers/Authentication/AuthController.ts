import { injectable } from 'inversify'
import IAuthController from '../../../domain/interfaces/controllers/IAuthController'
import { Request, Response } from 'express'
import { IAuthService } from '../../../domain/interfaces/services'

@injectable()
export class AuthController implements IAuthController {
  constructor(private service: IAuthService) {}

  async login(req: Request, res: Response) {
    const request = req.body
    request.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const token = await this.service.login(request)
    res.json(token)
  }

  async forgotPassword(req: Request, res: Response) {
    const request = req.body
    const result = await this.service.forgotPassword(request)
    res.json(result)
  }
}
