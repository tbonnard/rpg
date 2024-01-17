import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import './App.css';
import GameEvents from './GameEvents';
import ProfileInfoMin from './ProfileInfoMin';
import InventoryMin from './InventoryMin';
import ShopMin from './ShopMin';
import Shop from './Shop';
import Inventory from './Inventory';

// Screen 1: game ---- Screen 2: Inventory ---- Screen 3: Shop 

function Game() {

  const user = useSelector(state => state.user)

  const [ screen, setScreen ] = useState(1)


  return (
    <div className="App">
        <ProfileInfoMin user={user}/>
      {screen === 1 ? 
      <>
        <InventoryMin items={user.items} inventory={user.inventory} setScreen={setScreen}/>
        <GameEvents user={user}/>
        <ShopMin inventory={user.inventory} setScreen={setScreen}/>
      </>
      :
      <></>
      }

      {screen === 2 ? 
      <>
        <Inventory setScreen={setScreen} />
      </>
      :
      <></>
      }

      {screen === 3 ? 
      <>
        <Shop setScreen={setScreen}/>
      </>
      :
      <></>
      }

    </div>
  );
}

export default Game;
