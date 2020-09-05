import React from 'react';
import './App.css';
import DayView from './Components/Journal/VerticalLayout/DayView';
import WeekView from './Components/Journal/VerticalLayout/WeekView';

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
