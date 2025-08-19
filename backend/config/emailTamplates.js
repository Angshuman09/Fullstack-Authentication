export const FIRST_REGISTER= (name, verificationLink)=>`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome Email</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f4f4;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#000000; padding:20px;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">Angshuman Corporation</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0;">Hi ${name},</h2>
              <p style="font-size:16px; line-height:1.6;">
                Welcome to <strong>Angshuman Corporation</strong> 🎉  
                We’re excited to have you on board.  
              </p>
              <p style="font-size:16px; line-height:1.6;">
                Please verify your email to continue your journey with us.
              </p>
              
              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="${verificationLink}" 
                   style="background-color:#000000; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:6px; font-size:16px; font-weight:bold; display:inline-block;">
                  Verify Email
                </a>
              </div>
              
              <p style="font-size:14px; color:#777777; line-height:1.5;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#f4f4f4; padding:15px; font-size:12px; color:#888888;">
              © ${new Date().getFullYear()} Angshuman Corporation. All rights reserved.
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`


export const OTP_VERFICATION= (name,otp)=>`<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8"></head>
  <body style="font-family:Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:30px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      <h2 style="color:#000;">Hi ${name},</h2>
      <p style="font-size:16px;">Your One-Time Password (OTP) for verifying your account is:</p>
      <div style="text-align:center; margin:20px 0;">
        <p style="font-size:28px; font-weight:bold; letter-spacing:5px; color:#000;">${otp}</p>
      </div>
      <p style="font-size:14px; color:#777;">This OTP will expire in 10 minutes. Please do not share it with anyone.</p>
      <p style="font-size:12px; color:#aaa;">© ${new Date().getFullYear()} Angshuman Corporation. All rights reserved.</p>
    </div>
  </body>
</html>
`;


export const RESET_PASSWORD_OTP = (name, otp) => `
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8"></head>
  <body style="font-family:Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:30px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <h2 style="color:#000; text-align:center;">Password Reset Request</h2>
      
      <!-- Body -->
      <p style="font-size:16px;">Hi <strong>${name}</strong>,</p>
      <p style="font-size:16px;">We received a request to reset your password. Use the OTP below to proceed:</p>
      
      <div style="text-align:center; margin:20px 0;">
        <p style="font-size:28px; font-weight:bold; letter-spacing:5px; color:#000;">${otp}</p>
      </div>
      
      <p style="font-size:14px; color:#777;">This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
      
      <!-- Footer -->
      <p style="font-size:12px; color:#aaa; text-align:center; margin-top:30px;">
        © ${new Date().getFullYear()} Angshuman Corporation. All rights reserved.
      </p>
    </div>
  </body>
</html>
`;
