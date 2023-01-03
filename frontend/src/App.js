import './App.css';
import React from 'react'
import { Register } from './Pages/Register'
import { Homepage } from './Pages/Homepage'
import { GiftCards } from './Pages/GiftCards'
import { RedeemCards } from './Pages/RedeemCards'
import { UserProfilepage } from './Pages/UserProfilepage'
import { UserPage } from './Pages/UserPage'
import { RestaurantProfilepage } from './Pages/RestaurantProfilepage'
import { RestaurantPage } from './Pages/RestaurantPage'
import { Book } from './Pages/Book'
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
            <Route exact path="/profile" element={ <UserProfilepage/> }/>
            <Route exact path="/profile/:name" element={ <UserPage/> }/>
            <Route exact path="/restaurant" element={ <RestaurantProfilepage/> }/>
            <Route exact path="/restaurant/:name" element={ <RestaurantPage/> }/>
            <Route exact path="/book" element={ <Book/> }/>
          </Routes>
      </Router>
    </div>
  );
}
export default App;