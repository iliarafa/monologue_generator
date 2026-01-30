import React from 'react';

export default function GenerationsPage({ generations, onBack }) {
  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="shrink-0 mb-4">
        <button
          onClick={onBack}
          className="text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 shrink-0">
        Generations
      </h1>

      <div className="flex-1 min-h-0 overflow-y-auto border border-black p-4">
        {generations.length === 0 ? (
          <p className="text-black opacity-60">No generations yet.</p>
        ) : (
          <div className="space-y-3">
            {generations.map((gen, index) => (
              <div key={index} className="border border-black p-3">
                <div className="flex justify-between items-start">
                  <div className="text-sm font-semibold">{gen.author}</div>
                  <div className="text-sm opacity-60">
                    {gen.time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>
                <div className="text-sm mt-1 opacity-80">
                  {gen.wordCount} words
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
