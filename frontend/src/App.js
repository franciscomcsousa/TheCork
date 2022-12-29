import './App.css';
import React from 'react'
import { Register } from './Pages/Register'
import { Homepage } from './Pages/Homepage'
import { GiftCards } from './Pages/GiftCards'
import { RedeemCards} from './Pages/Redeem'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={ <Homepage/> }/>
            <Route exact path="/register" element={ <Register/> }/>
            <Route exact path="/gift_cards" element={ <GiftCards/> }/>
            <Route exact path="/redeem_cards" element={ <RedeemCards/> }/>
          </Routes>
      </Router>
    </div>
  );
}
export default App;