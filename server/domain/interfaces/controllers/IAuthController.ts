import { Request, Response } from 'express'

export default abstract class IAuthController {
  abstract login(req: Request, res: Response): Promise<void>
  abstract forgotPassword(req: Request, res: Response): Promise<void>
}
