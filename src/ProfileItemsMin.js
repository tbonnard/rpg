import React, { useState } from 'react'

import './App.css';

function ProfileItemsMin({items, inventory}) {

  if (inventory === 0) {
    return null
  }

  return (
    <div className="Div-items">
        <p>Inventory</p>
        {items.map(i => <p key={i.id}>{i.name}</p>)}
    </div>
  );
}

export default ProfileItemsMin;
