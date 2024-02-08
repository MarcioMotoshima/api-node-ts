import { Router } from 'express'
import Container from '../../../infra/ioc'
import IUserController from '../../../domain/interfaces/controllers/IUserController'
import IsAdminMiddleware from '../../middlewares/IsAdminMiddleware'

const controller = Container.get(IUserController)
const router = Router()
// router.use(IsAdminMiddleware)

router.get('/', IsAdminMiddleware, controller.list.bind(controller))
router.get('/:id', IsAdminMiddleware, controller.getById.bind(controller))
router.post(
  '/get-by-cpf',
  IsAdminMiddleware,
  controller.getByCPF.bind(controller)
)
router.post(
  '/get-by-email',
  IsAdminMiddleware,
  controller.getByEmail.bind(controller)
)
router.post(
  '/transaction',
  IsAdminMiddleware,
  controller.transaction.bind(controller)
)
router.post(
  '/createAdmin',
  IsAdminMiddleware,
  controller.createAdmin.bind(controller)
)
router.post('/', controller.create.bind(controller))
router.put('/', IsAdminMiddleware, controller.update.bind(controller))

export default { basePath: '/user', router }
