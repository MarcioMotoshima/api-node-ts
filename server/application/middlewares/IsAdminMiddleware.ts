import { Request, Response, NextFunction } from 'express'
import { isAdmin } from '../helpers/Jwt'

const IsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token && (await isAdmin(String(token)))) {
    next()
    return
  }
  res.status(401).json({ error: 'Acesso não autorizado.' })
}

export default IsAdminMiddleware
