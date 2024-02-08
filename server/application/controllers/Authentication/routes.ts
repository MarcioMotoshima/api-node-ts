import { Router } from 'express'
import Container from '../../../infra/ioc'
import IAuthController from '../../../domain/interfaces/controllers/IAuthController'

const controller = Container.get(IAuthController)
const router = Router()

router.post('/login', controller.login.bind(controller))
router.post('/forgot-password', controller.forgotPassword.bind(controller))

export default { basePath: '/auth', router }
