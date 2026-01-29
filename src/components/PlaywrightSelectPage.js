import React from 'react';

export default function PlaywrightSelectPage({ playwrightStyles, selectedStyle, onSelect, onBack }) {
  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="mb-4 shrink-0">
        <button
          onClick={onBack}
          className="text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl font-light text-black mb-4 text-center shrink-0">
        Select Playwright
      </h1>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3">
        {playwrightStyles.map(style => (
          <button
            key={style.value}
            onClick={() => onSelect(style.value)}
            className={`w-full shrink-0 text-left border border-black px-4 py-3 transition-colors duration-200 ${
              style.value === selectedStyle
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <div className="text-lg font-light">{style.label}</div>
            <div className="text-xs mt-1 opacity-80">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
