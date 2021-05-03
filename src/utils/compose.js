 const compose = (...func) => (component) => {
     return func.reduceRight ((preventValue,f ) =>{
        return f(preventValue)
     }, component)
 }

 export default compose;