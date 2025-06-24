import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
    try {
        console.log("Received request");

        const { user,problemId , code, language, bottomclass, selectedExample } = await req.json();
        console.log(user)
        // Validate that selectedExample is provided
        if (!selectedExample) {
            return new Response(JSON.stringify({ error: "Invalid or missing case input" }), { status: 400 });
        }

        // Replace the placeholder in the bottomclass with the selected example
        const customizedBottomClass = bottomclass.replace("?Customvariable?", selectedExample);

        // Wrap the code based on the selected language
        const fullCode = wrapCodeForLanguage(code, language, customizedBottomClass);

        console.log("Full code to execute:\n", fullCode);

        // Send the code to the Docker server for execution
        const dockerResponse = await executeCodeInDocker(fullCode, language);

        // Handle response from Docker server
        console.log(dockerResponse)
        // if (dockerResponse.error) {
        //     return new Response(JSON.stringify({ error: dockerResponse.error }), { status: 400 });
        // }
        connectDB();
        const userprofile = await User.findOne({ email : user.email });
        if (!userprofile) {
            return new Response(
              JSON.stringify({ error: 'Invalid email or password' }),
              { status: 401, headers }
            );
          }
          const newSubmission = {
            problemId,
            language,
            status: (dockerResponse.result === 'failed') ? 'Wrong Answer' : 'Accepted',
            submissionTime: new Date(), // Optional, will default to `Date.now` if omitted
          };
          userprofile.submissions.push(newSubmission);
          if(dockerResponse.result !== 'failed' && !userprofile.solvedProblems.includes(problemId)){
            userprofile.solvedProblems.push(problemId);
          }
          await userprofile.save();
        // Return the successful output along with detailed info
        return new Response(JSON.stringify({
            output: dockerResponse.output,
            executionTime: dockerResponse.executionTime,
            memoryUsage: dockerResponse.memoryUsage,
            result: dockerResponse.result,
            failedTestCase: dockerResponse.failedTestCase,
            error:dockerResponse.error
        }), { status: 200 });

    } catch (error) {
        console.error("Error during code execution:", error);
        return new Response(JSON.stringify({ message: "Error during request processing" }), { status: 500 });
    }
}

// Function to wrap the code for specific language
function wrapCodeForLanguage(code, language, bottomclass) {
    switch (language) {
        case "cpp":
            return `
  #include <bits/stdc++.h>
  using namespace std;

  ${code}
  ${bottomclass}
  `;
        case "java":
            return `
  import java.util.List;
  ${code}
  public class user_code {
    ${bottomclass}
  }
  `;
        case "js":
            return `
  ${code}
  ${bottomclass}
  `;
        case "python":
            return `${code}\n${bottomclass}`;
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
}

// Function to execute code in Docker (send to the Docker server and handle response)
async function executeCodeInDocker(code, language) {
    const dockerServerUrl = 'https://codecomplier-ppjs.onrender.com/submit-code'; // Replace with actual Docker server URL

    try {
        // Send the code to the Docker server for execution
        const response = await fetch(dockerServerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language })
        });

        const data = await response.json();
        console.log(data)
        // Check if there's an error in the response
        const { output, executionTime, memoryUsage, result, failedTestCase,error } = parseDockerOutput(data);
        if (data.error) {
            return {
                output: output.trim(),
                executionTime: executionTime,
                memoryUsage: memoryUsage,
                result: result,
                failedTestCase: failedTestCase,
                error: error
            };
        }
        console.log(data)
        // Extract additional data from the Docker server response

        // Return the structured data
        return {
            output: output.trim(),
            executionTime: executionTime,
            memoryUsage: memoryUsage,
            result: result,
            failedTestCase: failedTestCase
        };

    } catch (error) {
        console.error("Error communicating with Docker server:", error);
        return { error: "Failed to execute code" };
    }
}

// Function to parse the Docker output for execution time, memory usage, and test case results
function parseDockerOutput(stdout) {
    let executionTime = stdout.executionTime;
    let memoryUsage = stdout.memoryUsage;
    let result = 'error';
    let failedTestCase = null;

    // Example regex patterns to extract execution time and memory usage
    // const timeMatch = stdout.match(/Execution Time: ([0-9.]+) seconds/);
    // const memoryMatch = stdout.match(/Memory Used: ([0-9]+) KB/);

    // // Extract execution time and memory usage from the output
    // if (timeMatch) {
    //     executionTime = parseFloat(timeMatch[1]);
    // }

    // if (memoryMatch) {
    //     memoryUsage = parseInt(memoryMatch[1], 10);
    // }

    // Check if all test cases passed or failed
    if (stdout.output.includes('All test cases passed.')) {
        result = 'passed';
    } else {
        const match = stdout.output.match(/Test case (\d+): Failed/);
        if (match) {
            result = 'failed';
            failedTestCase = parseInt(match[1], 10);  // Capture which test case failed
        }
    }

    return { output: stdout.output, executionTime, memoryUsage, result, failedTestCase,error:stdout.error };
}
