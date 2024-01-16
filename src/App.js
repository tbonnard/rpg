import logo from './logo.svg';

import cabin from './images/cabin_myst_bw_1.jpg'
import cabin_pixel from './images/cabin_pixel_art.jpg'
import cabin_pixel_ghost from './images/cabin_pixel_ghost.jpg'


import './App.css';

import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link className="Button-home" to={`game`}>START THE GAME</Link>
        <img src={cabin_pixel_ghost} className="Img-home" alt="logo" />
      </header>
    </div>
  );
}

export default App;
