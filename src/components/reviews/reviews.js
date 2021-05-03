import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reviewsLoaded } from '../../actions';
import compose from '../../utils/compose';
import { withFurnitureStoreService } from '../hoc';
import ReviewsWindow from '../reviewsWindow/reviewsWindow';

const Reviews = ({ numProduct,furnitureService,reviewsLoaded, reviews}) =>{

    const [reviewWindow, setReviewWindow] = useState(false);

  
    const setVisibleReview = () =>{
        furnitureService.getReviews(numProduct).then(data => reviewsLoaded(data))
        setReviewWindow(preReviewWindow => !preReviewWindow ) 
     }

     const  setVisibleforClose = () =>{
         setReviewWindow(false);
     }
    
    
     const visibleReviews =  reviewWindow ? true: false;
    return(
        <Fragment>
            <div className = "reviews-button">
                <span onClick = {setVisibleReview}>
                    Посмотреть Отзывы
                </span>
            </div> 
           
        
          <ReviewsWindow 
                reviews ={reviews} visibleReviews = {visibleReviews} setVisibleforClose= {setVisibleforClose} />
         </Fragment>
    )
   
}

const mapStateToProps = ({reviews}) =>{
    return {reviews}
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        reviewsLoaded
    },
        dispatch
    )

};



export default compose(
    withFurnitureStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
 )(Reviews)



