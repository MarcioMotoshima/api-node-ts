import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import Hogan from 'hogan.js'
import { IEmailService } from '../interfaces/services'
import { ForgotPasswordEmailDto, RegisterEmailDto } from '../DTO'
import { injectable } from 'inversify'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
dotenv.config()
@injectable()
export default class EmailService extends IEmailService {
  createTrasport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      host: String(process.env.EMAIL_HOST),
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      }
    })
  }

  async register(data: RegisterEmailDto): Promise<boolean> {
    try {
      const template = fs.readFileSync(
        __dirname + '/../../infra/templates/register.hbs',
        'utf-8'
      )
      const LoadTemplate = Hogan.compile(template)
      const transporter = this.createTrasport()
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: data.email,
        subject: 'Cadastro FIDELIZARTE',
        html: LoadTemplate.render({
          name: data.name,
          password: data.password
        })
      }
      const send = await transporter.sendMail(mailOptions)
      return send ? true : false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async forgotPassword(data: ForgotPasswordEmailDto): Promise<boolean> {
    try {
      const template = fs.readFileSync(
        __dirname + '/../../infra/templates/forgotPassword.hbs',
        'utf-8'
      )
      const LoadTemplate = Hogan.compile(template)
      const transporter = this.createTrasport()
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: data.email,
        subject: 'Recuperação de senha FIDELIZARTE',
        html: LoadTemplate.render({
          name: data.name,
          link: data.link
        })
      }
      const send = await transporter.sendMail(mailOptions)
      return send ? true : false
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
