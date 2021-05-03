import React, { useState } from 'react';
import { Fragment } from 'react';
import './button-buy.css'

const ButtonBuy = ({cartCleared}) =>{
    
    const [modal,setModal] = useState(false);
    let info="";
    if(modal) {
        info = (
        <div className ="fullwindow">
            <div className="thanks">
                Благодарим Вас за покупку
            </div>
            
        </div>
        )
    }
        return(
            <Fragment>
            {info}
            <button className="order" onClick = {
               () =>{
                   setModal(true)
                setTimeout(cartCleared, 2500)
               } 
            }>Купить</button>
            </Fragment>
        )
    
    

}

export default ButtonBuy;