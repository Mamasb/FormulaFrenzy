// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <h1>Welcome to Formula Frenzy!</h1>
      <p>An engaging math game for grades 7-9.</p>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default Home;
