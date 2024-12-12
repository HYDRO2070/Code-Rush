"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "@/components/MainNavBar";

// Helper function to calculate time passed
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
    return `${Math.floor(seconds / 31536000)} years ago`;
}

export default function DashboardPage() {
    const [user, setUser] = useState(null); // State to store user data
    const [editing, setEditing] = useState(false); // State for edit mode
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        bio: "",
        profilePhoto: "",
    });
    const [errorUser, setErrorUser] = useState("");
    const reduxuser = useSelector((state) => state.user);
    // Extract the username from the URL
    const urlPath = window.location.pathname;
    const usernameFromUrl = urlPath.split("/")[2];
    const username= (usernameFromUrl); 

    // Fetch user data from the backend
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch("/api/user-info", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username }),
                });
                const data = await response.json();
                if (data.message) {
                    setErrorUser(data.message);
                } else {
                    setUser(data);
                    setFormData({
                        username: data.username,
                        email: data.email,
                        bio: data.bio,
                        profilePhoto: data.profilePhoto || "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setErrorUser("Failed to fetch user data. Please try again later.");
            }
        }
        console.log(usernameFromUrl,username)
        fetchUserData();
    }, [username]);

    // Return a loading state if the user data is not loaded yet
    if (user === null) {
        return <div className="text-purple-500 font-mono">Loading...</div>;
    }

    // Handle errors when fetching the user data
    if (errorUser) {
        return (
            <div className="text-gray-500 font-mono">
                <span className="text-red-500">Error:</span> {errorUser}
            </div>
        );
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission for editing user info
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user-info", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setEditing(false);
            } else {
                console.error("Failed to update user data");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    // Handle cancel button click
    const handleCancelEdit = () => {
        setEditing(false);
        setFormData({
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePhoto: user.profilePhoto || "",
        });
    };

    return (<>
        <MainNavbar/>
        <div className="h-[10vh]"></div>
        <div className="min-h-screen bg-black text-purple-500 font-mono p-6 flex flex-col md:flex-row gap-6">
            {/* Left Side: User Info */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
                <h2 className="text-3xl font-semibold mb-4">Profile</h2>
                <div className="flex flex-col items-center mb-4">
                    {/* Profile Image */}
                    {editing ? (
                        <div className="mb-4">
                            <label className="block text-sm mb-2">Profile Photo URL:</label>
                            <input
                                type="text"
                                name="profilePhoto"
                                value={formData.profilePhoto}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-black text-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    ) : user.profilePhoto ? (
                        <img
                            src={user.profilePhoto}
                            alt={`${user.username}'s profile`}
                            className="w-24 h-24 rounded-full border-4 border-green-700 object-cover mb-4"
                        />
                    ) : (
                        <img
                            src="https://i.pinimg.com/736x/df/69/b7/df69b7a0f847a4785d71f3134a640f7d.jpg"
                            alt="Default profile"
                            className="w-24 h-24 rounded-full border-4 border-green-700 object-cover mb-4"
                        />
                    )}
                    {/* User Info */}
                    {editing ? (
                        <form onSubmit={handleFormSubmit} className="text-purple-500 w-full">
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-black text-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-black text-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Bio:</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-black text-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-black font-semibold rounded hover:bg-purple-500 transition shadow-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="text-red-500 px-4 py-2 font-semibold rounded transition hover:shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-purple-500 w-full">
                            <p className="mb-2 text-lg">
                                <strong>Username:</strong> <span className="text-white">{user.username}</span>
                            </p>
                            <p className="mb-2">
                                <strong>Email:</strong> <span className="text-white">{user.email}</span>
                            </p>
                            <p className="mb-2">
                                <strong>Bio:</strong> <span className="text-white">{user.bio}</span>
                            </p>
                            <p className="mb-2">
                                <strong>Total Solved Problems:</strong> <span className="text-white">{user.solvedProblems ? user.solvedProblems.length : 0}</span>
                            </p>
                            <p className="mb-2">
                                <strong>Total Submissions:</strong> <span className="text-white">{user.submissions ? user.submissions.length : 0}</span>
                            </p>
                            {(reduxuser?.name === username) && (<button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-purple-600 text-black font-semibold rounded hover:bg-purple-500 transition shadow-md"
                            >
                                Edit Profile
                            </button>)}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Submissions and Solved Problems */}
            <div className="w-full md:w-2/3">
                {/* Solved Problems */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4">Solved Problems</h3>
                    {user.solvedProblems && user.solvedProblems.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {user.solvedProblems.slice(0, 7).map((problem, index) => (
                                <li key={index} className="mb-2">
                                    <strong>Problem:</strong> {problem.title} - <strong>Difficulty:</strong> {problem.difficulty}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No solved problems found.</p>
                    )}
                </div>

                {/* Submissions */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Submissions</h3>
                    {user.submissions && user.submissions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 text-left text-purple-500">Problem ID</th>
                                        <th className="px-4 py-2 text-left text-purple-500">Language</th>
                                        <th className="px-4 py-2 text-left text-purple-500">Status</th>
                                        <th className="px-4 py-2 text-left text-purple-500">Submission Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.submissions.slice(0, 7).map((submission, index) => (
                                        <tr key={index} className="hover:bg-gray-600">
                                            <td className="px-4 py-2">{submission.problemId}</td>
                                            <td className="px-4 py-2">{submission.language}</td>
                                            <td className="px-4 py-2">{submission.status}</td>
                                            <td className="px-4 py-2">{timeAgo(submission.submissionTime)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No submissions found.</p>
                    )}
                </div>

            </div>
        </div>
        </>
    );
}
