export const registerEmail = async (email: string, name: string, tokenGenerated: string) => {
  await transporter.sendMail({
    from: 'Cash Tracker <admin@cash-tracker.com>',
    to: email,
    subject: 'Cash Tracker - Crear cuenta',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Hola, ${name}</h2>
        <p>Has creado una cuenta en Cash Tracker. Usa el siguiente código para activarla:</p>
        <div style="font-size: 2rem; font-weight: bold; letter-spacing: 8px; color: #4f46e5;">
          ${tokenGenerated}
        </div>
        <p>Ingresa el código en el siguiente enlace:</p>
        <a href="${process.env.NUXT_FRONTEND_URL}/confirm-account"
           style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px;">
          Confirmar cuenta
        </a>
        <p style="color: #6b7280; font-size: 0.875rem;">Si no creaste esta cuenta, ignora este correo.</p>
      </div>
    `
  })
}
