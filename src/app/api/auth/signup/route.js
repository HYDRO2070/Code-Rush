import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  const { username, email, password} = await req.json();

  // Check if email already exists
  await connectDB();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new Response(
      JSON.stringify({ message: 'Email already exists' }),
      { status: 400 }
    );
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const newUser = new User({ username, email, password: hashedPassword });
  console.log(newUser)
  await newUser.save();

  return new Response(
    JSON.stringify({ message: 'User created successfully' }),
    { status: 201 }
  );
}
