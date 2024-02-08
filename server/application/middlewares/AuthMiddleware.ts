import { Request, Response, NextFunction } from 'express'
import { validateJwt } from '../helpers/Jwt'

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token && (await validateJwt(String(token)))) {
    next()
    return
  }
  res.status(401).json({ error: 'Acesso não autorizado.' })
}

export default AuthMiddleware
