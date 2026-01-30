import React from 'react';

export default function InputPage({ inputText, selectedStyle, playwrightStyles, onGenerate, onSelectPlaywright, onSelectText, error }) {
  const current = playwrightStyles.find(s => s.value === selectedStyle);

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="text-center mb-4 shrink-0">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-1">
          monolog.
        </h1>
        <p className="text-black text-sm">
          Transform your thoughts into monologues
        </p>
      </div>

      <div className="bg-white p-4 border border-black flex-1 min-h-0 flex flex-col">
        <div className="mb-3 shrink-0">
          <button
            onClick={onSelectPlaywright}
            className="w-full text-left bg-white text-black border border-black px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <div className="text-sm font-semibold mb-1">Select Playwright</div>
            <div className="text-lg font-light">{current?.label}</div>
            <div className="text-xs mt-1 opacity-80">{current?.description}</div>
          </button>
        </div>

        <div className="mb-3 shrink-0">
          <button
            onClick={onSelectText}
            className="w-full text-left bg-white text-black border border-black px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <div className="text-sm font-semibold mb-1">Input Text</div>
            <div className="text-lg font-light truncate">
              {inputText.trim() ? inputText.trim() : 'Tap to enter text...'}
            </div>
          </button>
        </div>

        <button
          onClick={onGenerate}
          disabled={!inputText.trim()}
          className="w-full shrink-0 bg-white text-black border border-black py-3 px-6 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
