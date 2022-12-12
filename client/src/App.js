import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import TheftPrevention from "./contracts/TheftPrevention.json";
import "./App.css";
import User from "./components/user"


const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = TheftPrevention.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          TheftPrevention.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    }; 
    init();
  }, []);

  return (
    <div className="App">
      <User state={state}/>
    </div>
  );
};
export default App;
