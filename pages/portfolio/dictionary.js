import React, { useEffect, useState, useRef } from 'react';

const DictionaryBrowser = () => {
  const [words, setWords] = useState([]);
  const [activeWord, setActiveWord] = useState('');
  const wordRefs = useRef({});

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch('/api/words?group=true');
      const data = await response.json();
      console.log(data)
    };
    fetchWords();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveWord(entry.target.id);
          }
        });
      },
      { threshold: 0.7 }
    );

    Object.values(wordRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [words]);

  return (
    <div className="flex">
      <div className="w-1/4 h-screen overflow-y-auto border-r p-4">
        {words.map((word) => (
          <a
            key={word}
            href={`#${word}`}
            className={`block p-2 ${activeWord === word ? 'bg-blue-500 text-white' : ''}`}
          >
            {word}
          </a>
        ))}
      </div>

      <div className="w-3/4 h-screen overflow-y-auto p-4">
        {words.map((word) => (
          <div
            key={word}
            id={word}
            ref={(el) => (wordRefs.current[word] = el)}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold">{word}</h2>
            <p>Details about {word}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DictionaryBrowser;
