import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import compose from '../../utils/compose';
import {selectedCategory} from '../../actions';
import './furniture-list-item.css';


const FurnitureListItem = ({category, forMenu,selectedCategory}) => {
    const {title, url, id} = category;
    
    let classElement = "";
    if(!forMenu){
        classElement = "furniture-list-item";
    }
    const shop = '/shop/' + url + '/' + id + '/';

   
    return (
        <div className={classElement} >
            <Link to={shop} onClick = {() => {selectedCategory(url)}}>
                <span>{title}</span> 
            </Link>
        </div>
    )

}

const mapDispatchToProps ={selectedCategory }
                  
                

    

export default compose(
    withRouter,
    connect(null,mapDispatchToProps)
)(FurnitureListItem);



