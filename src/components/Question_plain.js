"use client"
import React ,{useEffect,useState} from 'react'

const Question_plain = ({problemObject}) => {

    // const [randomNumber, setRandomNumber] = useState(null);




    // useEffect(() => {
    //     // console.log("Language changed to:", selectedLanguage);
    //     // console.log("Code updated to:", code);
    //     setRandomNumber(Math.floor(Math.random() * 1000) + 1);
    //   }, []);
    return (<>
    
            <pre className="text-gray-300">
                <span className="text-purple-600"># {problemObject.QuestionNo}</span>{" "}
                {problemObject.title}
                {"\n"}
                {"\n"}
                <div>
                    Difficulty:{" "}
                    <span
                        className={`font-bold ${problemObject.difficulty === "Easy"
                            ? "text-green-500"
                            : problemObject.difficulty === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                    >
                        # {problemObject.difficulty}
                    </span>
                </div>
                {"-".repeat(60)}
                {"\n"}
                <div className="text-gray-300 text-balance max-w-full sm:max-w-[100%] lg:max-w-[100%] break-words whitespace-normal">
                    <span className="text-purple-600">Description:</span>
                    <span className="block">{problemObject.description}</span>
                </div>
                {"\n"}
                Tags:
                {"\n"}
                {problemObject.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-block text-gray-300 bg-purple-600 px-2 py-1 rounded mr-1"
                    >
                        #{tag}
                    </span>
                ))}
                {"\n"}
                {"\n"}
                
                Examples:
                {"\n"}
                {"-".repeat(60)}
                {"\n"}
                {problemObject.examples.map((example, index) => (
                    <div key={index}>
                        <span className="text-purple-600">Example {index + 1}:</span>
                        {"\n"}
                        Input: {example.input}
                        {"\n"}
                        Output: {example.output}
                        {"\n"}
                        Explanation: {example.explanation}
                        {"\n"}
                        {"\n"}
                    </div>
                ))}
                <div className="text-gray-300 text-balance max-w-full sm:max-w-[100%] lg:max-w-[100%] break-words whitespace-normal">
                <span className="text-purple-600">Constraints:</span>
                {"\n"}
                {problemObject.constraints}
                </div>
            </pre>
    </>)
}

export default Question_plain