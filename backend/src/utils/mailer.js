import nodemailer from "nodemailer";

const getTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendWelcomeEmail = async (name, email) => {
  await getTransporter().sendMail({
    from: `"QueueLess" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to QueueLess 🎉",
    html: `<h2>Welcome, ${name}!</h2><p>Your QueueLess account has been created successfully.</p><p>Skip the queues. Save your time.</p>`,
  });
};

export const sendTokenConfirmationEmail = async (
  name,
  email,
  tokenNumber,
  centerName,
  estimatedWait,
) => {
  await getTransporter().sendMail({
    from: `"QueueLess" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Token Confirmed 🎫",
    html: `<h2>Hello ${name},</h2><ul><li><strong>Token:</strong> #${tokenNumber}</li><li><strong>Center:</strong> ${centerName}</li><li><strong>Estimated Wait:</strong> ${estimatedWait} min</li></ul>`,
  });
};

export const sendYourTurnEmail = async (
  name,
  email,
  tokenNumber,
  counterName,
  centerName,
) => {
  await getTransporter().sendMail({
    from: `"QueueLess" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "It's Your Turn! 🔔",
    html: `<h2>Hello ${name},</h2><p>Your token is now being called.</p><ul><li><strong>Token:</strong> #${tokenNumber}</li><li><strong>Counter:</strong> ${counterName}</li><li><strong>Center:</strong> ${centerName}</li></ul><p>Please proceed immediately.</p>`,
  });
};
