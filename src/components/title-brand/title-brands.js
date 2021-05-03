import React, { Fragment } from 'react';
import './title-brands.css';

const TitleBrand = ({id, title, onSelectedBrand}) =>{
    return(
        <Fragment>
            <input type="checkbox" id={`check${id}`}
             onClick={
                 (event) => onSelectedBrand(id,event)
                }
             
             />
            <label htmlFor={`check${id}`}>{title}</label>
        </Fragment>
        
    )
}

export default TitleBrand;