import React, { useState, useEffect, useRef } from 'react';

const TypingGame = () => {
  const [text] = useState("Type this sentence as fast as you can!");
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0 && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const wordsTyped = userInput.trim().split(/\s+/).length;
      setWpm(Math.floor(wordsTyped / timeElapsed));
    }
  }, [userInput]);

  return (
    <div className="w-full max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">🏁 Typing Speed</h1>

      <p className="text-yellow-300 bg-gray-800 p-4 rounded">
        {text}
      </p>

      <textarea
        ref={inputRef}
        className="w-full p-4 rounded bg-gray-700 text-white focus:outline-none resize-none"
        rows="3"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Start typing..."
      />

      <p className="text-lg">
        ⏱️ WPM: <span className="font-bold text-green-400">{wpm}</span>
      </p>

      <div className="relative w-full h-24 bg-gray-800 rounded overflow-hidden">
        <div
          className="absolute top-6 left-0 w-12 h-12 bg-blue-500 rounded-full transition-all duration-100"
          style={{ transform: `translateX(${wpm * 5}px)` }}
        ></div>
        <p className="absolute bottom-2 right-2 text-xs text-gray-400">Car moves with your typing speed!</p>
      </div>
    </div>
  );
};

export default TypingGame;
