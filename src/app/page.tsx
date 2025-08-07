'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input }),
    });
    const data = await res.json();
    setOutput(data.output);
    setLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <main
      className="min-h-screen p-6 max-w-2xl mx-auto"
      style={{ backgroundColor: 'rgb(244, 242, 238)' }}
    >
      <h1
        className="text-3xl font-bold mb-4"
        style={{ color: 'rgb(10, 102, 194)' }}
      >
        LinkedIn Parody Post Generator
      </h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What do you wanna brag about?"
        className="w-full border p-2 rounded mb-4"
        style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !input}
        className="text-white px-4 py-2 rounded mb-4"
        style={{
          backgroundColor: 'rgb(10, 102, 194)',
          opacity: loading || !input ? 0.6 : 1,
          cursor: loading || !input ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Post'}
      </button>

      {output && (
        <>
          <textarea
            value={output}
            readOnly
            className="w-full h-60 border p-2 rounded mb-2"
            style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}
          />
          <button
            onClick={handleCopy}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Copy to Clipboard
          </button>
        </>
      )}
    </main>
  );
}
