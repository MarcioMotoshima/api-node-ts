// import { describe, it, expect, vitest } from 'vitest'
// import { IEmailValidator } from '../../../../infra/validators'
// import { InvalidParamError, ServerError } from '../../../../application/helpers'
// import { UserController } from '../../../../application/controllers/User/UserController'
// import { CreateUserDTO } from '../../../../domain/DTO'

// interface ISut {
//   sut: UserController
//   emailValidatorStub: IEmailValidator
// }

// // const makeAddAcount = (): CreateUserDTO => {
// //   class AddAcountStub implements CreateUserDTO {
// //     create(account: any): boolean {
// //       return true
// //     }
// //   }
// //   return new EmailValidatorStub()
// // }

// const makeEmailValidator = (): IEmailValidator => {
//   class EmailValidatorStub implements IEmailValidator {
//     isValid(email: string): boolean {
//       return true
//     }
//   }
//   return new EmailValidatorStub()
// }

// const makeSut = (): ISut => {
//   const emailValidatorStub = makeEmailValidator()
//   const sut = new UserController(emailValidatorStub)
//   return {
//     sut,
//     emailValidatorStub
//   }
// }
// describe('UserController', () => {
//   it('should return 400 if no some parans is no provider', () => {
//     const { sut } = makeSut()
//     const httpRequest = {
//       body: {
//         name: 'Marcio Motoshima',
//         cpf: '379.447.578-00',
//         password: '12345678',
//         passwordConfirmation: '12345678'
//       }
//     }
//     const httpResponse = sut.create(httpRequest)
//     expect(httpResponse.statusCode).toBe(400)
//     expect(httpResponse.body).toEqual(new InvalidParamError('email'))
//   })
//   it('should return 400 if email is invalid', () => {
//     const { sut, emailValidatorStub } = makeSut()
//     vitest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
//     const httpRequest = {
//       body: {
//         name: 'Marcio Motoshima',
//         cpf: '379.447.578-00',
//         email: 'marcio.motoshima@gmail.com',
//         password: '12345678',
//         passwordConfirmation: '12345678'
//       }
//     }
//     const httpResponse = sut.create(httpRequest)
//     expect(httpResponse.statusCode).toBe(400)
//     expect(httpResponse.body).toEqual(new InvalidParamError('email'))
//   })

//   it('should call emailvalidator with correct email', () => {
//     const { sut, emailValidatorStub } = makeSut()
//     const isValidSpy = vitest.spyOn(emailValidatorStub, 'isValid')
//     const httpRequest = {
//       body: {
//         name: 'Marcio Motoshima',
//         cpf: '379.447.578-00',
//         email: 'marcio.motoshima@gmail.com',
//         password: '12345678',
//         passwordConfirmation: '12345678'
//       }
//     }
//     sut.create(httpRequest)
//     expect(isValidSpy).toHaveBeenCalledWith('marcio.motoshima@gmail.com')
//   })

//   it('should return 500 if email email EmailValidator throws', () => {
//     const { sut, emailValidatorStub } = makeSut()
//     vitest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
//       throw new Error()
//     })
//     const httpRequest = {
//       body: {
//         name: 'Marcio Motoshima',
//         cpf: '379.447.578-00',
//         email: 'any.motoshima@gmail.com',
//         password: '12345678',
//         passwordConfirmation: '12345678'
//       }
//     }
//     const httpResponse = sut.create(httpRequest)
//     expect(httpResponse.statusCode).toBe(500)
//     expect(httpResponse.body).toEqual(new ServerError())
//   })
//   it('should return 400 if passwordConfirmation fails', () => {
//     const { sut } = makeSut()
//     const httpRequest = {
//       body: {
//         name: 'Marcio Motoshima',
//         cpf: '379.447.578-00',
//         email: 'any.motoshima@gmail.com',
//         password: '12345678',
//         passwordConfirmation: '123'
//       }
//     }
//     const httpResponse = sut.create(httpRequest)
//     expect(httpResponse.statusCode).toBe(400)
//     expect(httpResponse.body).toEqual(
//       new InvalidParamError('passwordConfirmation')
//     )
//   })

//   // it('should call addAcount with correct values', () => {
//   //   const { sut, addAcountStub } = makeSut()
//   //   const addSpy = vitest.spyOn(addAcountStub, 'create')
//   //   const httpRequest = {
//   //     body: {
//   //       name: 'Marcio Motoshima',
//   //       cpf: '379.447.578-00',
//   //       email: 'marcio.motoshima@gmail.com',
//   //       password: '12345678',
//   //       passwordConfirmation: '12345678'
//   //     }
//   //   }
//   //   sut.create(httpRequest)
//   //   expect(addSpy).toHaveBeenCalledWith({
//   //     name: 'Marcio Motoshima',
//   //     cpf: '379.447.578-00',
//   //     email: 'marcio.motoshima@gmail.com',
//   //     password: '12345678'
//   //   })
//   // })
// })
