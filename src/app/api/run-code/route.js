export async function POST(req) {
  try {
    const { code, language, bottomclass, selectedExample } = await req.json();

    // Extract the example input from selectedExample
    // const exampleInput = selectedExample?.input;

    if (!selectedExample) {
      return new Response(JSON.stringify({ error: "Invalid or missing case input" }), { status: 400 });
    }

    // Process the example input to fit into the bottomclass
    const customizedBottomClass = bottomclass.replace("?Customvariable?",selectedExample)

    // Generate complete code based on language
    const fullCode = wrapCodeForLanguage(code, language, customizedBottomClass);
    console.log("Full code to execute:\n", fullCode);

    // Send the combined code to the execution server
    const response = await fetch("https://code-complier-seven.vercel.app/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: fullCode, language }),
    });

    console.log("Response received from execution server");

    // Handle the backend response
    const data = await response.json();

    if (!response.ok) {
      console.error("Program error received from execution server:", data.error);
      return new Response(JSON.stringify({ error: data.error }), { status: 400 });
    }

    return new Response(JSON.stringify({ output: data.output }), { status: 200 });
  } catch (error) {
    console.error("Execution error:", error);

    // Differentiate between a server error and program error
    return new Response(JSON.stringify({ error: "Failed to execute code. Please try again later." }), { status: 500 });
  }
}

// // Helper function to wrap code based on language
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

// // // Helper: Parse example input string into a structured object
// // function parseExampleInput(exampleInput) {
// //   const inputLines = exampleInput.split(",").map(line => line.trim());
// //   const inputObject = {};

// //   inputLines.forEach(line => {
// //     if (!line) return; // Skip empty lines

// //     const [key, value] = line.split("=").map(part => part.trim());

// //     if (!key || !value) {
// //       console.error("Skipping invalid input line:", line);
// //       return;
// //     }

// //     try {
// //       // Handle cases where values are array-like or object-like strings
// //       let parsedValue = value;

// //       // Check if the value is an array or object-like string
// //       if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
// //         // Convert from array-like or object-like string to actual array or object
// //         parsedValue = value.replace(/'/g, '"'); // Replace single quotes with double quotes for JSON compatibility
// //         parsedValue = JSON.parse(parsedValue); // Parse as JSON

// //         // If the value is an array or object, we treat it as such
// //       }

// //       // Assign the parsed value
// //       inputObject[key] = parsedValue;
// //     } catch (err) {
// //       // Handle simple strings or other edge cases
// //       console.error("Error parsing value for key:", key, "Error:", err);
// //       inputObject[key] = value; // Fallback to raw string value
// //     }
// //   });

// //   return inputObject;
// // }



// // // Helper: Replace inputs for C++
// // function replaceInputForCpp(bottomclass, inputs) {
// //   for (const [key, value] of Object.entries(inputs)) {
// //     let cppValue;
// //     if (Array.isArray(value)) {
// //       // Convert array or matrix to C++ initializer list
// //       cppValue = JSON.stringify(value).replace(/\[/g, "{").replace(/\]/g, "}");
// //     } else if (typeof value === "string") {
// //       cppValue = `"${value}"`; // Add quotes for strings
// //     } else {
// //       cppValue = value; // Numbers or other primitives
// //     }

// //     // Use regex to find and replace the corresponding variable
// //     const regex = new RegExp(`\\bvector<.*>\\s+${key}\\s*=\\s*.*;|\\bstring\\s+${key}\\s*=\\s*.*;|\\bint\\s+${key}\\s*=\\s*.*;`);
// //     bottomclass = bottomclass.replace(regex, `${Array.isArray(value) ? `vector<int>` : `auto`} ${key} = ${cppValue};`);
// //   }
// //   return bottomclass;
// // }

// // // Helper: Replace inputs for Java
// // function replaceInputForJava(bottomclass, inputs) {
// //   for (const [key, value] of Object.entries(inputs)) {
// //     let javaValue;
// //     if (Array.isArray(value)) {
// //       javaValue = JSON.stringify(value).replace(/\[/g, "{").replace(/\]/g, "}"); // Convert to Java array format
// //     } else if (typeof value === "string") {
// //       javaValue = `"${value}"`; // Add quotes for strings
// //     } else {
// //       javaValue = value; // Numbers or other primitives
// //     }

// //     const regex = new RegExp(`\\bint\\[\\]\\s+${key}\\s*=\\s*.*;|\\bString\\s+${key}\\s*=\\s*.*;`);
// //     bottomclass = bottomclass.replace(regex, `${Array.isArray(value) ? `int[]` : `String`} ${key} = ${javaValue};`);
// //   }
// //   return bottomclass;
// // }

// // // Helper: Replace inputs for JavaScript
// // function replaceInputForJs(bottomclass, inputs) {
// //   for (const [key, value] of Object.entries(inputs)) {
// //     const jsValue = JSON.stringify(value); // Convert directly to JSON-compatible format
// //     const regex = new RegExp(`const\\s+${key}\\s*=\\s*.*;`);
// //     bottomclass = bottomclass.replace(regex, `const ${key} = ${jsValue};`);
// //   }
// //   return bottomclass;
// // }

// // // Helper: Replace inputs for Python
// // function replaceInputForPython(bottomclass, inputs) {
// //   for (const [key, value] of Object.entries(inputs)) {
// //     const pythonValue = JSON.stringify(value); // Convert directly to Python-compatible JSON
// //     const regex = new RegExp(`${key}\\s*=\\s*.*`);
// //     bottomclass = bottomclass.replace(regex, `${key} = ${pythonValue}`);
// //   }
// //   return bottomclass;
// // }

// // // Unified insertExampleIntoBottomClass
// // function insertExampleIntoBottomClass(bottomclass, language, exampleInput) {
// //   console.log("parsedInput")
// //   const parsedInput = parseExampleInput(exampleInput);
// // console.log(parsedInput)
// //   switch (language) {
// //     case "cpp":
// //       return replaceInputForCpp(bottomclass, parsedInput);
// //     case "java":
// //       return replaceInputForJava(bottomclass, parsedInput);
// //     case "js":
// //       return replaceInputForJs(bottomclass, parsedInput);
// //     case "python":
// //       return replaceInputForPython(bottomclass, parsedInput);
// //     default:
// //       throw new Error(`Unsupported language: ${language}`);
// //   }
// // }

// // Helper: Replace nested structures (recursive) for any language


// function insertExampleIntoBottomClass(bottomclass,language, exampleInput) {
//   for (const [key, value] of Object.entries(exampleInput)) {
//     const formattedValue = formatValueForLanguage(value, language);

//     const regex = {
//       cpp: new RegExp(`\\bvector<.*>\\s+${key}\\s*=\\s*.*;|\\bstring\\s+${key}\\s*=\\s*.*;|\\bint\\s+${key}\\s*=\\s*.*;`),
//       java: new RegExp(`\\bint\\[\\]\\s+${key}\\s*=\\s*.*;|\\bString\\s+${key}\\s*=\\s*.*;`),
//       js: new RegExp(`const\\s+${key}\\s*=\\s*.*;`),
//       python: new RegExp(`${key}\\s*=\\s*.*`),
//     }[language];

//     if (!regex) {
//       throw new Error(`Unsupported language: ${language}`);
//     }

//     bottomclass = bottomclass.replace(regex, generateVariableDeclaration(key, formattedValue, language));
//   }

//   return bottomclass;
// }

// // Helper: Format values for different languages
// function formatValueForLanguage(value, language) {
//   if (Array.isArray(value)) {
//     // Convert arrays to appropriate syntax
//     switch (language) {
//       case "cpp":
//         return JSON.stringify(value).replace(/\[/g, "{").replace(/\]/g, "}");
//       case "java":
//         return JSON.stringify(value).replace(/\[/g, "{").replace(/\]/g, "}");
//       case "js":
//         return JSON.stringify(value);
//       case "python":
//         return JSON.stringify(value);
//       default:
//         return value;
//     }
//   } else if (typeof value === "object") {
//     // Convert objects to JSON-compatible strings
//     return JSON.stringify(value);
//   } else if (typeof value === "string") {
//     // Add quotes for strings
//     return `"${value}"`;
//   }
//   return value; // Return numbers and other primitives as-is
// }

// // Helper: Generate language-specific variable declarations
// function generateVariableDeclaration(key, formattedValue, language) {
//   switch (language) {
//     case "cpp":
//       return `auto ${key} = ${formattedValue};`;
//     case "java":
//       return `${Array.isArray(formattedValue) ? "int[]" : "String"} ${key} = ${formattedValue};`;
//     case "js":
//       return `const ${key} = ${formattedValue};`;
//     case "python":
//       return `${key} = ${formattedValue}`;
//     default:
//       throw new Error(`Unsupported language: ${language}`);
//   }
// }
