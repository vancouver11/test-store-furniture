import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import base_url from '../../utils/path';

const Product = ({title, price, img_url, id}) => {
    return(
        <Link to={id} className="link">
            <div className="product">
                <div className="title-product">{title}</div>
                <div>
                    <img 
                        src ={`${base_url}/img/${img_url}`}
                        alt={title}/>
                </div>
                <div className="price"><span className="title-price">Цена </span><span>{price} руб.</span> </div>
            </div>
        </Link>

    )
}

export default Product;