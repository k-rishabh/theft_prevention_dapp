import React,{useState,useEffect} from "react";
import "./user.css"

const User = ({state}) =>{
    const[account,setAccount]=useState("")
    const[imei,setImei]=useState(0)
    const[stolenPhones, setStolenPhones] = useState([]);

    useEffect(()=>{
        
        const getAccount = async()=>{
            const {web3}=state
            const accounts = await web3.eth.getAccounts()
            console.log(accounts)
            setAccount(accounts[0])
        }
        state.web3 && getAccount()
    },[state,state.web3])


    const regPhone = async()=>{
        const {contract} = state;

        try {
            await contract.methods.registerPhone(imei).send({from:account});
        } catch (e) {
            setImei("You are not authorized to perform this action.");
        }

        console.log(imei);
    }

    const markSt = async()=>{
        const {contract} = state;

        try {
            await contract.methods.markStolen(imei).send({from:account});
        } catch (e) {
            setImei("You are not authorized to perform this action as you do not own this device.");
        }

        console.log(imei);
    }

    const markFo = async()=>{
        const {contract} = state;

        try {
            await contract.methods.markFound(imei).send({from:account});
        } catch (e) {
            setImei("You are not authorized to perform this action as you do not own this device.");
        }

        console.log(imei);
    }

    const findSt = async()=>{
        const {contract} = state;
        const stPhones = await contract.methods.findStolen().call({from:account});
        setStolenPhones(stPhones);
        console.log(stolenPhones);
    }

    return<div className="container">
        <h1>Theft Prevention Dapp </h1>
        <input type="text" pattern="[0-9]*" onChange={(e)=>{setImei(e.target.value)} }/>
        <button onClick={regPhone}> Register the phone</button>
        <button onClick={markSt}> Mark as stolen </button>
        <button onClick={markFo}> Mark as found </button>
        <button onClick={findSt}> View stolen phones </button>
        <h2>Stolen phones</h2>
        <div className="cardContainer">
        {stolenPhones.map((phone)=>
        <div className="card" key={phone.imei}>
            <p>IMEI</p>
            <p>{phone.imei}</p>
        </div>)}
        </div>
    </div>
}

export default User