// src/pages/Game.tsx
import React, { useState, useEffect } from 'react';
import './Game.css';

interface Question {
  id: number;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  section: 'A' | 'B';
  explanation?: string;
  marks: number;  // Marks for the question
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    questionText: 'A mother had seven children, four of her children died. She was blessed with one more child. How many children does the mother have now?',
    options: ['7', '4', '3', '1'],
    correctAnswer: '4',
    section: 'A',
    explanation: '7 children - 4 died = 3 alive. Then 1 more was born → 3 + 1 = 4 living children.',
    marks: 2,
  },
  {
    id: 2,
    questionText: 'Convert 1/3 as a decimal.',
    options: ['0.3', '1.3', '2.3', '0.3'],
    correctAnswer: '0.3',
    section: 'A',
    explanation: '1 ÷ 3 = 0.333... (repeating). Rounded to 1 decimal place = 0.3.',
    marks: 2,
  },
  {
    id: 3,
    questionText: 'State the number of significant figures in the following number 2300.',
    options: ['4 s.f', '1 s.f', '2 s.f', '3 s.f'],
    correctAnswer: '2 s.f',
    section: 'A',
    explanation: 'Only 2 non-zero digits (2 and 3) are significant if trailing zeros are not counted without a decimal.',
    marks: 2,
  },
  {
    id: 4,
    questionText: 'Liam has an orchard where he has planted several fruits. The number of apple trees planted is more than six but less than ten. Represent this in an inequality.',
    options: ['6<a<10', '6<a>10', '6>a>10', '6>a<10'],
    correctAnswer: '6<a<10',
    section: 'A',
    explanation: '"More than six but less than ten" means a is greater than 6 and less than 10 → 6 < a < 10.',
    marks: 2,
  },
  {
    id: 5,
    questionText: 'What is the area of a rectangle with width 5 and height 10?',
    correctAnswer: '50',
    section: 'B',
    explanation: 'Area = width × height = 5 × 10 = 50.',
    marks: 5,
  },
  {
    id: 6,
    questionText: 'What is 12 divided by 4?',
    options: ['2', '3', '4', '6'],
    correctAnswer: '3',
    section: 'A',
    explanation: '12 ÷ 4 = 3.',
    marks: 2,
  },
  // Add additional 14 questions to make it 20 as per your request
  {
    id: 7,
    questionText: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['2', '5', '3', '10'],
    correctAnswer: '5',
    section: 'A',
    explanation: '2x + 5 = 15 → 2x = 10 → x = 5.',
    marks: 2,
  },
  {
    id: 8,
    questionText: 'What is the perimeter of a rectangle with length 8 and width 3?',
    correctAnswer: '22',
    section: 'B',
    explanation: 'Perimeter = 2 × (length + width) = 2 × (8 + 3) = 22.',
    marks: 5,
  },
  {
    id: 9,
    questionText: 'Find the mean of the following numbers: 10, 12, 15, 20, 25.',
    correctAnswer: '16.4',
    section: 'B',
    explanation: 'Mean = (10 + 12 + 15 + 20 + 25) / 5 = 82 / 5 = 16.4.',
    marks: 5,
  },
  {
    id: 10,
    questionText: 'Solve for y in the equation 4y - 7 = 21.',
    options: ['7', '5', '3', '6'],
    correctAnswer: '7',
    section: 'A',
    explanation: '4y - 7 = 21 → 4y = 28 → y = 7.',
    marks: 2,
  },
  {
    id: 11,
    questionText: 'What is the volume of a cube with side length 4?',
    correctAnswer: '64',
    section: 'B',
    explanation: 'Volume = side³ = 4³ = 64.',
    marks: 5,
  },
  {
    id: 12,
    questionText: 'What is 7 + 3 × 2?',
    options: ['16', '13', '17', '20'],
    correctAnswer: '13',
    section: 'A',
    explanation: 'Order of operations: 3 × 2 = 6, then 7 + 6 = 13.',
    marks: 2,
  },
  {
    id: 13,
    questionText: 'If a = 5 and b = 2, what is a² - b²?',
    options: ['21', '7', '10', '9'],
    correctAnswer: '21',
    section: 'A',
    explanation: 'a² - b² = 5² - 2² = 25 - 4 = 21.',
    marks: 2,
  },
  {
    id: 14,
    questionText: 'What is the area of a triangle with base 6 and height 9?',
    correctAnswer: '27',
    section: 'B',
    explanation: 'Area = 1/2 × base × height = 1/2 × 6 × 9 = 27.',
    marks: 5,
  },
  {
    id: 15,
    questionText: 'What is the value of √81?',
    options: ['7', '9', '8', '10'],
    correctAnswer: '9',
    section: 'A',
    explanation: '√81 = 9.',
    marks: 2,
  },
  {
    id: 16,
    questionText: 'What is 14 × 3?',
    options: ['42', '43', '44', '45'],
    correctAnswer: '42',
    section: 'A',
    explanation: '14 × 3 = 42.',
    marks: 2,
  },
  {
    id: 17,
    questionText: 'What is the distance traveled by a car that moves at a speed of 60 km/h for 2 hours?',
    correctAnswer: '120 km',
    section: 'B',
    explanation: 'Distance = speed × time = 60 × 2 = 120 km.',
    marks: 5,
  },
  {
    id: 18,
    questionText: 'Solve for x in the equation 3x - 4 = 11.',
    options: ['5', '6', '7', '8'],
    correctAnswer: '5',
    section: 'A',
    explanation: '3x - 4 = 11 → 3x = 15 → x = 5.',
    marks: 2,
  },
  {
    id: 19,
    questionText: 'What is 10% of 200?',
    correctAnswer: '20',
    section: 'A',
    explanation: '10% of 200 = 200 × 0.1 = 20.',
    marks: 2,
  },
  {
    id: 20,
    questionText: 'What is the volume of a cylinder with radius 3 and height 5?',
    correctAnswer: '141.37',
    section: 'B',
    explanation: 'Volume = πr²h = 3.14 × 3² × 5 = 141.37.',
    marks: 5,
  },
];

const Game: React.FC = () => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [date, setDate] = useState('');
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => {
    if (name && school && date) {
      setStarted(true);
    }
  };

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = (section: 'A' | 'B') => {
    const filtered = sampleQuestions.filter((q) => q.section === section);
    let score = 0;
    filtered.forEach((q) => {
      if (answers[q.id]?.trim() === q.correctAnswer) {
        score += q.marks;  // Add marks for correct answers
      }
    });
    return score;
  };

  const calculateTotalScore = () => {
    return calculateScore('A') + calculateScore('B');
  };

  if (!started) {
    return (
      <div className="exam-container">
        <div className="exam-card">
          <h2 className="title">Grade 8 Mathematics Exam</h2>
          <p className="subtitle">Duration: 1 hour 40 minutes</p>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="School Name" value={school} onChange={(e) => setSchool(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <button className="btn" onClick={handleStart}>Start Exam</button>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-container">
      <div className="exam-card">
        <h2 className="title">Grade 8 Mathematics Exam</h2>
        <p><strong>Name:</strong> {name} | <strong>School:</strong> {school} | <strong>Date:</strong> {date}</p>
        <p className="instructions">Instructions: Answer all questions. Section A carries 20 marks. Section B carries 30 marks. Total time: 1 hr 40 mins.</p>

        <h3 className="section-title">Section A: Multiple Choice Questions (20 marks)</h3>
        {sampleQuestions.filter((q) => q.section === 'A').map((q, index) => (
          <div key={q.id} className="question-block">
            <p>{index + 1}. {q.questionText}</p>
            {q.options?.map((opt) => (
              <label key={opt} className="option-label">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  disabled={submitted}
                /> {opt}
              </label>
            ))}
            {submitted && (
              <p className="explanation"><strong>Answer:</strong> {q.correctAnswer} | <em>{q.explanation}</em></p>
            )}
          </div>
        ))}

        <h3 className="section-title">Section B: Show Workouts (30 marks)</h3>
        {sampleQuestions.filter((q) => q.section === 'B').map((q, index) => (
          <div key={q.id} className="question-block">
            <p>{index + 1}. {q.questionText}</p>
            <textarea
              placeholder="Enter your full working and final answer here"
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
              disabled={submitted}
            />
            {submitted && (
              <p className="explanation"><strong>Answer:</strong> {q.correctAnswer} | <em>{q.explanation}</em></p>
            )}
          </div>
        ))}

        {!submitted ? (
          <button className="btn" onClick={handleSubmit}>Submit Exam</button>
        ) : (
          <div className="results">
            <h3 className="section-title">Exam Results</h3>
            <p>Section A Score: {calculateScore('A')} / 20</p>
            <p>Section B Score: {calculateScore('B')} / 30</p>
            <p><strong>Total Score:</strong> {calculateTotalScore()} / 50</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
