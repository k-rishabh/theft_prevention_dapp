import React from 'react'
import './css/card.css';
const card = () => {
    return (
        <div className="Card">
            <p className="top">IMEI:</p>
            <p className="top">231948792384</p>
            <button className="button lost">Lost</button>
            <button className="button found">Found</button>
        </div>
    )
}

export default card
