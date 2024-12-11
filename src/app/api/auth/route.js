import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database
        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with that email');
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        // Return user data (can include more fields if needed)
        return { email: user.email };
      }
    }),
  ],
  pages: {
    signIn: "/login", // Login page
    error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt", // JWT token-based session
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user; // Store user in session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
