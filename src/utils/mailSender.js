import nodemailer from "nodemailer"

const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMPT_PASS
      }
    })

    const mailOptions = {
      from: `"Mustansar Gill" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    }

    const response = await transporter.sendMail(mailOptions)

    if (response.accepted.length > 0) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error("Error ", err)
    return false
  }
}

export { sendMail }