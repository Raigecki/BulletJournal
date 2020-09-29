import React, {useState} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import DayView from './Components/Journal/VerticalLayout/DayView';
import WeekView from './Components/Journal/VerticalLayout/WeekView';
import LoginModal from './Components/UserAuth/LoginModal';
import RegisterModal from './Components/UserAuth/RegisterModal'

function App() {

  const [auth, setAuth] = useState(null)

  return (
    <div className="App">
      {/* <Layout /> */}
      {/* <WeekView /> */}
      {/* <DayView /> */}
      {/* <RegisterModal /> */}
      {/* <LoginModal /> */}
      <Router>
        <Switch>
          <Route exact path="day_view">
            <DayView auth={auth} setAuth={setAuth}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
