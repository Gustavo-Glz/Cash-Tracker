export const authEmail = async (email: string, name: string, tokenGenerated: string) => {
  await transporter.sendMail({
    from: 'Cash Tracker <admin@cash-tracker.com>',
    to: email,
    subject: 'Cash Tracker - Código de verificación',
    html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2>Hola, ${name} has creado una cuenta en Cash Tracker</h2>
          <p>Tu código de verificación es:</p>
          <div style="font-size: 2rem; font-weight: bold; letter-spacing: 8px; color: #4f46e5;">
            ${tokenGenerated}
          </div>
        </div>
      `
  })
}
