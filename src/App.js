import React, { useState } from 'react'
import './App.css';
import User from './components/User'
import Operator from './components/Operator'


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(!loggedIn)
  }
  return (
    <div className="App">
      <h1>Theft Prevention Dapp</h1>
      {!loggedIn && <form className="formContainer">
        <input type="text" placeholder="Username" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <select name="languages" id="lang" className="inputDrop">
          <option value="user" className="options">User</option>
          <option value="operator" className="options">Operator</option>
        </select>
        <button className="submit" onClick={logIn}>Submit</button>
      </form>}
      {/* {loggedIn && <Operator />} */}
      {loggedIn && <User />}
    </div>
  );
}

export default App;
