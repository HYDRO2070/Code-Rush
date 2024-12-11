import connectDB from '@/lib/db'; // Adjust the path if needed
import mongoose from 'mongoose';

const problem = {
  "QuestionNo": 1,
  "title": "Word Search",
  "description": "Given an m x n grid of characters board and a string word, return true if the word exists in the grid.",
  "difficulty": "Medium",
  "tags": [
    "backtracking",
    "matrix"
  ],
  "examples": [
    {
      "input": "board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],\nword = 'ABCCED'",
      "output": "true",
      "explanation": "The word 'ABCCED' can be constructed from adjacent letters on the board."
    },
    {
      "input": "board = [['A', 'B', 'C', 'E'], ['S', 'S', 'C', 'S'], ['A', 'D', 'Y', 'E']],\nword = 'SEE'",
      "output": "false",
      "explanation": "The word 'SEE' cannot be constructed from adjacent letters on the board."
    }
  ],
  "constraints": "1 <= board.length,\nboard[i].length <= 200,\nword.length <= 10^3",
  "testCases": [
    {
      "case": 1,
      "input": {
        "cpp": "vector<vector<char>> board = {{'A', 'B', 'C', 'E'}, {'S', 'F', 'C', 'S'}, {'A', 'D', 'E', 'E'}};\nstring word = \"ABCCED\";",
        "java": "char[][] board = {{'A', 'B', 'C', 'E'}, {'S', 'F', 'C', 'S'}, {'A', 'D', 'E', 'E'}};\nString word = \"ABCCED\";",
        "js": "const board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]\n const word = \"ABCCED\";",
        "python": "board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]\nword = \"ABCCED\""
      },
      "output": true
    },
    {
      "case": 2,
      "input": {
        "cpp": "vector<vector<char>> board = {{'A', 'B', 'C', 'E'}, {'S', 'S', 'C', 'S'}, {'A', 'D', 'Y', 'E'}};\nstring word = \"SEE\";",
        "java": "char[][] board = {{'A', 'B', 'C', 'E'}, {'S', 'S', 'C', 'S'}, {'A', 'D', 'Y', 'E'}};\nString word = \"SEE\";",
        "js": "const board = [['A', 'B', 'C', 'E'], ['S', 'S', 'C', 'S'], ['A', 'D', 'Y', 'E']];\nconst word = \"SEE\";",
        "python": "board = [['A', 'B', 'C', 'E'], ['S', 'S', 'C', 'S'], ['A', 'D', 'Y', 'E']]\nword = \"SEE\""
      },
      "output": false
    },
    {
      "case": 3,
      "input": {
        "cpp": "vector<vector<vector<char>>> boards = {{{'A', 'B', 'C', 'E'}, {'S', 'F', 'C', 'S'}, {'A', 'D', 'E', 'E'}}, {{'A', 'B', 'C', 'E'}, {'S', 'S', 'C', 'S'}, {'A', 'D', 'Y', 'E'}}, {{'X', 'Y', 'Z', 'W'}, {'Q', 'P', 'O', 'N'}, {'A', 'B', 'C', 'D'}}}; vector<string> words = {\"ABCCED\", \"SEE\", \"XYZ\"}; vector<bool> expectedOutputs = {true, false, true};",
        "java": "List<char[][]> boards = List.of(new char[][] {{'A', 'B', 'C', 'E'}, {'S', 'F', 'C', 'S'}, {'A', 'D', 'E', 'E'}}, new char[][] {{'A', 'B', 'C', 'E'}, {'S', 'S', 'C', 'S'}, {'A', 'D', 'Y', 'E'}}, new char[][] {{'X', 'Y', 'Z', 'W'}, {'Q', 'P', 'O', 'N'}, {'A', 'B', 'C', 'D'}}); List<String> words = List.of(\"ABCCED\", \"SEE\", \"XYZ\"); List<Boolean> expectedOutputs = List.of(true, false, true);",
        "js": "const boards = [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], [['A', 'B', 'C', 'E'], ['S', 'S', 'C', 'S'], ['A', 'D', 'Y', 'E']], [['X', 'Y', 'Z', 'W'], ['Q', 'P', 'O', 'N'], ['A', 'B', 'C', 'D']]]; const words = [\"ABCCED\", \"SEE\", \"XYZ\"]; const expectedOutputs = [true, false, true];",
        "python": "boards = [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], [['A', 'B', 'C', 'E'], ['S', 'S', 'C', 'S'], ['A', 'D', 'Y', 'E']], [['X', 'Y', 'Z', 'W'], ['Q', 'P', 'O', 'N'], ['A', 'B', 'C', 'D']]]\n    words = [\"ABCCED\", \"SEE\", \"XYZ\"]\n    expected_outputs = [True, False, True]"
      },
      "output": null
    }
  ],
  "defaultClass": {
    "cpp": "class WordSearch {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        // Write your code here\n    }\n};",
    "java": "class WordSearch {\n    public boolean exist(char[][] board, String word) {\n        // Write your code here\n    }\n}",
    "js": "function exist(board, word) {\n    // Write your code here\n}",
    "python": "class WordSearch:\n    def exist(self, board, word):\n        # Write your code here"
  },
  "defaultBottomRun": {
    "cpp": "int main() {\n    WordSearch ws;\n    ?Customvariable?\n    cout << (ws.exist(board, word) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
    "java": "public static void main(String[] args) {\n    WordSearch ws = new WordSearch();\n    ?Customvariable?\n    System.out.println(ws.exist(board, word) ? \"true\" : \"false\");\n}",
    "js": "?Customvariable?\nconsole.log(exist(board, word) ? \"true\" : \"false\");",
    "python": "if __name__ == \"__main__\":\n    board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]\n    word = \"ABCCED\"\n    ws = WordSearch()\n    print(\"true\" if ws.exist(board, word) else \"false\")"
  },
  "defaultBottomSubmit": {
    "cpp": "int main() {\n    WordSearch ws;\n    ?Customvariable?\n\n    for (int i = 0; i < boards.size(); ++i) {\n        if (ws.exist(boards[i], words[i]) != expectedOutputs[i]) {\n            cout << \"Test case \" << i + 1 << \": Failed\" << endl;\n            return 0;\n        }\n    }\n    cout << \"All test cases passed.\" << endl;\n    return 0;\n}",
    "java": "public static void main(String[] args) {\n    WordSearch ws = new WordSearch();\n    ?Customvariable?\n\n    for (int i = 0; i < boards.size(); i++) {\n        if (ws.exist(boards.get(i), words.get(i)) != expectedOutputs.get(i)) {\n            System.out.println(\"Test case \" + (i + 1) + \": Failed\");\n            return;\n        }\n    }\n    System.out.println(\"All test cases passed.\");\n}",
    "js": "?Customvariable?\n\nboards.forEach((board, index) => {\n    if (exist(board, words[index]) !== expectedOutputs[index]) {\n        console.log(`Test case ${index + 1}: Failed`);\n        process.exit(0);\n    }\n});\nconsole.log(\"All test cases passed.\");",
    "python": "if __name__ == \"__main__\":\n    ?Customvariable?\n    ws = WordSearch()\n    for i, (board, word) in enumerate(zip(boards, words)):\n        if ws.exist(board, word) != expected_outputs[i]:\n            print(f\"Test case {i + 1}: Failed\")\n            exit(0)\n    print(\"All test cases passed.\")"
  },
  "NoOfTestCase": 3
}


export async function POST(req) {

  return new Response(JSON.stringify(problem), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  try {
    const { topic } = await req.json();
    console.log('Received topics:', topic);

    // Step 1: Ensure topics are in lowercase
    const processedTopics = Array.isArray(topic)
      ? topic.map((t) => t.toLowerCase().trim()) // Convert each topic to lowercase
      : [];

    console.log('Processed topics:', processedTopics);

    // Step 2: Connect to MongoDB
    await connectDB();

    // Step 3: Define the Problem model
    const Problem = mongoose.models.Problem || mongoose.model('Problem', new mongoose.Schema({
      QuestionNo: Number,
      title: String,
      description: String,
      difficulty: String,
      tags: [String], // This corresponds to "topics" in your app
      examples: Array,
      constraints: String,
      testCases: Array,
      defaultClass: Object,
      defaultBottomRun: Object,
      defaultBottomSubmit: Object,
      NoOfTestCase: Number,
    }));

    // Step 4: Build the query
    const query = processedTopics.length > 0
      ? { "tags": { $in: processedTopics } } // Match any problem where tags contain the topics
      : {}; // If no topics, match all problems

    // Step 5: Get the count of matching documents
    const count = await Problem.countDocuments(query);
    console.log(count)
    console.log(query)
    if (count === 0) {
      // No problems found for the given topics, fetch a random problem from the entire collection
      const totalProblems = await Problem.countDocuments();
      if (totalProblems === 0) {
        return new Response(
          JSON.stringify({ message: "No problems found in the database." }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      const randomIndex = Math.floor(Math.random() * totalProblems);
      const randomProblem = await Problem.findOne().skip(randomIndex).lean();

      return new Response(JSON.stringify(randomProblem), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Step 6: Fetch a random problem matching the topics
    const randomIndex = Math.floor(Math.random() * count);
    const randomProblem = await Problem.findOne(query).skip(randomIndex).lean();

    // Step 7: Return the random problem
    return new Response(JSON.stringify(randomProblem), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error fetching random problem:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
