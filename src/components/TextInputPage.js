import React from 'react';

export default function TextInputPage({ inputText, setInputText, onBack }) {
  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="shrink-0 mb-4">
        <button
          onClick={onBack}
          className="text-black hover:opacity-70 transition-opacity duration-200"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-2xl font-light text-black mb-4 shrink-0">
        Enter Your Text
      </h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your conversation or text here..."
        className="w-full flex-1 min-h-0 bg-white text-black border border-black px-4 py-3 focus:outline-none placeholder-gray-400 resize-none"
        autoFocus
      />
    </div>
  );
}
