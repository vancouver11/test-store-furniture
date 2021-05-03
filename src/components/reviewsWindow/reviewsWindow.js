import React, { Fragment } from 'react';
import './reviewWindow.css'

 
function ReviewsWindow({reviews, visibleReviews, setVisibleforClose } )
{

    let reviewsOfGood  = "Нет отзывов";
    console.log("review", reviews)
    if(reviews.length !== 0) {
        reviewsOfGood = reviews.map(review =>{
            return (
                <li key ={review.id}>
                <span className="title">{review.title}</span>
                <span className="user"><b>Автор:</b> {review.user}</span>
            </li>
            ) 
     
        });
    }

  
    
   let classVisible = visibleReviews? 'reviews' : 'no-reviews';
   

   
let window = (<Fragment>
    <div className="cross" onClick = {setVisibleforClose}>X</div>
    <ul>{reviewsOfGood} </ul>
      </Fragment>);
    return(
        <div className={classVisible}> 
                  
                    {visibleReviews?window: null}
                                   
        </div>
    )
}


export default ReviewsWindow
