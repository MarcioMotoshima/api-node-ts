import { Request, Response } from 'express'

export default abstract class IProductController {
  abstract getById(req: Request, res: Response): Promise<void>
  abstract list(req: Request, res: Response): Promise<void>
  abstract upsert(req: Request, res: Response): Promise<Response>
  abstract delete(req: Request, res: Response): Promise<void>
}
