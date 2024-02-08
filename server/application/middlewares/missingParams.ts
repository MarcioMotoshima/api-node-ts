import { Request, Response, NextFunction } from 'express'

const missingParams = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware executado!')

  next()
}

export default missingParams
