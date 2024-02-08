import 'reflect-metadata'
import express, { Application } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'
const fs = require('fs')
const path = require('path')
dotenv.config()

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '10mb' }))

function loadRoutes(app: Application) {
  const routePath = path.join(__dirname, 'application/controllers')
  fs.readdirSync(routePath).forEach((file: any) => {
    const filePath = path.join(routePath, file) + '\\routes.ts'
    const routeModule = require(filePath)
    if (routeModule && routeModule.default.router) {
      app.use(routeModule.default.basePath, routeModule.default.router)
    }
  })
}

loadRoutes(app)
export default app
