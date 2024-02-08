import { Router } from 'express'
import Container from '../../../infra/ioc'
import IProductController from '../../../domain/interfaces/controllers/IProductController'

const controller = Container.get(IProductController)
const router = Router()

router.get('/list', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/upsert', controller.upsert.bind(controller))
router.delete('/:id', controller.delete.bind(controller))

export default { basePath: '/product', router }
