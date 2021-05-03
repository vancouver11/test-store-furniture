import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './filter-price-from-to.css';
import {rangeFilterLoaded, fetchRange} from '../../actions'
import compose from '../../utils/compose';
import { withFurnitureStoreService } from '../hoc';

const FilterPriceFromTo = ({categorySelected,rangeFilterLoaded, fetchRange, rangeFilter, furnitureService, rangePrice}) =>{
  
    const resetFilter = ()=>{
        toggleMax.current.style.left = scale.current.offsetWidth + 'px'
        toggleMin.current.style.left = scale.current.offsetLeft + 'px'
        inputMin.current.value = rangePrice.minPrice; 
        inputMax.current.value = rangePrice.maxPrice; 
    }

  


   
    useEffect( () =>{    
        resetFilter()
       fetchRange(furnitureService);
         
    }, [categorySelected]);

    useEffect( () =>{
        fetchRange(furnitureService);
    },[fetchRange, furnitureService])

    useEffect( () =>{
        rangeFilterLoaded(rangePrice);
        resetFilter()       
    }, [rangePrice, rangeFilterLoaded]);

    
    let toggleMin = React.createRef();
    let toggleMax = React.createRef();
    let inputMin = React.createRef();
    let inputMax = React.createRef();
    let scale= React.createRef();
    let range= React.createRef();
    let max = rangePrice.maxPrice;
    let min = rangePrice.minPrice ;
    let posmax = Math.floor((rangeFilter.maxPrice  * (160)/max))  || 160 ;
    let posmin =Math.floor(rangeFilter.minPrice * (160)/max) - (10/2) || 0  ;
    

     
    let minPrice = rangeFilter.minPrice;
    let maxPrice = rangeFilter.maxPrice;
   
 
    

    const moveRange = (direction) =>{
        
            const move = (e) => {
                
        
                    let leftIndent = scale.current.offsetLeft  ;  
                    let sizeScale = scale.current.offsetWidth
                    let shift = (toggleMin.current.offsetWidth/2) ;
                   
                    if (direction === 'left'){
                        toggleMin.current.style.left = e.pageX - shift + 'px';
                        if(e.pageX <= leftIndent + shift){
                            minPrice = rangePrice.minPrice;
                            posmin = leftIndent ;
                         
                            toggleMin.current.style.left = posmin + "px"
                        }
                        if(e.pageX >= sizeScale){
                           toggleMin.current.style.left = sizeScale +shift  + 'px';
                                 
                        }
                        if(e.pageX >= posmax) {
                            
                            toggleMin.current.style.left = posmax  - shift   + 'px';
                            
                        }
    
                        if(e.pageX < sizeScale && e.pageX < posmax){
                            posmin = e.pageX;
                            
                            //console.log(Math.floor((maxPrice * posmin)/(scale.current.offsetWidth -1)))
                            minPrice = Math.floor((max * posmin)/(sizeScale -1)) 
                            inputMin.current.value = minPrice
                        } 

                     
                    }
                   
    //right----------------------------------------------------
                    if (direction === 'right'){
                        toggleMax.current.style.left = e.pageX -shift + 'px';
                        
                    if(e.pageX <= leftIndent) {
                        maxPrice =  leftIndent 
                        toggleMax.current.style.left = maxPrice -  + 'px'    
                        }  
                        if(e.pageX >= sizeScale){
                            maxPrice = sizeScale-shift
                            toggleMax.current.style.left = maxPrice + 'px'    
                        }

                        if(e.pageX <= posmin) {
                        // console.log("posmin - " + posmin)
                        maxPrice = posmin -shift
                            toggleMax.current.style.left =  maxPrice + 'px'   
                        }
                        if(e.pageX < sizeScale && e.pageX  >=  leftIndent && e.pageX > posmin){
                            posmax = e.pageX;
                            //console.log(scale.current.offsetWidth)
                            //console.log(Math.floor((maxPrice * posmax)/(scale.current.offsetWidth -1)))
                            maxPrice = Math.floor((max * posmax)/(sizeScale -1))
                            inputMax.current.value = maxPrice
                        }   
                        if(posmax<=posmin) {
                            
                            toggleMax.current.style.left = posmin
                        }
    
                    }



             }
                          
             document.onmousemove = move;
             document.onmouseup = function (){
                 document.onmouseup = document.onmousemove  =null;
             }
             toggleMin.current.addEventListener('mouseup',() =>{
             
                 document.removeEventListener('mousemove', move)
             } )
            }

    const minSetPriceFilter =   () =>{
                    
        minPrice = +inputMin.current.value;
        if(maxPrice <= min) {
            inputMin.current.value = min;
        }
        if (minPrice >= maxPrice ) {
            posmin = posmax - (toggleMin.current.offsetWidth/2)
            toggleMin.current.style.left =  posmin  + 'px';
           inputMin.current.value = maxPrice;
           
        }else{
            
            posmin =  Math.floor(inputMin.current.value * (scale.current.offsetWidth -1)/max) - (toggleMin.current.offsetWidth/2) ;
            toggleMin.current.style.left = posmin + 'px';
        }
        
        
    }

    const maxSetPriceFilter = () =>{
        maxPrice = +inputMax.current.value
        if(maxPrice >= max) {
            inputMax.current.value = max;
        }
        if (maxPrice <= minPrice ) {
            posmax = posmin
            toggleMax.current.style.left = posmax+ 'px';  
            //inputMax.current.value= minPrice   
            
        }else {
            posmax  =  Math.floor((inputMax.current.value * (scale.current.offsetWidth -1)/max))
            toggleMax.current.style.left = posmax + 'px';
        }
       
        
      
    }

    const StartFilter =   () => {
        if(maxPrice >= minPrice ){

            rangeFilterLoaded({minPrice, maxPrice});
            posmax = Math.floor((maxPrice * (scale.current.offsetWidth -1)/max));
            posmin = Math.floor(minPrice* (scale.current.offsetWidth -1)/max) - (toggleMin.current.offsetWidth/2) ;

        }else{
            
            inputMax.current.value = minPrice;
            maxPrice=minPrice
            rangeFilterLoaded({minPrice, maxPrice});
            
        }
    }

        
    

    
    return(
        <div className="filter-range">
                                
            <div className="price-controls">
                <label className="min-price">от </label> <input type="text" name="min-price" ref = {inputMin}  
                onChange = {minSetPriceFilter }
                />
                <label className="max-price">до</label>  <input type="text" name="max-price" ref = {inputMax} 
                 onChange ={maxSetPriceFilter}
                
                />
            </div>
            <div className="range-controls"  ref={range} >
                <div className="scale" ref ={scale} >
                <div className="bar"></div>
                </div>
                <div className="range-toggle range-toggle-min" style={{backgroundColor:'yellow'}} ref= {toggleMin} onMouseDown = {(e) => moveRange('left')}
                
                onDragLeave= {
                    () => {
                        return false
                    }
                }></div>
                <div className="range-toggle range-toggle-max" ref= {toggleMax} onMouseDown = {(e) => moveRange( 'right')}
                
                onDragLeave= {
                    () => {
                        return false
                    }
                }></div>
            </div>
            <button className="btn-transparent" type="submit" onClick ={ StartFilter }>Показать</button>
            <button className="btn-transparent" type="submit" onClick ={ () => {console.log("minPrice - " + minPrice, "maxPrice - " + maxPrice);resetFilter(); rangeFilterLoaded({minPrice:0, maxPrice:max})}}>Сбросить</button>
        </div> 
    )
}

const mapStateToProps = ({categorySelected,rangeFilter,rangePrice }) => {
    return { categorySelected, rangeFilter, rangePrice }
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        rangeFilterLoaded,
        fetchRange
        },
        dispatch
    )
}

export default 
compose(
    withFurnitureStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(FilterPriceFromTo)
