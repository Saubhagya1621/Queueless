import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { sendWelcomeEmail } from "../utils/mailer.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, phone, password });
    try {
      await sendWelcomeEmail(user.name, user.email);
    } catch (error) {
      console.log("Welcome email failed:", error.message);
    }

    const token = generateToken(
      user._id,
      user.role,
      user.serviceCenterId,
      user.counterId,
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none", // ← change lax to none
      secure: true, // ← change false to true (required when sameSite is none)
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        serviceCenterId: user.serviceCenterId || null,
        counterId: user.counterId || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(
      user._id,
      user.role,
      user.serviceCenterId,
      user.counterId,
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none", // ← change lax to none
      secure: true, // ← change false to true (required when sameSite is none)
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        serviceCenterId: user.serviceCenterId || null,
        counterId: user.counterId || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
