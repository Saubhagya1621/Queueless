import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { sendWelcomeEmail } from "../utils/mailer.js";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL,
);

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
      console.log("Welcome email failed:", error.message, error);
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
      sameSite: "none",
      secure: true,
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

    // This account was created via Google Sign-In and has no password set.
    // bcryptjs.compare() would crash on an undefined hash, so check first
    // and return a clear, actionable message instead.
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google Sign-In. Please continue with Google.",
      });
    }

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
      sameSite: "none",
      secure: true,
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
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Step 1: redirect the browser to Google's consent screen
const googleAuth = (req, res) => {
  const authUrl = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "consent",
  });
  res.redirect(authUrl);
};

// Step 2: Google redirects back here with a `code` query param
const googleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
    }

    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
      });

      try {
        await sendWelcomeEmail(user.name, user.email);
      } catch (error) {
        console.log("Welcome email failed:", error.message, error);
      }
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
      sameSite: "none",
      secure: true,
    });

    res.redirect(`${process.env.FRONTEND_URL}/home`);
  } catch (error) {
    console.log("Google auth callback failed:", error.message, error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
  }
};

// Returns the currently logged-in user based on the JWT cookie.
// Used by the frontend on app load to restore login state
// (needed for Google OAuth flow, since it doesn't go through handleLogin in Login.jsx)
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
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

export { registerUser, loginUser, logoutUser, googleAuth, googleAuthCallback, getMe };