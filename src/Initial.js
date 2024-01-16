import logo from './logo.svg';
import cabin from './cabin_myst.jpg'
import './App.css';

import { Link } from "react-router-dom";


function Initial() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="" >this is the game!!!</p>
        <Link className="Button-home" to={`../game`}>START</Link>
        <p>in an abandoned forest, here you are, alone, trying to find an escape after being chased by monsters.Your only option, keep moving forward</p>    
      </header>
    </div>
  );
}

export default Initial;
