import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchGoods, fetchGoodsWithoutSort, sortPriceGoods} from '../../actions';
import compose from '../../utils/compose';
import {withFurnitureStoreService}  from '../hoc';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';
import Product from '../product';
import EmptyGoods from '../empty-goods';
import './detail-category.css';



const DetailsCategory = ({match, brandsFilterId,sortPrice,furnitureService, goods=[], loading, error,rangeFilter,fetchGoodsWithoutSort, fetchGoods}) =>{


    useEffect(() => {

        fetchGoods(furnitureService, match.params.numCat)
     
    },[match.params.numCat,furnitureService,fetchGoods]);

    useEffect( () =>{
        if(sortPrice === "without_sort") {
            fetchGoodsWithoutSort(furnitureService, match.params.numCat)           
          }
         
    })

   
    let currentGoods = [];
    if(!brandsFilterId.length){
        currentGoods = goods;
    }else{
        for (let index = 0; index < brandsFilterId.length; index++) {
            let products =  goods.filter((product) => { 
                return product.brand ===brandsFilterId[index]
             }
    
         );
         currentGoods = [...currentGoods, ...products]
        }
    }


currentGoods =  currentGoods.filter ((product) =>{
    return (+product.price >= rangeFilter.minPrice && +product.price <= rangeFilter.maxPrice)
})

let goodsInCategory = <EmptyGoods text="Нет товаров"/>;
if(currentGoods.length !== 0) {
    
    goodsInCategory = (
    <ul className="container-goods">

        {
            sortPriceGoods(currentGoods,sortPrice).map((item) =>{
                const {
                    title,
                    price,
                    img_url,
                    id
                } = item
                return(
                    <li key={id}>
                        <Product
                            title={title}
                            price={price}
                            img_url={img_url}
                            id={id}
                        />
                    </li>
                )
            })
        }
        
    </ul>
        

    )
} 

   


    
    

    if (loading) return <Spinner/>;
    if (error) return <ErrorIndicator/>; 
        
    return( goodsInCategory )
}
const mapStateToProps = ({goods, loading, error,brandsFilterId,sortPrice,rangeFilter}) => {
    return {
        goods,
        loading,
        error,
        brandsFilterId,
        sortPrice,
        rangeFilter  
    }
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        fetchGoodsWithoutSort,
        fetchGoods
        
    },
        dispatch
    )

};
export default compose(
        withFurnitureStoreService(),
        withRouter,
        connect(mapStateToProps, mapDispatchToProps)
    )(DetailsCategory)
