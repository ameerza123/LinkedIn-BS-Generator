'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(1000); // default to medium

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input, length }),
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
        className="text-3xl font-bold mb-4 text-center"
        style={{ color: 'rgb(10, 102, 194)' }}
      >
        LinkedIn Parody Post Generator
      </h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What do you wanna brag about?"
        className="w-full border p-2 rounded mb-4"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          color: 'black',
          border: 'none',
          outline: '1px solid rgb(223, 222, 218)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      />

      <div className="mb-4 flex flex-col items-start">
        <div className="w-28 flex flex-col items-center">
          <label className="block mb-1 font-semibold text-gray-700 text-sm text-center w-full">
            Post Length
          </label>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={
              length === 500 ? 0 :
              length === 1000 ? 1 : 2
            }
            onChange={e => {
              const val = Number(e.target.value);
              setLength(val === 0 ? 500 : val === 1 ? 1000 : 2500);
            }}
            className="w-28 h-2"
            style={{ accentColor: 'rgb(10, 102, 194)' }}
          />
        </div>
      </div>
      {/* End slider */}

      <button
        onClick={handleGenerate}
        disabled={loading || !input}
        className="text-white px-4 py-2 rounded mb-4"
        style={{
          backgroundColor: 'rgb(10, 102, 194)',
          opacity: loading || !input ? 0.6 : 1,
          cursor: loading || !input ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      >
        {loading ? 'Generating BS...' : 'Generate post'}
      </button>

      <textarea
        value={output}
        readOnly
        className="w-full h-80 p-2 rounded mb-2"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          color: 'black',
          border: 'none',
          outline: '1px solid rgb(223, 222, 218)',
          resize: 'none',
          overflow: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      />
      {output && (
        <button
          onClick={handleCopy}
          className="bg-green-600 text-white px-4 py-2 rounded"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}
        >
          Copy to Clipboard
        </button>
      )}
    </main>
  );
}
