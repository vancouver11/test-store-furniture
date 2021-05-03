import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { labelClear,fetchCategories } from '../../actions';
import compose from '../../utils/compose';
import FurnitureListItem from '../furniture-list-item';
import withFurnitureStoreService from '../hoc/with-furniture-store-service';
import './furniture-list.css';


const FurnitureList = ({categories=[],furnitureService,categorySelected, forMenu,match,forCart, labelClear, fetchCategories}) =>{
    
    useEffect(() =>{
    
               fetchCategories(furnitureService, match.params.id)
  
    });

    useEffect( () => {

        labelClear(categorySelected, forMenu, forCart);

    }, [categorySelected, forMenu, forCart, labelClear])

  
    

    let classElement = "";
    if(!forMenu){
        classElement = "furniture-list";
    }

    return (
        <ul className={classElement}>
            {
                categories.map((category) => {
                    return (
                        <li key={category.id} className={categorySelected===category.url? "selected-cat": ""}>
                            <FurnitureListItem category={category} forMenu ={forMenu}/>
                        </li>
                    )
                })
            }   
        </ul>
    )
}

const mapStateToProps = ({ categories,categorySelected }) => {
    return { categories, categorySelected }
}

const mapDispatchToProps = (dispatch) => {
    return  bindActionCreators({
               labelClear,
               fetchCategories         
            }, 
            dispatch
        )

    }

export default compose(
    withFurnitureStoreService(),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FurnitureList);

