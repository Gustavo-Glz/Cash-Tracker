export const forgotPasswordEmail = async (email: string, name: string, tokenGenerated: string) => {
  await transporter.sendMail({
    from: 'Cash Tracker <admin@cash-tracker.com>',
    to: email,
    subject: 'Cash Tracker - Recuperar contraseña',
    html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2>Hola, ${name} has solicitado recuperar la contraseña de tu cuenta en Cash Tracker. Usa tu código de verificación para restablecerla.</h2>
          <p>Tu código de verificación es:</p>
          <div style="font-size: 2rem; font-weight: bold; letter-spacing: 8px; color: #4f46e5;">
            ${tokenGenerated}
          </div>
          <p>Ingresa el código en el siguiente enlace:</p>
          <a href="${process.env.NUXT_FRONTEND_URL}/new-password"
             style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px;">
            Nueva contraseña
          </a>
          <p style="color: #6b7280; font-size: 0.875rem;">Si no creaste esta cuenta, ignora este correo.</p>
        </div>
      `
  })
}
