"use client";
import React, { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import MainNavbar from "@/components/MainNavBar";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Question_plain from "@/components/Question_plain";
import { useSelector } from "react-redux";
import { button } from "@nextui-org/react";



function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [activeTab, setActiveTab] = useState(1); // 1: Editor Tab, 2: Run Tab
  const [loading, setLoading] = useState(false); // Track if a response is being awaited
  const [error, setError] = useState(null); // Track errors
  const [output, setOutput] = useState(null); // Track output results
  const [selectedExample, setSelectedExample] = useState(null);
  const [topic, settopic] = useState([])
  const [exnumber, setexnumber] = useState(0)
  const [isSlideVisible, setIsSlideVisible] = useState(false);
  const [ferror, setfError] = useState(null);
  const [foutput, setfOutput] = useState(null);
  const chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"];
  const [loadingCharIndex, setLoadingCharIndex] = useState(0);
  const [submitcode, setsubmitcode] = useState(false)
  const [problemObject, setproblemObject] = useState(null)
  const [code, setCode] = useState('');
  const [proerror, setproerror] = useState('')
  const pretopics = useSelector((state) => state.probtopics)
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        // const pretopics = useSelector((state) => state.probtopics)
        console.log(pretopics)
        settopic(pretopics)
        const response = await fetch(`/api/random-question`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({topic : pretopics}),
      }); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch problem data');
        }
        const data = await response.json();

        setproblemObject(data); // Set the fetched data to the problemObject state
      } catch (error) {
        console.error("Error fetching problem data:", error);
        setproerror("Error fetching problem data")
      }
    };
    fetchProblemData();
  }, []); // The empty dependency array ensures this runs only once when the component mounts


  useEffect(() => {
    if (problemObject != null) {

      setCode(problemObject.defaultClass["cpp"])
      // console.log(problemObject)
    }
  }, [problemObject])



  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    console.log(topic)
    // Show confirmation popup
    if (window.confirm("Switching the language will reset your code. Do you want to proceed?")) {
      setSelectedLanguage(newLanguage); // Change language
      setCode(problemObject.defaultClass[newLanguage]); // Reset editor code
    } else {
      // Revert dropdown to the previous language
      event.target.value = selectedLanguage;
    }
  };

  const handleSubmitCode = async () => {
    if (!code.trim()) {
      setError("Code cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setfOutput(null); // Clear previous data
    setsubmitcode(true)

    // Show the slide
    setIsSlideVisible(true);

    // Start the character animation
    const charInterval = setInterval(() => {
      setLoadingCharIndex(prevIndex => (prevIndex + 1) % chars.length);
    }, 100);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/submit-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          problemId : problemObject.title,
          code,
          language: selectedLanguage,
          bottomclass: problemObject.defaultBottomSubmit[selectedLanguage],
          selectedExample: problemObject.testCases[2].input[selectedLanguage],
        }),
        signal: controller.signal,
      });

      const result = await response.json();

      if (response.ok) {
        // Update response data and hide the loader

        setfOutput(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // Handle request timeout
        setError("Request timed out. Please try again.");
      } else {
        console.log(err)
        setError("An error occurred while communicating with the server.");
      }
    } finally {
      setLoading(false);
      clearTimeout(timeoutId);
      clearInterval(charInterval); // Stop the animation once done
      setsubmitcode(false)
    }
  };

  const handleRunCode = async () => {
    // Check if code is empty
    if (!code.trim()) {
      setError("Code cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);
    setsubmitcode(false)

    // Initialize the AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // Set timeout for 10 seconds

    try {
      const response = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          bottomclass: problemObject.defaultBottomRun[selectedLanguage],
          selectedExample: problemObject.testCases[exnumber].input[selectedLanguage],
        }),
        signal: controller.signal, // Attach the signal for timeout handling
      });

      // Parse the response
      const result = await response.json();

      if (response.ok) {
        // Successful output
        setOutput(result.output);
      } else if (result.error) {
        // Execution server returned an error
        setError(result.error);
      } else {
        // Generic error
        setError("An unknown error occurred while running the code.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // Handle request timeout
        setError("Request timed out. Please try again.");
      } else {
        // Handle other types of errors
        console.error("Network error:", err);
        setError("An error occurred while communicating with the server.");
      }
    } finally {
      // Cleanup the timeout and loading state
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleexample = (e, i) => {
    setSelectedExample(e);
    // console.log()
    setexnumber(i)
    // console.log(problemObject.testCases[exnumber].input[selectedLanguage])
    // console.log(exnumber)
  }



  if (problemObject === null) {
      return <div className='w-full h-full flex justify-center items-center text-purple-500 text-[20px]'>{proerror ? proerror : "Loading..."}</div>; // Render a loading indicator while waiting for data
  }

  return (
    <>
      <MainNavbar onTopicsChange={settopic} topic={topic} />
    <div className="h-[10vh]"></div>
      <div className="p-2 text-gray-300 bg-[#000000] min-h-[90%] flex flex-col lg:flex-row gap-4">

        {/* Question Section */}
        <div
          className="lg:w-1/2 w-full max-h-[87vh] border rounded-md p-4 bg-[#000000] flex-1 font-mono text-sm overflow-y-scroll break-words gray-300space-normal"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Question_plain problemObject={problemObject} />
        </div>

        {/* Right Side Section with Tabs */}
        <div className="lg:w-1/2 w-full h-[87vh] border rounded-md bg-[#000000] relative overflow-x-hidden">
          {/* Tabs for Editor and Run Environment */}
          <div className="h-[86vh] p-4 font-mono flex-1  text-sm">
          <div className="mb-4 flex flex-row flex-wrap gap-y-3">
            <button
              className={`inline-block px-3 py-1 rounded-md text-gray-300 mr-2 ${activeTab === 1
                ? "bg-purple-600"
                : "bg-[#3C3C3C] hover:bg-[#4C4C4C]"}`
              }
              onClick={() => setActiveTab(1)}
            >
              Editor
            </button>
            <button
              className={`inline-block px-3 py-1 rounded-md text-gray-300 ${activeTab === 2
                ? "bg-purple-600"
                : "bg-[#3C3C3C] hover:bg-[#4C4C4C]"}`
              }
              onClick={() => setActiveTab(2)}
            >
              Run Environment
            </button>
            <span className="ml-4">Select Language:</span>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-purple-700 text-gray-300 p-2 rounded-md ml-2"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="js">JavaScript</option>
            </select>
          </div>

          {/* Code Editor (visible only for Editor tab) */}
          {activeTab === 1 && (
            <CodeEditor code={code} setCode={setCode} />
          )}

          {/* Run and Submit Buttons (visible only for Run Environment tab) */}
          {activeTab === 2 && (
            <>
              <div className="flex items-center flex-row gap-2">
                {problemObject.examples.map((example, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-3 py-1 rounded-md mb-2 bg-[#3C3C3C] hover:bg-[#4C4C4C] transition"
                    onClick={() => handleexample(example, index)} // Set selected example
                  >
                    <span className="text-gray-300 font-medium">Case {index + 1}</span>
                  </div>
                ))}
              </div>

              {/* Display Selected Example */}
              {selectedExample && (
                <div className="bg-black p-3 rounded-md border border-gray-700 mt-4">
                  <div>
                    <span className="text-gray-300">Input:</span>{" "}
                    <span className="text-gray-400">{selectedExample.input}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">Expected Output:</span>{" "}
                    <span className="text-blue-500">{selectedExample.output}</span>
                  </div>
                </div>
              )}

              {/* Conditional Output/Error Display */}
              {(error || output) && (
                <div className="bg-black text-gray-300 border border-gray-700 mt-4 p-3 rounded-md max-h-[200px] overflow-y-auto break-words whitespace-normal scrollbar-hidden">
                  {error ? (
                    <div className="text-red-500">Error: {error}</div>
                  ) : (
                    <div className="text-green-500">Output: {output}</div>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleRunCode}
                  className={`bg-purple-600 px-4 py-2 rounded-md text-gray-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  Run Code
                </button>
                <button
                  onClick={handleSubmitCode}
                  className={`bg-purple-600 px-4 py-2 rounded-md text-gray-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  Submit Code
                </button>
              </div>
            </>
          )}{/* Sliding Panel for Output Details */}


          {isSlideVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSlideVisible(false)} // Close when clicked
            ></div>
          )}

          <div
            className={`slide-panel ${isSlideVisible ? "slide-in" : ""} font-mono z-50`}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setIsSlideVisible(false)}
              className="text-gray-400 hover:text-purple-600 transition absolute top-2 left-2"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Loader Animation */}
            {(!foutput && submitcode) ? (<div className="loader flex justify-center items-center w-full h-full text-purple-400 text-[30px]">
              <span className="font-bold">{chars[loadingCharIndex]}</span>
            </div>) : (!foutput && !submitcode && (<div className="flex flex-col justify-center items-center w-full h-full text-purple-400 text-[15px] font-mono">
              <span className="font-bold">No Submission Found</span>
            </div>))
            }


            {foutput && (
              <div className="p-4 text-gray-300 pt-7">
                <h3 className="font-bold text-lg">Execution Details</h3>
                <div>
                  <span className="text-gray-500">Test Results: </span>
                  <span className={foutput.result === "failed" ? "text-red-500" : "text-green-500"}>
                    {foutput.failedTestCase ? foutput.failedTestCase : problemObject.NoOfTestCase}
                  </span>/{problemObject.NoOfTestCase}
                </div>
                <div>
                  <span className="text-gray-500">Output Details:</span> {foutput.result || "No details available"}
                </div>
                <div>
                  <span className="text-gray-500">Execution Time:</span> <span className="text-purple-600">{foutput.executionTime || "N/A"}</span> seconds
                </div>
                <div>
                  <span className="text-gray-500">Memory Usage:</span> <span className="text-purple-600">{foutput.memoryUsage || "N/A"}</span> bytes
                </div>
                {foutput.error && (
                  <div className="bg-black text-gray-300 mt-4 p-3 rounded-md max-h-80 overflow-y-auto break-words whitespace-normal scrollbar-hidden"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <span className="font-bold text-red-500">Error: {foutput.error}</span>
                  </div>
                )}
                {foutput.result !== "failed" && (
                  <button
                  className="mt-5 px-4 py-2 bg-purple-600 text-black font-semibold rounded hover:bg-purple-500 transition shadow-md"
                >
                 Next{"??"}
                </button>
                )}
              </div>
            )}


          </div>
          {!isSlideVisible && (<button
            onClick={() => setIsSlideVisible(true)}
            className="text-white transition rounded-md p-2 absolute top-4 right-4 bg-[#3C3C3C] hover:bg-[#4C4C4C]"
          >
            {"<"}
          </button>)}
          </div>
        </div>
      </div>



      <style jsx>{`
  .slide-panel {
    position: absolute;
    top: 0;
    right: -400px; /* Move completely off-screen */
    width: 350px;
    height: 96%;
    background-color: #222;
    transition: right 1s; /* Only animate the 'right' property */
    margin: 13px; /* Padding instead of margin */
    border-radius: 10px;
    transition-timing-function: ease-in-out;
  }

  .slide-in {
    right: 0; /* Slide into view */
  }
`}</style>
    </>
  );

}

export default Page;
