import { transporter } from '../config/nodemailer'

interface IEmail {
  email: string
  name: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Confirma tu cuenta',
      text: 'Te invitamos a confirmar tu cuenta en UpTask para comenzar a utilizar nuestros servicios. Ingresa al siguiente enlace para confirmar tu cuenta',
      html: `
      <p>Hola: ${user.name}, has intentado crear una cuenta en UpTask, ya casi todo esta listo, solo debes confirmar tu cuenta</p>

      <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>

      <a href="${process.env.FRONDEND_URL}/auth/confirm-account">Confirmar cuenta</a>

      <p>E ingresa el código: <b>${user.token}</b></p>

      <p>Este Token expirará en <b>10 minutos</b>, en caso tal de no cumplir con el tiempo estimado, por favor generar otro Token</p>

      <p>Si no has solicitado la creación de una cuenta en UpTask, puedes ignorar este email</p>
      `,
    })
  }

  static sendPasswordResetToken = async (user: IEmail) => {
    await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Reestablece tu contraseña',
      text: 'Hemos recibido una solicitud para reestablecer tu contraseña en UpTask. Ingresa al siguiente enlace para reestablecer tu contraseña',
      html: `
      <p>Hola ${user.name}, has solicitado reestablecer tu contraseña</p>

      <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>

      <a href="${process.env.FRONDEND_URL}/auth/new-password">Reestablecer Contraseña</a>

      <p>E ingresa el código: <b>${user.token}</b></p>

      <p>Este Token expirará en <b>10 minutos</b>, en caso tal de no cumplir con el tiempo estimado, por favor generar otro Token</p>

      <p>Si no has solicitado la creación de una cuenta en UpTask, puedes ignorar este email</p>
      `,
    })
  }
}
