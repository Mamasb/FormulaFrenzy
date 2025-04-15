// src/pages/Game.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  questionText: string;
}

const Game: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // Simulate fetching a question from the backend API
  useEffect(() => {
    // Temporarily use a static question; replace with an API call later.
    const fakeQuestion: Question = {
      id: 1,
      questionText: 'What is the area of a rectangle with width 5 and height 10?',
    };
    setQuestion(fakeQuestion);

    // Example API call:
    // axios.get<Question>('http://localhost:5000/api/get_question')
    //   .then(response => setQuestion(response.data))
    //   .catch(error => console.error('Error fetching question', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() === '50') {
      setFeedback('Correct answer!');
    } else {
      setFeedback('Incorrect answer. Try again.');
    }
  };

  return (
    <div className="Game">
      {question ? (
        <>
          <h2>Question:</h2>
          <p>{question.questionText}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your Answer"
            />
            <button type="submit">Submit Answer</button>
          </form>
          {feedback && <p>{feedback}</p>}
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default Game;
