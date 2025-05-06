// import { createTransport } from "nodemailer";

// const transporter = createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_FROM,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendResetEmail = async (to, token) => {
//   const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject: "Reset your password",
//     html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
//   });
// };