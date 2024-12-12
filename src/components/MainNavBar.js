"use client"
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout,setprobtopics } from "@/redux/userSlice";
import { useMouseTilt } from "@/hooks/useMouseTilt";

const MainNavbar = ({ onTopicsChange, topic}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [customSelected, setCustomSelected] = useState(topic);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const outlets = useSelector((state) => state.probtopics)
  // const islog = useSelector((state)=> state.isLoggedIn)

  const topics = [
    "Array",
    "String",
    "Linked List",
    "Tree",
    "Graph",
    "Stack",
    "Queue",
    "Trie",
    "Sorting",
    "Searching",
    "Hashing",
    "DP",
    "Divide and Conquer",
    "Greedy",
    "Backtracking",
  ];

  const toggleTopic = (topic) => {
    const updatedTopics = customSelected.includes(topic)
      ? customSelected.filter((t) => t !== topic)
      : [...customSelected, topic];

    setCustomSelected(updatedTopics);
    dispatch(setprobtopics(updatedTopics))
    onTopicsChange(updatedTopics);
  };

  const handleSelectAll = () => {
    setIsAllSelected(true);
    setCustomSelected(topics);
    onTopicsChange([]);
    dispatch(setprobtopics([]))
  };

  const handleSelectCustom = () => {
    setIsAllSelected(false);
    setCustomSelected([]);
    onTopicsChange([]);
  };

  const toggleProfileMenu = () => {
    // console.log(user,outlets,islog)
    setIsProfileMenuOpen((prev) => !prev);
  };


  function TiltedLoginButton({ gotonext }) {
    const tiltStyle = useMouseTilt(10); // Adds tilt effect with max tilt value
  
    return (
      <button
        style={tiltStyle}
        className="me-10 px-6 py-2 text-black bg-purple-600 font-bold border border-purple-400 rounded-md shadow-md hover:bg-purple-800 transform transition-all duration-300"
        onClick={gotonext}
      >
        Login
      </button>
    );
  }

  const gotonext = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    try {
      // Call the logout API to delete the cookie
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Optionally, clear any state related to the user (e.g., Redux state)
        dispatch(logout());
        window.location.href = "/";
        alert("logout")
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }



  return (
    <nav className="absolute top-0 left-0 w-full h-[10vh] z-10 p-4 bg-black text-white font-mono text-sm">
      {/* <pre className="border-t border-b border-gray-700"></pre> */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-purple-600"> {`>>`} TerminalCode</a>
        <div className="flex items-center gap-4">
          {onTopicsChange &&  <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-purple-600 text-black font-semibold rounded hover:bg-purple-500 transition shadow-md"
          >
            Edit Topics
          </button>}
          {isProfileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsProfileMenuOpen(false)} // Close when clicked
            ></div>
          )}
          {/* Profile Photo and Dropdown */}
          {(user?.name)?(<div className="relative">
            <img
              src="https://i.pinimg.com/736x/df/69/b7/df69b7a0f847a4785d71f3134a640f7d.jpg"
              alt="Profile"
              className="w-11 h-11 rounded-full cursor-pointer border border-purple-600 hover:opacity-85 transition-all"
              onClick={toggleProfileMenu}
            />
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-45 z-50 bg-black text-purple-600 border border-gray-700 rounded-md shadow-lg font-mono">
                <div className="p-3 bg-black">
                  <p className="text-xs">[ User Info ]</p>
                  <p className="text-sm font-bold">{user.email}</p>
                </div>
                <ul className="p-2 bg-black">
                  <li
                    className="py-1 px-3 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => router.push(`/u/${user.name}`)}
                  >
                    {">"} My Profile
                  </li>
                  <li
                    className="py-1 px-3 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => alert("Settings Clicked")}
                  >
                    {">"} Settings
                  </li>
                  <li
                    className="py-1 px-3 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => alert("Help & Support Clicked")}
                  >
                    {">"} Help & Support
                  </li>
                  <li
                    className="py-1 px-3 text-red-500 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={handleLogout}
                  >
                    {">"} Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>):(<TiltedLoginButton gotonext={gotonext} />)}

        </div>
      </div>

      {/* <pre className="border-t border-gray-700"></pre> */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] w-11/12 max-w-4xl rounded-md border border-gray-700 shadow-lg sm:w-4/5 md:w-2/3 lg:w-1/2">
            {/* Title Bar */}
            <div className="flex justify-between items-center bg-gray-800 text-gray-300 p-2 border-b border-gray-700">
              <span className="text-sm truncate">[ Console Window - Edit Topics ]</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-purple-600 transition"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 text-gray-300">
              <h2 className="text-lg font-bold mb-4 text-purple-600 text-center md:text-left">
                Edit Topics
              </h2>
              <pre className="border-t border-gray-700 overflow-x-hidden text-xs md:text-sm">
                {`-----------------------------[ Topic Selection ]-----------------------------`}
              </pre>
              <button
                onClick={handleSelectAll}
                className={`block w-full p-2 rounded text-left text-xs md:text-sm ${isAllSelected
                  ? "bg-purple-600 text-black"
                  : "bg-gray-800 hover:bg-gray-700"
                  } transition`}
              >
                Select All
              </button>
              <button
                onClick={handleSelectCustom}
                className={`block w-full p-2 rounded text-left text-xs md:text-sm mt-2 ${!isAllSelected
                  ? "bg-purple-600 text-black"
                  : "bg-gray-800 hover:bg-gray-700"
                  } transition`}
              >
                Select Custom
              </button>
              <pre className="border-t border-gray-700 mt-4 overflow-x-hidden text-xs md:text-sm">
                {`-----------------------------[ Available Topics ]----------------------------`}
              </pre>
              {!isAllSelected && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
                  {topics.map((topic) => (
                    <div
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`flex items-center justify-center p-1 rounded cursor-pointer text-xs ${customSelected.includes(topic)
                        ? "bg-purple-600 text-black"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end border-t border-gray-700 p-2 bg-gray-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-purple-600 text-black rounded hover:bg-purple-500 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default MainNavbar;
