import bcrypt from 'bcryptjs';
import { setLoginSession } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  // Initialize a new headers instance to manage cookies
  const headers = new Headers();

  if (req.method === 'POST') {
    const { email, password } = await req.json() || {};

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 401, headers }
      );
    }

    try {
      await connectDB();
      const user = await User.findOne({ email });

      if (!user) {
        return new Response(
          JSON.stringify({ message: 'Invalid email or password' }),
          { status: 401, headers }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ message: 'Invalid email or password' }),
          { status: 401, headers }
        );
      }

      // Generate the cookie header string from setLoginSession
      const sessionCookie = await setLoginSession(user);

      // Append the Set-Cookie header
      headers.append('Set-Cookie', sessionCookie);

      return new Response(
        JSON.stringify({ message: 'Login successful',username:user.username }),
        { status: 200, headers }
      );

    } catch (error) {
      console.error("Login error:", error);
      return new Response(
        JSON.stringify({ message: 'Internal server error' }),
        { status: 500, headers }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: 'Method Not Allowed' }),
      { status: 405, headers }
    );
  }
}
