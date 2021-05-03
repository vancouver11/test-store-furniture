import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import ContainerDetailsCategory from '../container-detail-category';
import DetailProduct from '../detail-product';
import Header from '../header/';
import {HomePage, CartPage} from '../pages';

import './app.css';
import Footer from '../footer';
class App extends Component {

    render(){
        return(
            <Fragment>
            <div className="wrapper">
               <div  className="header-app">
                    <Header/>
                </div>
            
                <main className="container">
                    
               
                    <Switch>
                        <Route path="/" component={HomePage} exact></Route>
                        <Route path="/cart" component={CartPage} exact></Route>
                        <Route path="/shop/:id/:numCat" component={ ContainerDetailsCategory } exact></Route>
                        <Route path="/shop/:id/:numCat/:numProduct" component={ DetailProduct } exact></Route>
                    </Switch>
                    
                </main>
                <div/>

                <div  className="footer-app">
                    <Footer/>
                </div> 

            </div>
 
            </Fragment>          

        )
       
    }
}

export default App;