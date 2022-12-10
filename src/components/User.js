import React, { useState } from 'react'
import './css/user.css';
import Card from './card'

const User = () => {
    const [showNewCard, setShowNewCard] = useState(false)
    const addCard = () => {
        setShowNewCard(!showNewCard)
    }
    return (
        <div>
            {!showNewCard && <div className="CardContainer">
                <div className="addCard" onClick={addCard}>
                    <p className="plus">+</p>
                </div>
                <Card />
                <Card />
            </div>}
            {showNewCard &&
                <form className="IMEIform">
                    <input type="text" placeholder="IMEI" className="input" />
                    <button className="submit" onClick={addCard}>Submit</button>
                </form>
            }
        </div>
    )
}

export default User
