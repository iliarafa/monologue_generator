import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function MonologueGenerator() {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('beckett');
  const [generatedMonologue, setGeneratedMonologue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const playwrightStyles = [
    { value: 'beckett', label: 'Samuel Beckett', description: 'Minimalist, pauses, existential uncertainty' },
    { value: 'mamet', label: 'David Mamet', description: 'Staccato rhythms, repetition, interrupted speech' },
    { value: 'tarantino', label: 'Quentin Tarantino', description: 'Pop culture, vernacular, conversational' },
    { value: 'pinter', label: 'Harold Pinter', description: 'Menacing pauses, power dynamics, subtext' },
    { value: 'shepard', label: 'Sam Shepard', description: 'American mythology, fragmented identity, lyricism' },
    { value: 'churchill', label: 'Caryl Churchill', description: 'Overlapping dialogue, temporal shifts, political' }
  ];

  const stylePrompts = {
    beckett: `Transform this into a theatrical monologue in Samuel Beckett's style:
- Use extensive pauses and silence as structural elements
- Ambiguous, minimalist stage directions ("sits. Or stands. It doesn't matter")
- Sparse, fragmented language
- Existential uncertainty and paradox
- Physical gestures that carry philosophical weight
- End with an ambiguous or paradoxical stage direction`,

    mamet: `Transform this into a theatrical monologue in David Mamet's style:
- Staccato rhythms with "Beat." after thoughts
- Interrupted, self-correcting speech ("It's not— Look.")
- Direct, confrontational address
- Strategic profanity for emphasis
- Repetition of key phrases for rhythmic impact
- Short, punchy sentences that build momentum`,

    tarantino: `Transform this into a theatrical monologue in Quentin Tarantino's style:
- Set in casual location (diner booth, car, etc.)
- Directed at unseen companion
- Pop culture references woven naturally into philosophy
- Profanity as conversational punctuation
- Accessible, vernacular speech patterns
- Specific details (coffee, milkshake, etc.)
- End with a needle drop music cue suggestion`,

    pinter: `Transform this into a theatrical monologue in Harold Pinter's style:
- Menacing pauses that create tension
- Subtext beneath surface conversation
- Power dynamics and territorial claims
- Deliberate, controlled language
- Sudden shifts in tone or subject
- Unsettling undercurrent`,

    shepard: `Transform this into a theatrical monologue in Sam Shepard's style:
- American landscape and mythology
- Fragmented sense of identity
- Lyrical, poetic language mixed with vernacular
- References to family, land, legacy
- Visceral, physical imagery
- Oscillation between myth and reality`,

    churchill: `Transform this into a theatrical monologue in Caryl Churchill's style:
- Unconventional structure and formatting
- Overlapping or fragmentary thoughts
- Political and social critique embedded
- Temporal or narrative disruption
- Dense, layered language
- Experimental use of form`
  };

  const generateMonologue = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to transform');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedMonologue('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: `${stylePrompts[selectedStyle]}

Input text:
${inputText}

Create a complete theatrical monologue with proper formatting, stage directions, and the distinctive voice of this playwright. The monologue should capture the essence and themes of the input while being unmistakably in the chosen playwright's style.`
            }
          ]
        })
      });

      const data = await response.json();

      if (data.content && data.content[0] && data.content[0].text) {
        setGeneratedMonologue(data.content[0].text);
      } else {
        setError('Failed to generate monologue. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while generating the monologue.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 font-light" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-light text-black mb-3">
            Monologue Generator
          </h1>
          <p className="text-black text-lg">
            Transform your thoughts into theatrical monologues
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white p-6 border border-black">
            <h2 className="text-2xl font-light text-black mb-4">Input</h2>

            <div className="mb-4">
              <label className="block text-black mb-2 text-sm">
                Select Playwright Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-white text-black border border-black px-4 py-3 focus:outline-none"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {playwrightStyles.map(style => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
              <p className="text-black text-xs mt-1">
                {playwrightStyles.find(s => s.value === selectedStyle)?.description}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2 text-sm">
                Your Text or Conversation
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your conversation or text here..."
                className="w-full h-96 bg-white text-black border border-black px-4 py-3 focus:outline-none placeholder-gray-400 resize-none"
                style={{ fontFamily: 'Georgia, serif' }}
              />
            </div>

            <button
              onClick={generateMonologue}
              disabled={isLoading || !inputText.trim()}
              className="w-full bg-white text-black border border-black py-3 px-6 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Generating...
                </>
              ) : (
                'Generate Monologue'
              )}
            </button>

            {error && (
              <div className="mt-4 border border-black text-black px-4 py-3">
                {error}
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-white p-6 border border-black">
            <h2 className="text-2xl font-light text-black mb-4">
              Generated Monologue
              {generatedMonologue && (
                <span className="text-sm font-light text-black ml-2">
                  ({playwrightStyles.find(s => s.value === selectedStyle)?.label})
                </span>
              )}
            </h2>

            <div className="border border-black p-4 h-[520px] overflow-y-auto">
              {generatedMonologue ? (
                <pre className="text-black whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {generatedMonologue}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-center">
                  Your generated monologue will appear here
                </div>
              )}
            </div>

            {generatedMonologue && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedMonologue);
                }}
                className="mt-4 w-full bg-white text-black border border-black py-2 px-4 hover:bg-black hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Copy to Clipboard
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-black text-sm">
          <p>Powered by Claude AI • Transform conversations into theatrical art</p>
        </div>
      </div>
    </div>
  );
}
