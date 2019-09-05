import React from 'react';
import './App.css';
import { AppContent } from './AppContent';

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-content">
        <AppContent />
      </div>
    </div>
  );
};
