import { Container } from 'inversify'
import { AuthController } from '../../application/controllers/Authentication/AuthController'
import { UserController } from '../../application/controllers/User/UserController'
import { ProductController } from '../../application/controllers/Products/ProductsController'
import {
  IProductRepository,
  IUserRepository
} from '../../domain/interfaces/repositories'
import { UserRepository, ProductRepository } from '../data/repositories'
import {
  IAuthService,
  IUserService,
  IProductService,
  IEmailService
} from '../../domain/interfaces/services'
import {
  AuthService,
  EmailService,
  ProductService,
  UserService
} from '../../domain/services'
import {
  IUserController,
  IAuthController,
  IProductController
} from '../../domain/interfaces/controllers'

const container = new Container({ skipBaseClassChecks: true })

/* Repositories */
container.bind(IUserRepository).to(UserRepository)
container.bind(IProductRepository).to(ProductRepository)

/* Services */
container.bind(IAuthService).to(AuthService)
container.bind(IEmailService).to(EmailService)
container.bind(IUserService).to(UserService)
container.bind(IProductService).to(ProductService)

/* Controllers */
container.bind(IAuthController).to(AuthController)
container.bind(IUserController).to(UserController)
container.bind(IProductController).to(ProductController)

export default container
