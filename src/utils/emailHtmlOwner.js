const generateOwnerNotificationHtml = ({ fullName, email, formName, subject, message }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 30px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fdfdfd;">
        <h2 style="color: #2c3e50; margin-bottom: 16px;">📩 New Contact Form Submission</h2>
        <p style="font-size: 15px; color: #333; margin: 8px 0;">
          A new message has been submitted via the <strong>${formName}</strong> form on <strong>MHJutt Portfolio</strong>.
        </p>
        <div style="margin: 20px 0; padding: 15px; border-radius: 6px; background-color: #f9f9f9; border: 1px solid #eee; text-align: left;">
          <p style="margin: 6px 0; font-size: 14px; color: #444;">
            <strong>Name:</strong> ${fullName}
          </p>
          <p style="margin: 6px 0; font-size: 14px; color: #444;">
            <strong>Email:</strong> <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a>
          </p>
          <p style="margin: 6px 0; font-size: 14px; color: #444;">
            <strong>Subject:</strong> ${subject}
          </p>
          <p style="margin: 12px 0; font-size: 14px; color: #444; line-height: 1.6;">
            <strong>Message:</strong><br>
            ${message}
          </p>
        </div>
        <p style="font-size: 13px; color: #666; margin-top: 20px;">
          You are receiving this notification because someone contacted you through your portfolio website.
        </p>
    </div>
  `
}

export { generateOwnerNotificationHtml }