import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import './App.css';
import GameEvents from './GameEvents';
import ProfileInfoMin from './ProfileInfoMin';
import ProfileItemsMin from './ProfileItemsMin';
import ShopMin from './ShopMin';


function Game() {

  const user = useSelector(state => state.user)

  return (
    <div className="App">
      <ProfileInfoMin user={user}/>
      <ProfileItemsMin items={user.items} inventory={user.inventory}/>
      <GameEvents  user={user}/>
      <ShopMin inventory={user.inventory}/>
    </div>
  );
}

export default Game;
