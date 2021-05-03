import {
    CATEGORIES_LOADED,
    ERROR,
    GOODS_LOADED,
    NEW_REQUEST,
    PRODUCT_LOADED,
    ADDED_PRODUCT_TO_CART,
    PRODUCT_REMOVED,
    PRODUCT_REMOVED_ALL,
    BREAD_CRUMBS_CATEGORY_TITLE,
    CALСULATE_TOTAL_SUMM,
    CALСULATE_TOTAL_GOODS,
    BRANDS_LOADED,
    BRAND_FILTER_LOADED,
    CLEAR_BRAND_FILTER_LOADED,
    BRAND_FILTER_DELETED,
    SELECTED_CATEGORY,
    INC_DEC_SORT,
    REVIEWS_LOADED,
    RANGE_FILTER,
    RANGE_LOADED,
    CART_CLEARED
} from '../actionsTypes';






const cartCleared= (payload) =>{
    return {
        type: CART_CLEARED,
    }
}


const categoriesLoaded = (payload) =>{
    return {
        type: CATEGORIES_LOADED,
        payload
    }
}

const goodsLoaded = (payload) =>{
    return {
        type: GOODS_LOADED,
        payload
    }
}

const newRequest = () =>{
    return {
        type: NEW_REQUEST,
    }
}

const errorApp = (payload) =>{
    return {
        type: ERROR,
        payload
    }
}

const productLoaded = (payload) =>{
    return {
        type: PRODUCT_LOADED,
        payload
    }
}

const addedProductToCart = (payload) =>{
    return {
        type: ADDED_PRODUCT_TO_CART,
        payload
    }
}

const productRemoved = (payload) =>{
    return {
        type: PRODUCT_REMOVED,
        payload
    }
}

const productRemovedAll = (payload) =>{
    return {
        type: PRODUCT_REMOVED_ALL,
        payload
    }
}

const setBreadCrumbsCategoryTitle = (payload) =>{
    return {
        type: BREAD_CRUMBS_CATEGORY_TITLE,
        payload
    }
}

const calculateTotalSumm = (payload) =>{
    return {
        type: CALСULATE_TOTAL_SUMM,
        payload
    }
}

const calculateTotalGoods = (payload) =>{
    return {
        type: CALСULATE_TOTAL_GOODS,
        payload
    }
}

const brandsLoaded = (payload) =>{
    return {
        type: BRANDS_LOADED,
        payload
    }
}

const brandFilterLoaded = (payload) =>{
    return {
        type: BRAND_FILTER_LOADED,
        payload
    }
}

const brandFilterDeleted = (payload) =>{
    return {
        type: BRAND_FILTER_DELETED,
        payload
    }
}

const rangeFilterLoaded = (payload) =>{
    return {
        type: RANGE_FILTER,
        payload
    }
}

const clearBrandFilterLoaded = (payload) =>{
    return {
        type: CLEAR_BRAND_FILTER_LOADED,
    }
}

const selectedCategory = (payload) => {
    return {
        type: SELECTED_CATEGORY,
        payload
    }
}

const selectedIncDecSort = (payload) => {
    return {
        type: INC_DEC_SORT,
        payload
    }
}

const reStart = (payload='') => {
    return {
        type: 'RESTART',
        payload
    }
}



const sortPriceGoods = (goods, typeSort) =>{
    if (typeSort === ''){  
        return  goods
    }
    if (typeSort === 'without_sort'){
        //store.dispatch(reStart());
        return  []
    }
    if(typeSort === 'increase'){
      
       return goods.sort(function(a,b){
            return (+a.price) - (+b.price)
        })
    }
    if(typeSort === 'decrease'){
        
       return goods.sort(function(a,b){
            return (+b.price) - (+a.price)
        })
    }
}


const reviewsLoaded = (payload) =>{
    return {
        type: REVIEWS_LOADED,
        payload
    }
}

const rangeLoaded = (payload) =>{
    
    return {
        type: RANGE_LOADED,
        payload
    }
}


 const setBreadCrumbs = (furnitureService,numCat) => (dispatch) =>{
    furnitureService.getCategories().then( 
        data => {
           const category =  data.find((category) => category.id === numCat);
           dispatch(setBreadCrumbsCategoryTitle(category.title));
        })
}



   const fetchCategories = (furnitureService, id) => (dispatch) =>{
    furnitureService.getCategories().then( 
        data => dispatch(categoriesLoaded(data)));
       dispatch(selectedCategory(id));
   }

   const fetchRange= (furnitureService) => (dispatch) =>{
    furnitureService.getRange().then( 
       
        data => {
            dispatch(rangeLoaded(data))
            
        });
   }




   const fetchProduct = (furnitureService, numCat, numProduct) => (dispatch) =>{
    dispatch(newRequest());
    //console.log("numCat - " + numCat)
    furnitureService.getProduct(numCat,numProduct).then(data =>dispatch(productLoaded(data)) )
   }

   const fetchGoods = (furnitureService, cat) => (dispatch) => {
    dispatch(newRequest());
    dispatch(clearBrandFilterLoaded());
    furnitureService.getGoods(cat)
    .then( goods =>  dispatch(goodsLoaded(goods)))
    .catch (error =>  dispatch(errorApp(error)));
   }

   const fetchGoodsWithoutSort = (furnitureService, numcat) => (dispatch)=>{
    dispatch(newRequest());
    dispatch(reStart());
    furnitureService.getGoods(numcat)
    .then( goods => dispatch(goodsLoaded(goods)))
    .catch (error =>dispatch(errorApp(error)));
   }
 
   const labelClear = (categorySelected, forMenu, forCart ) => (dispatch) =>{
        if(categorySelected !== ""  && forMenu && !forCart){
           
            let arrayLi = document.getElementsByClassName('brend-container')[0].getElementsByTagName('li');
            for (let i = 0; i < arrayLi.length; i++) {
                arrayLi[i].getElementsByTagName('input')[0].checked = false;
                
            }

        let element = document.querySelector ('.filter-goods select option');
        element.selected = true;
        dispatch(reStart());
        
   }
}






export {
    categoriesLoaded,
    goodsLoaded,
    newRequest,
    errorApp,
    productLoaded,
    addedProductToCart,
    productRemoved,
    productRemovedAll,

    calculateTotalSumm,
    calculateTotalGoods,
    brandsLoaded,
    brandFilterLoaded,
    clearBrandFilterLoaded,
    brandFilterDeleted,
    selectedCategory,
    selectedIncDecSort,
    sortPriceGoods,
    reStart,
    reviewsLoaded,
    setBreadCrumbs,
    fetchCategories,
    labelClear,
    rangeFilterLoaded,
    fetchProduct,
    fetchGoods,
    fetchGoodsWithoutSort,
    fetchRange,
    cartCleared
    
   
}