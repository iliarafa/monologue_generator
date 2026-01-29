import React, { useState } from 'react';
import InputPage from './components/InputPage';
import ResultPage from './components/ResultPage';
import PlaywrightSelectPage from './components/PlaywrightSelectPage';

export default function MonologueGenerator() {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('chekhov');
  const [generatedMonologue, setGeneratedMonologue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('input');

  const playwrightStyles = [
    { value: 'chekhov', label: 'Anton Chekhov', description: 'Subtext, longing, naturalistic dialogue, emotional undercurrents' },
    { value: 'brecht', label: 'Bertolt Brecht', description: 'Epic theatre, alienation, didactic, political commentary' },
    { value: 'beckett', label: 'Samuel Beckett', description: 'Minimalist, pauses, existential uncertainty' },
    { value: 'miller', label: 'Arthur Miller', description: 'American tragedy, moral struggle, social critique' },
    { value: 'shepard', label: 'Sam Shepard', description: 'American mythology, fragmented identity, lyricism' },
    { value: 'mamet', label: 'David Mamet', description: 'Staccato rhythms, repetition, interrupted speech' },
    { value: 'mcdonagh', label: 'Martin McDonagh', description: 'Dark comedy, violence, Irish vernacular, moral ambiguity' },
  ];

  const stylePrompts = {
    chekhov: `Transform this into a theatrical monologue in Anton Chekhov's style:
- Naturalistic, conversational dialogue with rich subtext
- Characters expressing longing, regret, or unfulfilled desires
- Emotional undercurrents beneath seemingly mundane speech
- Pauses that reveal inner life
- References to time passing, seasons, or the countryside
- A sense of melancholy mixed with gentle humor`,

    brecht: `Transform this into a theatrical monologue in Bertolt Brecht's style:
- Epic theatre: the speaker is aware they are performing
- Alienation effect — breaking the fourth wall, addressing the audience directly
- Didactic, instructive tone with political commentary
- Songs or verse interspersed with prose
- Social and economic critique embedded in personal narrative
- Rational argumentation over emotional identification`,

    beckett: `Transform this into a theatrical monologue in Samuel Beckett's style:
- Use extensive pauses and silence as structural elements
- Ambiguous, minimalist stage directions ("sits. Or stands. It doesn't matter")
- Sparse, fragmented language
- Existential uncertainty and paradox
- Physical gestures that carry philosophical weight
- End with an ambiguous or paradoxical stage direction`,

    miller: `Transform this into a theatrical monologue in Arthur Miller's style:
- American tragedy: ordinary people facing moral crises
- Earnest, direct language with building emotional intensity
- Themes of guilt, responsibility, and social obligation
- The weight of family expectations and legacy
- Confession or self-reckoning as dramatic engine
- A sense of dignity in the face of defeat`,

    shepard: `Transform this into a theatrical monologue in Sam Shepard's style:
- American landscape and mythology
- Fragmented sense of identity
- Lyrical, poetic language mixed with vernacular
- References to family, land, legacy
- Visceral, physical imagery
- Oscillation between myth and reality`,

    mamet: `Transform this into a theatrical monologue in David Mamet's style:
- Staccato rhythms with "Beat." after thoughts
- Interrupted, self-correcting speech ("It's not— Look.")
- Direct, confrontational address
- Strategic profanity for emphasis
- Repetition of key phrases for rhythmic impact
- Short, punchy sentences that build momentum`,

    mcdonagh: `Transform this into a theatrical monologue in Martin McDonagh's style:
- Dark comedy with sudden shifts between humor and violence
- Irish vernacular and colloquial speech patterns
- Morally ambiguous characters who justify terrible actions
- Storytelling within storytelling — anecdotes and digressions
- Blunt, profane language with poetic undertones
- A mix of cruelty and tenderness`
  };

  const generateMonologue = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to transform');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedMonologue('');
    setCurrentView('result');

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

  const goBack = () => {
    setCurrentView('input');
    setGeneratedMonologue('');
    setError('');
  };

  const openPlaywrightSelect = () => {
    setCurrentView('selectPlaywright');
  };

  const selectPlaywright = (value) => {
    setSelectedStyle(value);
    setCurrentView('input');
  };

  const selectedStyleLabel = playwrightStyles.find(s => s.value === selectedStyle)?.label || '';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white text-black p-4 md:p-6 font-light" style={{ fontFamily: 'Georgia, serif', paddingTop: 'calc(env(safe-area-inset-top) + 16px)', paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)', paddingLeft: 'calc(env(safe-area-inset-left) + 16px)', paddingRight: 'calc(env(safe-area-inset-right) + 16px)' }}>
      <div className="flex-1 min-h-0 overflow-hidden">
        {currentView === 'input' ? (
          <InputPage
            inputText={inputText}
            setInputText={setInputText}
            selectedStyle={selectedStyle}
            playwrightStyles={playwrightStyles}
            onGenerate={generateMonologue}
            onSelectPlaywright={openPlaywrightSelect}
            error={error}
          />
        ) : currentView === 'selectPlaywright' ? (
          <PlaywrightSelectPage
            playwrightStyles={playwrightStyles}
            selectedStyle={selectedStyle}
            onSelect={selectPlaywright}
            onBack={() => setCurrentView('input')}
          />
        ) : (
          <ResultPage
            isLoading={isLoading}
            generatedMonologue={generatedMonologue}
            error={error}
            selectedStyleLabel={selectedStyleLabel}
            onBack={goBack}
          />
        )}
      </div>

      <div className="shrink-0 pt-4 text-center text-black text-sm">
        <p>Powered by Claude AI • Transform conversations into theatrical art</p>
      </div>
    </div>
  );
}
