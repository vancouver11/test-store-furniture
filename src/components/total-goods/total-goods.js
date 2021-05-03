import React, { Fragment } from 'react';
import './total-goods.css';

const TotalGoods = ({count}) =>{

    return(
        <Fragment>
            <i className="bi bi-cart4"></i>
            <span>({count}) товаров</span>
        </Fragment>
        
    )
}

export default TotalGoods;