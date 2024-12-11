import User from "@/models/User";
import connectDB from "@/lib/db";

export async function POST(req) {
    console.log("hello");
    const { username } = await req.json();
    console.log(username);

    try {
        connectDB();
        const user = await User.findOne({ username: username });

        if (!user) {
            // Return user not found response
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        // Select only relevant fields to send to the frontend
        const userData = {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePhoto: user.profilePhoto || "https://i.pinimg.com/736x/df/69/b7/df69b7a0f847a4785d71f3134a640f7d.jpg", // Default profile photo if none exists
            questionsSolved: user.questionsSolved,
            submissions: user.submissions,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        // Return the filtered user data with a 200 status
        return new Response(JSON.stringify(userData), { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);

        // Return a server error response
        return new Response(
            JSON.stringify({ message: "Server error" }),
            { status: 500 }
        );
    }
}


