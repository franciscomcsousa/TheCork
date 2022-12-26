import './App.css';
import React from 'react'
import { Register } from './Pages/Register'
//import { Homepage } from './Pages/Homepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            {/* <Route exact path="/" element={<Homepage/>}/> */}
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;