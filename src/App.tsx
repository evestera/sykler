import React from 'react';
import './App.css';
import { AppContent } from './AppContent';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AppContent />
      </header>
    </div>
  );
};
