import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { calculateTotalSumm, calculateTotalGoods } from '../../actions';
import TotalGoods from '../total-goods';
import TotalSumm from '../total-summ/';
import './header.css';

const Header = ({totalSumm, totalGoods, cart, calculateTotalSumm,calculateTotalGoods }) => {

    useEffect(() => {
       

        let summ = cart.reduce( (summ, product) => {
            return {
                count: summ.count + product.count,
                money: summ.money + product.priceProduct
            }
        },{count:0, money:0});
      
        calculateTotalSumm(summ.money);
        calculateTotalGoods(summ.count)
    })

    return(
        <div className="header">
            <div className="logo">
                <Link to= '/'>Магазин Мебели</Link>
            </div>
            <Link to ='/cart'>
                <div className="cart-header">
            
                    <div className="count-header">
                        <TotalGoods count={totalGoods}/>
                    </div>
                
                    <div className="total-header">
                        <TotalSumm totalSumm={totalSumm} text='На сумму - '/>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}

const mapStateToProps = ({totalSumm, cart, totalGoods}) =>{
    return{
        totalSumm,
        cart,
        totalGoods
    }
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        calculateTotalSumm,
        calculateTotalGoods,
    },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
