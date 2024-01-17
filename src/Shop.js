import React, { useState } from 'react'

import './App.css';


function Shop({setScreen}) {


  return (
    <div className="App">
        <h2>Shop</h2> 
        <button onClick={() => setScreen(1)}>close</button>
    </div>
  );
}

export default Shop;
