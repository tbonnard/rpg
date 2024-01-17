import React, { useState } from 'react'

import './App.css';

function ProfileInfoMin({user}) {

  return (
    <div className="Div-Profile-Min">
        <p>Hello {user.name}</p> 
        <p>{user.credits} credits // {user.experience} Xp // {user.life} HP</p>
    </div>
  );
}

export default ProfileInfoMin;
