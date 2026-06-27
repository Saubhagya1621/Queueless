import { sendContactFormEmail } from "../utils/mailer.js";

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    await sendContactFormEmail(name, email, message);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { sendContactEmail };