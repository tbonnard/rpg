import React, { useState } from 'react'

import './App.css';

function ShopMin({inventory}) {

  if (inventory === 0) {
    return null
  }

  return (
    <div className="Div-Shop-Min">
        <p>Shop</p> 
    </div>
  );
}

export default ShopMin;
