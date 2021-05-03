import React, { Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import compose from '../../utils/compose';
import { withFurnitureStoreService } from '../hoc';
import {addedProductToCart, fetchProduct } from '../../actions';
import './detail-product.css';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import base_url from '../../utils/path';
import Reviews from '../reviews';


const DetailProduct = ({match, history, furnitureService, productSelected, addedProductToCart, fetchProduct}) =>{
    const {
        numCat,
        numProduct
    } = match.params;
    

     useEffect(()=> {
         
         fetchProduct(furnitureService, numCat ,numProduct)
       
    });   

   const{
       title,
       img_url,
       price,
       available
   } = productSelected;


    
    return(
        <Fragment>
        <BreadCrumbs titleProduct = {title}/>
        <div className="details-product">
         
                <div className="contain-details-product">
                    <div className="title-product">
                     {title}
                    </div>
                     
                    <img 
                            src ={`${base_url}/img/${img_url}`}
                            alt={title}/>
                    
                </div>
                <div className="more-details-product">
                    <div className="details-product-text">
                        <h2>Описание товара</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?
                    </div>
                    <div className="details-product-price">
                            <span>Цена - </span>{price} руб.
                    </div>
                    <div className="details-product-availible">
                        <span>В наличие - </span>{available} шт.
                    </div>
                    <div className="details-product-button">
                        <button onClick ={() => {
                                addedProductToCart(productSelected);
                                setTimeout(() => {
                                    history.push('/cart')
                                }, 700);
                                
                            }}>Добавить в корзину</button>
                        <div className="details-product-reviews">
                            <Reviews numProduct = {numProduct} />
                        </div>
                    </div>


                </div>


            
        </div>
        </Fragment>
    )
}

const mapStateToProps = ({productSelected, cart}) =>{
    return{
        productSelected,
        cart
    }
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        fetchProduct,
        addedProductToCart
    },
        dispatch
    )

};



export default compose(
   withFurnitureStoreService(),
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(DetailProduct)



