import { clientBaseUrl, emailName, fromEmail } from "../config/config.js";
import { sendMail } from "../utils/sendMail.js";
import { createActivationToken } from '../utils/token.js'; // Import your createActivationToken function

// export const sendEmailToVerify = async ({ email, token, firstName, lastName }) => {
//   // let link = `${clientBaseUrl}/signup/verify/?token=${token}`
//   let link=`https://staging.newachulo.com/signup/verify/?token=${token}`

//   const html = `
//     <div style="background: lightgray; padding: 20px; margin: 30px;">
//     <div style="background: #fff; padding: 20px">
//       <br><br> 
//       Dear ${firstName} ${lastName}, <br>
//       To verify your email, please click on below button: <br>
//       <div style="text-align:center; margin-top: 15px;">
//         <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Verify Email</a>
//       </div>
//       <br> <br>
//       if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
//     </div>

//   </div>
//     `;

//   await sendMail({
//     from: `"${emailName}" <${fromEmail}>`,
//     to: [email],
//     subject: "Email verification",
//     html
//   });
// }


export const sendEmailToVerify = async ({ email, firstName, lastName }) => {
  // Generate token and activation code
  const { token, activationCode } = createActivationToken({ email, firstName, lastName });

  const link = `${clientBaseUrl}/signup/verify/?token=${token}`;

  const html = `
    <div style="background: lightgray; padding: 20px; margin: 30px;">
      <div style="background: #fff; padding: 20px;">
        <br><br> 
        Dear ${firstName} ${lastName}, <br><br>

        <p>We received a request to activate your account. To activate your account, please use the following activation code:</p>

        <h2 style="color: #0070f3;">${activationCode}</h2>
        

        <div style="text-align: center; margin-top: 15px;">
          <a 
            style="background-color: #FFC43E; padding: 10px 20px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" 
            href="${link}">Verify Email</a>
        </div>
        
        <br><br>

        <p>If you didn't request this, please ignore this email. If you did not register for an E-Learning account, please ignore this email as well.</p>

        <p>Your email: ${email}</p>

        <p>If the above button does not work, please click on the link below:</p>
        <p><a href="${link}">${link}</a></p>

        <br><br>

        <div style="background-color: #f6f6f6; padding: 20px;">
          <p>If you have any questions, please don't hesitate to contact us at 
            <a href="mailto:support@learning.com">support@learning.com</a>.
          </p>
        </div>
      </div>
    </div>
  `;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Email Verification",
    html,
  });
};

  

export const sendEmailToForgotPassword = async ({
  email,
  token,
  firstName,
  lastName
}) => {
  let link = `${clientBaseUrl}/resetPassword/?token=${token}`;
  const html = `
  <div style="background: lightgray; padding: 20px; margin: 30px;">
    <div style="background: #fff; padding: 20px">
      <br><br> 
      Dear ${firstName} ${lastName}, <br>
      To reset your password, please click on below button: <br>
      <div style="text-align:center; margin-top: 15px;">
        <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Reset Password</a>
      </div>
      <br> <br>
      if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
    </div>

  </div>
`;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Forgot Password",
    html
  });
}

export const sendConfirmationEmail = async({ order, firstName, lastName}) =>{
  const html = `
  <p>{firstName} ${lastName},</p>
  <p>Thank you for your order. Your order has been confirmed with the following details:</p>
  <p>Order ID: ${order.orderId}</p>
  <p>Total Amount: $${order.total.toFixed(2)}</p>
  <p>Delivery Address: ${order.deliveryAddress}</p>
  <p>For any inquiries, please contact us at support@example.com.</p>
  <p>Best regards,</p>
  <p>Your Company Name</p>
  `
  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Order Confirmation",
    html
  });

}