// lib/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function setLoginSession(user) {
  // Create JWT payload
  const payload = { email: user.email, username: user.username, id: user._id };

  // Generate JWT token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  // Return the cookie string to set on the response header
  return `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Strict`;
}
