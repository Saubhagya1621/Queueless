import fetch from "node:fetch";

const FROM = { email: "noreply@queueless.in", name: "QueueLess" };

const sendEmail = async (to, subject, htmlContent) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: FROM,
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }
};

export const sendWelcomeEmail = async (name, email) => {
  await sendEmail(
    email,
    "Welcome to QueueLess 🎉",
    `<h2>Welcome, ${name}!</h2>
     <p>Your QueueLess account has been created successfully.</p>
     <p>Skip the queues. Save your time.</p>`,
  );
};

export const sendTokenConfirmationEmail = async (
  name, email, tokenNumber, centerName, estimatedWait
) => {
  await sendEmail(
    email,
    "Token Confirmed 🎫",
    `<h2>Hello ${name},</h2>
     <ul>
       <li><strong>Token:</strong> #${tokenNumber}</li>
       <li><strong>Center:</strong> ${centerName}</li>
       <li><strong>Estimated Wait:</strong> ${estimatedWait} min</li>
     </ul>`,
  );
};

export const sendYourTurnEmail = async (
  name, email, tokenNumber, counterName, centerName
) => {
  await sendEmail(
    email,
    "It's Your Turn! 🔔",
    `<h2>Hello ${name},</h2>
     <p>Your token is now being called.</p>
     <ul>
       <li><strong>Token:</strong> #${tokenNumber}</li>
       <li><strong>Counter:</strong> ${counterName}</li>
       <li><strong>Center:</strong> ${centerName}</li>
     </ul>
     <p>Please proceed immediately.</p>`,
  );
};