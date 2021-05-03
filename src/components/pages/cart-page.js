import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addedProductToCart,productRemoved, productRemovedAll, cartCleared} from '../../actions';
import TotalSumm from '../total-summ';
import VerticalMenu from '../vertical-menu';
import './cart-page.css';
import base_url from '../../utils/path';
import ButtonBuy from '../button-buy/';
import { Fragment } from 'react';


const CartPage = ({cart,  totalSumm, onInc, onDec, onDelete, cartCleared}) => {
    
    const productInCart = cart.map((product) =>{
        const {
            title,
            priceProduct,
            img_url,
            count,
            id
        } = product;



        return (
            <tr key={id}>
                <td><img src ={`${base_url}/img/${img_url}`} alt=""/></td>
                <td>{title}</td>
                <td>{priceProduct} </td>
                <td>{count}</td>
                <td>
                    <i className="bi bi-dash-square" onClick={ () => onDec(product)}></i>
                    <i className="bi bi-plus-square" onClick={ () => onInc(product)}></i>
                    <i className="bi bi-trash" onClick={ () => onDelete(product)}></i>
         </td>
            </tr>
        )
  
    })

    let content = (
        <Fragment>
        <h1>Ваша Корзина</h1>
        <table className="cart-table-info">
            <thead>
                <tr>
                    <th>Фото</th>
                    <th>Наименование</th>
                    <th>Цена (руб.)</th>
                    <th>Кол-во</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                 {productInCart}           
            </tbody>
        </table>
        <div className="total-summ-cart">
                <TotalSumm totalSumm ={totalSumm} text='Сумма заказа: ' nameClass ="total-summ"/>
        </div>
        <div>
                <ButtonBuy cartCleared ={cartCleared} />
        </div>

        </Fragment>
    )

    if(totalSumm === 0){
          content = "Корзина пуста"             
    }
    return(
        <div className ="container-detail-page-cart">
        <VerticalMenu forCart ={true}/>
        
       <div className="cart-page-container">
           {content}


        </div>
        </div>
    )
       

}

const mapStateToProps = ({cart, totalSumm}) => {
    return{
        cart, 
        totalSumm
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
            onInc: addedProductToCart,
            onDec: productRemoved,
            onDelete: productRemovedAll,
            cartCleared
        }, dispatch)
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

