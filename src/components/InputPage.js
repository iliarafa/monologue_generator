import React from 'react';

export default function InputPage({ inputText, setInputText, selectedStyle, playwrightStyles, onGenerate, onSelectPlaywright, error }) {
  const current = playwrightStyles.find(s => s.value === selectedStyle);

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="text-center mb-4 shrink-0">
        <h1 className="text-3xl md:text-5xl font-light text-black mb-1">
          Think That, Say That
        </h1>
        <p className="text-black text-lg">
          Transform your thoughts into theatrical monologues
        </p>
      </div>

      <div className="bg-white p-4 border border-black flex-1 min-h-0 flex flex-col">
        <div className="mb-3 shrink-0">
          <button
            onClick={onSelectPlaywright}
            className="w-full text-left bg-white text-black border border-black px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <div className="text-sm mb-1">Select Playwright</div>
            <div className="text-lg font-light">{current?.label}</div>
            <div className="text-xs mt-1 opacity-80">{current?.description}</div>
          </button>
        </div>

        <div className="mb-3 flex-1 min-h-0 flex flex-col">
          <label className="block text-black mb-2 text-sm shrink-0">
            Your Text or Conversation
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your conversation or text here..."
            className="w-full flex-1 bg-white text-black border border-black px-4 py-3 focus:outline-none placeholder-gray-400 resize-none"
            style={{ fontFamily: 'Georgia, serif' }}
          />
        </div>

        <button
          onClick={onGenerate}
          disabled={!inputText.trim()}
          className="w-full shrink-0 bg-white text-black border border-black py-3 px-6 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Generate Monologue
        </button>

        {error && (
          <div className="mt-3 shrink-0 border border-black text-black px-4 py-3">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
