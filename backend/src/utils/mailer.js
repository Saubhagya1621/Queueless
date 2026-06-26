import SibApiV3Sdk from "@getbrevo/brevo";

const getClient = () => {
  const client = new SibApiV3Sdk.TransactionalEmailsApi();
  client.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;
  return client;
};

const FROM = { email: "noreply@queueless.in", name: "QueueLess" };

export const sendWelcomeEmail = async (name, email) => {
  const client = getClient();
  const mail = new SibApiV3Sdk.SendSmtpEmail();
  mail.to = [{ email }];
  mail.sender = FROM;
  mail.subject = "Welcome to QueueLess 🎉";
  mail.htmlContent = `<h2>Welcome, ${name}!</h2>
    <p>Your QueueLess account has been created successfully.</p>
    <p>Skip the queues. Save your time.</p>`;
  await client.sendTransacEmail(mail);
};

export const sendTokenConfirmationEmail = async (
  name, email, tokenNumber, centerName, estimatedWait
) => {
  const client = getClient();
  const mail = new SibApiV3Sdk.SendSmtpEmail();
  mail.to = [{ email }];
  mail.sender = FROM;
  mail.subject = "Token Confirmed 🎫";
  mail.htmlContent = `<h2>Hello ${name},</h2>
    <ul>
      <li><strong>Token:</strong> #${tokenNumber}</li>
      <li><strong>Center:</strong> ${centerName}</li>
      <li><strong>Estimated Wait:</strong> ${estimatedWait} min</li>
    </ul>`;
  await client.sendTransacEmail(mail);
};

export const sendYourTurnEmail = async (
  name, email, tokenNumber, counterName, centerName
) => {
  const client = getClient();
  const mail = new SibApiV3Sdk.SendSmtpEmail();
  mail.to = [{ email }];
  mail.sender = FROM;
  mail.subject = "It's Your Turn! 🔔";
  mail.htmlContent = `<h2>Hello ${name},</h2>
    <p>Your token is now being called.</p>
    <ul>
      <li><strong>Token:</strong> #${tokenNumber}</li>
      <li><strong>Counter:</strong> ${counterName}</li>
      <li><strong>Center:</strong> ${centerName}</li>
    </ul>
    <p>Please proceed immediately.</p>`;
  await client.sendTransacEmail(mail);
};