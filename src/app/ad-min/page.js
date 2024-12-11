"use client"
import React, { useState } from 'react';

const Page = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const testGeminiApi = async () => {
    const apiKey = `${process.env.Gemini_key}`; // Replace with your actual API key
    const apiUrl =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' +
      apiKey;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Explain how AI works',
                },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Test Gemini API</h1>
      <button onClick={testGeminiApi} className='border rounded-md border-cyan-800'>Send Test Request</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
