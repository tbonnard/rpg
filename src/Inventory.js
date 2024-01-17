import React, { useState } from 'react'

import './App.css';


function Inventory({setScreen}) {

  return (
    <div className="App">
        <h2>Inventory</h2> 
        <button onClick={() => setScreen(1)}>close</button>
    </div>
  );
}

export default Inventory;
