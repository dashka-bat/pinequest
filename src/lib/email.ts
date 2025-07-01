// import nodemailer from 'nodemailer';

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Company" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// };
export const sendEmail = async (to: string, subject: string, text: string) => {
  const res = await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, text }),
  });

  const data = await res.json();
  return data;
};
