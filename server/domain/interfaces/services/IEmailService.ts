import { ForgotPasswordEmailDto, RegisterEmailDto } from '../../DTO'

export default abstract class IEmailService {
  abstract register(data: RegisterEmailDto): Promise<boolean>
  abstract forgotPassword(data: ForgotPasswordEmailDto): Promise<boolean>
}
