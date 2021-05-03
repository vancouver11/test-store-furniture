import React from 'react';
import { FurnitureConsumer } from '../furniture-service-context/furniture-sevice-context';

 const withFurnitureStoreService = () => (WrappedComponent) => {

    return (props) =>{
        return (
            <FurnitureConsumer>
                { 
                    (furnitureService) => {
                        return (
                            <WrappedComponent 
                                {...props } 
                                furnitureService ={furnitureService}
                            />
                        )
                    }
                }
        </FurnitureConsumer>
        )
    }

 }    

 export default withFurnitureStoreService;
