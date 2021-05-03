export default class Furniture {
    _base_url = 'http://test-api.ipromote.ru';

    async getRange(){
        const data = await fetch(`${this._base_url}/API/CATALOG/RANGE`);
        const result = await data.json();
        const dataPrice = {
            minPrice: +result.data[0].priceMin,
            maxPrice: +result.data[0].priceMax
        }

        return  dataPrice
    }

    async getCategories(){
        const data =  await fetch(`${this._base_url}/api/category/find`);
        const categoriesInfo = await data.json();
        return categoriesInfo.data
    }
    
    async getGoods(id){
        
        const data = await fetch(`${this._base_url}/API/CATALOG/FIND?category=${id}`);
        const goodsInfo = await data.json();
        return goodsInfo.data;
    }

   async getProduct(idCat, idProduct){
       const data =  await this.getGoods(idCat);
       const product = data.filter((product) => {
           return +product.id === +idProduct
       });
       const [selectedProduct] = product;
       return selectedProduct;
    } 

    async getBrands(){
        const data =  await fetch(`${this._base_url}/API/BRAND/FIND`);
        const brandsInfo = await data.json();
        return brandsInfo.data
    }

    async getGoodsAfterFilterBrands(idBrands,idCategory){
        
      return await idBrands.reduce((total, idBrand) => {
            return this.test( idBrand, idCategory)
                        .then( data => [...total,data])
        })
  
    }


    async getReviews (idGood) {
       const data =  await fetch(`${this._base_url}/API/REVIEW/FIND?cid=${idGood}`);
        const reviews = await data.json();
    
        if(reviews.data === null){
            return []
        } else{
            return reviews.data
        }
       
    }



}

