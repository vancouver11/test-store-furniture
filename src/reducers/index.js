const initialState = {
    categories:[],
    goods:[],
    loading: true,
    error: null,
    productSelected: {},
    cart:[],
    breadCrumbsCategoryTitle: "",
    totalSumm: 0,
    totalGoods: 0,
    brands:[],
    brandsFilterId:[],
    rangeFilter:{},
    rangePrice:{},
    categorySelected:"",
    sortPrice: 'without_sort',
    reviews:[]
    
    

     
}

const updateCartItem = (cart, item, index) =>{

    if(item.priceProduct === 0){
        return[
            ...cart.slice(0, index),
            ...cart.slice(index + 1)
        ]
    }
    if(index === -1) {
        return [
            ...cart,
            item
        ]

    } else{
        return [
            ...cart.slice(0, index),
            item,
            ...cart.slice(index + 1)
        ]
    }
}


const updateItem = (item, product, quant) =>{
  
    if(item){
  
        return {...item, count: item.count + quant, priceProduct: item.priceProduct + quant * (+product.price)}  
    }else{
       return {...product, count:1, priceProduct: quant * (+product.price) };
    }
}

const updateOrder = (state, product, quant) => {
    const productId = product.id;
    const index = state.cart.findIndex((productInCart) => {
                return productId === productInCart.id
            });
    const item = state.cart[index];
            
    let newItem = updateItem(item, product, quant);
        return {
                ...state, 
                 cart:updateCartItem (state.cart, newItem, index)
        }
}

const reducer = (state = initialState, action) =>{

    switch(action.type){

        case 'CATEGORIES_LOADED':
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            }
       

        case 'GOODS_LOADED':
            return {
                ...state,
                goods: action.payload,
                loading: false,
                error: null
            }

        case 'NEW_REQUEST':
            return {
                ...state, 
                loading: true,
                error:null
            }
         case 'ERROR':
             return {
                ...state, 
                loading: false,
                error: action.payload
            }

        case 'PRODUCT_LOADED':
            return {
                   ...state, 
                   loading: false,
                   productSelected: action.payload
            }

        case 'ADDED_PRODUCT_TO_CART':
           return updateOrder(state, action.payload, 1) 
        case 'PRODUCT_REMOVED':
        return updateOrder(state, action.payload, -1) 
            
        case 'PRODUCT_REMOVED_ALL':
            const product = action.payload;
            const productId= product.id;
            const productFound = state.cart.find( product => product.id ===productId );
            console.log(productFound.count) ;
            return updateOrder(state, action.payload, -productFound.count) 
        
        case 'BREAD_CRUMBS_CATEGORY_TITLE':
            return  {
                ...state,
                breadCrumbsCategoryTitle: action.payload
            } 
        case 'CALСULATE_TOTAL_SUMM':
            return  {
                ...state,
                totalSumm: action.payload
        }    
        case 'CALСULATE_TOTAL_GOODS':
            return  {
                ...state,
                totalGoods: action.payload
        } 
        case 'BRANDS_LOADED':
            return  {
                ...state,
                brands: action.payload
        } 

        case 'RANGE_FILTER':

            
            return  {
                ...state,
                rangeFilter: action.payload
        } 
        case 'CLEAR_BRAND_FILTER_LOADED':
            return  {
                ...state,
                brandsFilterId:[]
        }
        
        case 'BRAND_FILTER_LOADED':
            return  {
                ...state,
                brandsFilterId: [...state.brandsFilterId, action.payload ]
        } 
        case 'BRAND_FILTER_DELETED':
            const index = state.brandsFilterId.findIndex( brandId => brandId === action.payload )
            return  {
                ...state,
                brandsFilterId: [...state.brandsFilterId.slice(0,index), ...state.brandsFilterId.slice(index+1) ]
        } 
        case 'SELECTED_CATEGORY':
            return  {
                ...state,
                categorySelected: action.payload
        } 
        case 'INC_DEC_SORT':
            return  {
                ...state,
                sortPrice: action.payload
        } 

        case 'RESTART':
            return  {
                
             ...state,
             sortPrice:action.payload
            
        } 

        case 'REVIEWS_LOADED':
            return {
                   ...state, 
                   reviews:action.payload
                  
            }
        case 'RANGE_LOADED':
            
            return {
                ...state,
                rangePrice: action.payload
            }
        case 'CART_CLEARED' :{
            return{
                ...state,
                cart:[]
            }

        }


                     
        default:
            return state;
    }      
    
}

export default reducer;