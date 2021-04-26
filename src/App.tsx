import React from 'react';

import styles from './App.module.css';

import LeftCard from './components/LeftCard/LeftCard';
import RightCard from './components/RightCard/RightCard';

function App() {
  return (
    <div className={`${styles.App}`}>
      <h1>Current Weather</h1>
      <div className={`${styles.AppContent}`}>
        <LeftCard />
        <RightCard />
      </div>
    </div>
  );
}

export default App;
