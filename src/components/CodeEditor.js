import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";

const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="bg-black text-green-400 font-mono w-full max-w-4xl mx-auto">
      {/* Console Header */}
      <pre className="border-t border-gray-700 text-gray-500">
        {`-----------------------------[ Code Editor ]-----------------------------`}
      </pre>

      {/* CodeMirror Editor */}
      <div className="bg-black p-4"
      
      >
        <CodeMirror
          value={code}
          height="67vh"
          theme={vscodeDark}
          extensions={[javascript(),python()]}
          onChange={(value) => setCode(value)} // Update code on change
          options={{
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            styleActiveLine: true,
          }}
          className="rounded-md no-selection"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
