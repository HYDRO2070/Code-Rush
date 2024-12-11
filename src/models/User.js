import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role-based access control
    profilePicture: { type: String, default: '' }, // Optional profile picture URL
    bio: { type: String, default: 'Hello World...' }, // User bio or description
    solvedProblems: { type: [String], default: [] }, // List of problem IDs the user has solved
    submissions: [
      {
        problemId: { type: String, required: true }, // Problem ID
        language: { type: String, required: true }, // Language used for the solution
        status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Runtime Error'], required: true },
        submissionTime: { type: Date, default: Date.now }, // Time of submission
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically handle `createdAt` and `updatedAt`
);

// Export the model
export default mongoose.models.User || mongoose.model('User', UserSchema);
