import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.NUXT_MAILTRAP_HOST,
  port: Number(process.env.NUXT_MAILTRAP_PORT),
  auth: {
    user: process.env.NUXT_MAILTRAP_USER,
    pass: process.env.NUXT_MAILTRAP_PASS
  }
})
