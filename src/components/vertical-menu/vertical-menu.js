import React, { Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from '../../utils/compose';
import FurnitureList from '../furniture-list/';
import withFurnitureStoreService from '../hoc/with-furniture-store-service';
import {brandsLoaded, brandFilterLoaded, brandFilterDeleted} from '../../actions';
import TitleBrand from '../title-brand';
import './vertical-menu.css';
import FilterPriceFromTo from '../filter-price-from-to';


const VerticalMenu = ({furnitureService, brands, brandsLoaded, brandFilterLoaded, brandFilterDeleted, option,forCart})=>{

   

    useEffect(() => {
            furnitureService.getBrands()
            .then( data => brandsLoaded(data))
            
    })

 

   

    const onSelectedBrand = (id,event) => {
       
                        if(event.target.checked){
                            brandFilterLoaded(id)
                        } else {
                            brandFilterDeleted(id)
                        }                     
    }
    
    const listBrands = brands.map (brand => {
        const {
            title,
            id
        } = brand;
      return(
          <li key={id}>
              <TitleBrand title={title} id={id} onSelectedBrand ={onSelectedBrand}/>
          </li>    

      )
    })

    let optionMenu = "";
    if (option) {

        optionMenu = (
            <Fragment>
                <h1>Производители</h1>
            
                <ul className="brend-container">
                    {listBrands}
                </ul>
            

                <h1>Фильтр по цене</h1>

               {/*  RANGE */}
               <FilterPriceFromTo/>
                    
                    {/*  RANGE */} 

       
            </Fragment>          
        )
    }
    return (
        <div className="container-vertical-menu">
            <div>
                <h1>Категории</h1>
                <FurnitureList forMenu={true} forCart ={forCart}/>
            </div>
 
            {optionMenu}

        </div>

    )
}

const mapStateToProps = (({brands,categorySelected}) => {
    return{
        brands
    }
});

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
            brandsLoaded,
            brandFilterLoaded,
            brandFilterDeleted
            
        },
        dispatch
    )
}

export default compose(
    withFurnitureStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(VerticalMenu)