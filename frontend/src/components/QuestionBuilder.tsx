// src/components/QuestionBuilder.tsx
import React, { useState } from 'react';
import Papa from 'papaparse';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuestionBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Export as JSON
  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import from JSON
  const importFromJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        const imported = JSON.parse(content);
        if (Array.isArray(imported)) {
          setQuestions(imported);
        }
      } catch (err) {
        alert('Invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = questions.map(q => ({
      question: q.question,
      option1: q.options[0],
      option2: q.options[1],
      option3: q.options[2],
      option4: q.options[3],
      correctAnswer: q.correctAnswer,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import from CSV
  const importFromCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const parsed = result.data.map((row: any) => ({
            question: row.question,
            options: [row.option1, row.option2, row.option3, row.option4],
            correctAnswer: parseInt(row.correctAnswer, 10),
          }));
          setQuestions(parsed);
        } catch {
          alert('Invalid CSV format.');
        }
      },
    });
  };

  return (
    <div>
      <h2>Admin Question Builder</h2>

      <div className="controls">
        <label>Import JSON: <input type="file" accept=".json" onChange={importFromJSON} /></label>
        <label>Import CSV: <input type="file" accept=".csv" onChange={importFromCSV} /></label>
        <button onClick={exportToJSON}>Export as JSON</button>
        <button onClick={exportToCSV}>Export as CSV</button>
      </div>

      <div className="preview">
        <h3>Preview Questions:</h3>
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QuestionBuilder;
