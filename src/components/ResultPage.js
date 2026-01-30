import React from 'react';
import { Loader2 } from 'lucide-react';
import { exportAsPDF, exportAsDOC, exportAsCSV } from '../utils/exportUtils';

export default function ResultPage({ isLoading, generatedMonologue, error, selectedStyleLabel, onBack }) {
  const wordCount = generatedMonologue ? generatedMonologue.trim().split(/\s+/).length : 0;
  // Average stage speaking pace is ~130 words per minute
  const totalSeconds = Math.round((wordCount / 130) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col overflow-hidden">
      <button
        onClick={onBack}
        className="mb-4 shrink-0 text-black hover:bg-black hover:text-white transition-colors duration-200 px-2 py-1"
      >
        ← Back
      </button>

      {isLoading && (
        <div className="flex-1 bg-white p-6 border border-black flex flex-col items-center justify-center">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p className="text-black text-lg">
            Generating Monologue<span className="blink">_</span>
          </p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-white p-6 border border-black shrink-0">
          <div className="border border-black text-black px-4 py-3">
            {error}
          </div>
        </div>
      )}

      {generatedMonologue && !isLoading && (
        <div className="bg-white p-4 border border-black flex-1 min-h-0 flex flex-col">
          <h2 className="text-2xl font-light text-black mb-3 shrink-0">
            Generated Monologue
            <span className="text-sm font-light text-black ml-2">
              ({selectedStyleLabel})
            </span>
          </h2>

          <div className="border border-black p-4 overflow-y-auto flex-1 min-h-0">
            <pre className="text-black whitespace-pre-wrap text-sm leading-relaxed">
              {generatedMonologue}
            </pre>
          </div>

          <div className="mt-3 shrink-0 border border-black px-4 py-3 text-sm text-black flex justify-between">
            <span>{wordCount} words</span>
            <span>Est. performance time: {minutes} min {seconds} sec</span>
          </div>

          <div className="mt-3 shrink-0 flex flex-wrap gap-3">
            <button
              onClick={() => exportAsPDF(generatedMonologue, selectedStyleLabel)}
              className="flex-1 bg-white text-black border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors duration-200"
            >
              Export PDF
            </button>
            <button
              onClick={() => exportAsDOC(generatedMonologue, selectedStyleLabel)}
              className="flex-1 bg-white text-black border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors duration-200"
            >
              Export DOC
            </button>
            <button
              onClick={() => exportAsCSV(generatedMonologue, selectedStyleLabel)}
              className="flex-1 bg-white text-black border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors duration-200"
            >
              Export CSV
            </button>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(generatedMonologue)}
            className="mt-3 shrink-0 w-full bg-white text-black border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors duration-200"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
