import React from 'react';
import './total-summ.css'

const TotalSumm = ({text,totalSumm, nameClass=""}) => {

    return(
        <div className ="total-summ-container"><span className={nameClass}>{text}</span>{totalSumm} руб.</div>
    )
}

export default TotalSumm;