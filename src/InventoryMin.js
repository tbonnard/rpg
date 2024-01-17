import React, { useState } from 'react'

import './App.css';

function InventoryMin({items, inventory, setScreen}) {

  if (inventory === 0) {
    return null
  }

  return (
    <div className="Div-items">
        <h2 onClick={() => setScreen(2)}>Inventory</h2>
        {items.map(i => <p key={i.id}>{i.name}</p>)}
    </div>
  );
}

export default InventoryMin;
