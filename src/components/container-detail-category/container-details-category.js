import React,{Fragment} from 'react';
import DetailsCategory from '../details-category';
import VerticalMenu from '../vertical-menu';
import FilterPrice from '../filter-price';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectedIncDecSort} from '../../actions';

const ContainerDetailsCategory = ({selectedIncDecSort}) => {

    return (
        <Fragment>
            <FilterPrice  selectedIncDecSort = {selectedIncDecSort}/>
            <div className ="container-detail-category">
                <VerticalMenu option={true}/>
                <DetailsCategory/>
            </div>
        </Fragment>
    )

}

 const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        selectedIncDecSort     
    },
    dispatch
    )} 

export default connect(null, mapDispatchToProps)(ContainerDetailsCategory)