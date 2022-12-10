import React, { useState } from 'react'
import './css/operator.css';
import CardOperator from './CardOperator'

const Operator = () => {
    return (
        <div className="CardContainer">
            <CardOperator />
            <CardOperator />
        </div>
    )
}

export default Operator
