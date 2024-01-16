import logo from './logo.svg';
import cabin from './cabin_myst_bw_1.jpg'
import './App.css';

import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link className="Button-home" to={`game`}>ENTER</Link>
        <img src={cabin} className="Img-home" alt="logo" />
      </header>
    </div>
  );
}

export default App;
