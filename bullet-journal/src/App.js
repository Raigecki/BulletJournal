import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Components/Journal/VerticalLayout/Layout';
import WeekView from './Components/Journal/VerticalLayout/WeekView';
import DayView from './Components/Journal/VerticalLayout/DayView';

function App() {
  return (
    <div className="App">
      {/* <Layout /> */}
      {/* <WeekView /> */}
      <DayView />
    </div>
  );
}

export default App;
