import { Request, Response } from 'express'
export default abstract class IUserController {
  abstract getByCPF(req: Request, res: Response): Promise<void>
  abstract getById(req: Request, res: Response): Promise<void>
  abstract getByEmail(req: Request, res: Response): Promise<void>
  abstract list(req: Request, res: Response): Promise<void>
  abstract transaction(req: Request, res: Response): Promise<void>
  abstract createAdmin(req: Request, res: Response): Promise<void>
  abstract create(req: Request, res: Response): Promise<void>
  abstract update(req: Request, res: Response): Promise<void>
}
