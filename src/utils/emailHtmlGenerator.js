const generateContactConfirmationHtml = ({ fullName, formName }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 30px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center; background-color: #f9f9f9;">
        <h2 style="color: #2c3e50; margin-bottom: 16px;">Hello <span style="color: #4CAF50;">${fullName}</span> 👋</h2>
        <p style="font-size: 15px; color: #333; margin: 8px 0;">We have received your message from the ${formName} form on <strong>MHJutt Portfolio</strong>.</p>
        <p style="font-size: 14px; color: #555; margin: 8px 0;">Thank you for reaching out! We appreciate your interest and will get back to you as soon as possible.</p>
        
        <div style="margin: 20px 0; background: #e8f5e9; padding: 12px; border-radius: 6px;">
          <p style="font-size: 14px; color: #1fad26ff; margin: 0;"><strong>This is a confirmation that your message was successfully delivered ✅</strong></p>
        </div>

        <p style="font-size: 14px; color: #333; margin-top: 20px;">Warm regards,</p>
        <p style="font-size: 15px; font-weight: bold; color: #2c3e50; margin: 5px 0;">MHJutt</p>
        <p style="font-size: 13px; color: #888; margin: 0;">Portfolio Developer & Engineer</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #888; margin: 0;">You received this email because you submitted a message on the ${formName} form of MHJutt Portfolio.</p>
    </div>
  `
}

export { generateContactConfirmationHtml }