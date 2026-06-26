import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = `QueueLess <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`;

export const sendWelcomeEmail = async (name, email) => {
  const result = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to QueueLess 🎉",
    html: `<h2>Welcome, ${name}!</h2>
           <p>Your QueueLess account has been created successfully.</p>
           <p>Skip the queues. Save your time.</p>`,
  });
};

export const sendTokenConfirmationEmail = async (
  name,
  email,
  tokenNumber,
  centerName,
  estimatedWait,
) => {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Token Confirmed 🎫",
    html: `<h2>Hello ${name},</h2>
           <ul>
             <li><strong>Token:</strong> #${tokenNumber}</li>
             <li><strong>Center:</strong> ${centerName}</li>
             <li><strong>Estimated Wait:</strong> ${estimatedWait} min</li>
           </ul>`,
  });
};

export const sendYourTurnEmail = async (
  name,
  email,
  tokenNumber,
  counterName,
  centerName,
) => {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "It's Your Turn! 🔔",
    html: `<h2>Hello ${name},</h2>
           <p>Your token is now being called.</p>
           <ul>
             <li><strong>Token:</strong> #${tokenNumber}</li>
             <li><strong>Counter:</strong> ${counterName}</li>
             <li><strong>Center:</strong> ${centerName}</li>
           </ul>
           <p>Please proceed immediately.</p>`,
  });
};