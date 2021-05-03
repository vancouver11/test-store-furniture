import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { setBreadCrumbs } from '../../actions';
import compose from '../../utils/compose';
import { withFurnitureStoreService } from '../hoc';
import './bread-crumbs.css';

const BreadCrumbs = ({match, furnitureService, setBreadCrumbs, titleProduct,breadCrumbsCategoryTitle}) => {

    const {
        id,
        numCat,
        numProduct
    } = match.params;
    
  
    //let setBreadCrumbsBack = useCallback(() => { setBreadCrumbs(furnitureService, numCat)},[furnitureService, numCat,setBreadCrumbs])
    
    
    useEffect(() =>{
        setBreadCrumbs(furnitureService, numCat)
    });
    return(
        <div className="bread-crumbs-container">
            <span><Link to = '/'>Мебель</Link></span> &gt;
            <span><Link to={`/shop/${id}/${numCat}/`}>{breadCrumbsCategoryTitle}</Link></span> &gt;
            <span className="selected"><Link to={`/shop/${id}/${numCat}/${numProduct}`}>{titleProduct}</Link></span>
        </div>
    )
}

const mapStateToProps = (({breadCrumbsCategoryTitle}) => {
    return{
        breadCrumbsCategoryTitle
    }
});

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        setBreadCrumbs
    },
        dispatch
    )

};

export default compose(
        withFurnitureStoreService(),
        connect(mapStateToProps, mapDispatchToProps),
        withRouter,
    )(BreadCrumbs);



