'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(1000); // Slider length defaults to medium
  const [useEmojis, setUseEmojis] = useState(true); // Emoji toggle

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input, length, useEmojis }),
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
      {/* Title text */}
      <h1
        className="text-3xl font-bold mb-4 text-center"
        style={{ color: 'rgb(10, 102, 194)' }}
      >
        LinkedIn Parody Post Generator
      </h1>

      {/* User input box */}
      <label htmlFor="brag-input" className="sr-only">
        Brag Input
      </label>
      <input
        id="brag-input"
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

      {/* Slider for post length */}
      <div className="mb-4 flex flex-row items-center gap-4">
        <div className="w-28 flex flex-col items-center">
          <label htmlFor="length-slider" className="block mb-1 font-semibold text-gray-700 text-sm text-center w-full">
            Post Length
          </label>
          <input
            id="length-slider"
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

        {/* Emoji toggle */}
        <div className="flex flex-col items-center ml-2">
          <label
            htmlFor="emoji-toggle"
            className="block mb-1 font-semibold text-gray-700 text-sm text-center w-full"
          >
            Emojis
          </label>
          <button
            id="emoji-toggle"
            type="button"
            aria-pressed={useEmojis}
            onClick={() => setUseEmojis((v) => !v)}
            className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center`}
            style={{
              backgroundColor: useEmojis ? 'rgb(10, 102, 194)' : 'rgb(223, 222, 218)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            }}
            aria-label={useEmojis ? 'Disable emojis' : 'Enable emojis'}
          >
            <span
              className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${useEmojis ? 'translate-x-4' : 'translate-x-1'}`}
            >
              {/* Optionally add emoji icons here */}
            </span>
          </button>
        </div>
      </div>

      {/* Generate button */}
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
        aria-label="Generate LinkedIn Post"
      >
        {loading ? 'Generating BS...' : 'Generate post'}
      </button>

      {/* Output text area */}
      <label htmlFor="output-box" className="sr-only">
        Generated LinkedIn Post Output
      </label>
      <textarea
        id="output-box"
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
        aria-label="Generated LinkedIn Post"
      />
      {/* Copy to clipboard button */}
      {output && (
        <button
          onClick={handleCopy}
          className="bg-green-600 text-white px-4 py-2 rounded"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}
          aria-label="Copy output to clipboard"
        >
          Copy to Clipboard
        </button>
      )}
    </main>
  );
}
