import React, { Fragment } from 'react';
import FurnitureList from '../furniture-list';
import './home-page.css';
import MainText from '../main-text';



const HomePage = () => {
    return(
        <Fragment>
            <h1 className="welcome">Добро пожаловать в интернет магазин мебели!!!</h1>
            <FurnitureList />
            <MainText/>
        </Fragment>

    )
}


export default HomePage;
