// import { describe, it, expect } from 'vitest'
// import { MissingParamError } from '../../../../application/helpers'
// import { AuthController } from '../../../../application/controllers/Authentication/AuthController'

// const makeSut = (): AuthController => {
//   return new AuthController()
// }
// describe('Authentication controller', () => {
//   it('should return 400 if no email is provider', () => {
//     const sut = makeSut()
//     const httpRequest = {
//       body: {
//         // cpf: '379.447.578-00',
//         password: '12345678'
//       }
//     }
//     const httpResponse = sut.login(httpRequest)
//     expect(httpResponse.statusCode).toBe(400)
//     expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
//   })

//   it('should return 400 if no password is provider', () => {
//     const sut = makeSut()
//     const httpRequest = {
//       body: {
//         cpf: '379.447.578-00'
//         // password: '12345678'
//       }
//     }
//     const httpResponse = sut.login(httpRequest)
//     expect(httpResponse.statusCode).toBe(400)
//     expect(httpResponse.body).toEqual(new MissingParamError('password'))
//   })
// })
