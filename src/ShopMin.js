import React, { useState } from 'react'

import './App.css';

function ShopMin({inventory}) {

  if (inventory === 0) {
    return null
  }

  return (
    <div className="Div-Shop-Min">
        <p>Blow in the horn</p> 
    </div>
  );
}

export default ShopMin;
