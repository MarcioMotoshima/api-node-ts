import { ForgotPasswordDto, LoginDTO } from "../../DTO/Authentication";

export default abstract class IAuthService {
  abstract login(data: LoginDTO): Promise<any>
  abstract forgotPassword(data: ForgotPasswordDto): Promise<any>
}
