import React, { useState } from 'react'

import './App.css';

import horn from './images/horn_icon.png'

function ShopMin({inventory, setScreen}) {

  if (inventory < 2) {
    return null
  }

  return (
    <div className="Div-Shop-Min">
      <img src={horn} className='Shop-Icon' onClick={() => setScreen(3)}/>
        {/* <h2>Blow in the horn</h2>  */}
    </div>
  );
}

export default ShopMin;
