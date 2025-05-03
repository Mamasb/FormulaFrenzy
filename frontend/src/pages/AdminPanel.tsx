// src/pages/AdminPanel.tsx
import React from 'react';
import QuestionBuilder from '../components/QuestionBuilder';

const AdminPanel: React.FC = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <QuestionBuilder />
    </div>
  );
};

export default AdminPanel;
