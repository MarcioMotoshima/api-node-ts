import 'reflect-metadata'
import app from './app'
import dotenv from 'dotenv'
import defineRoutes from './application/helpers/defineRoutes'
import { join } from 'path'
import { custom404Middleware, errorMiddleware } from './application/middlewares'
dotenv.config()

defineRoutes(app, join(__dirname, 'application', 'controllers')).then(() => {
  const { PORT } = process.env

  app.use(custom404Middleware)
  app.use(errorMiddleware)

  app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`)
  })
})
