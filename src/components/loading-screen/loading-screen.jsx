import React from 'react';
import Loader from 'halogen/RingLoader';
import './loading-screen.scss';

function LoadingScreen(){
    return(
        <section className="LoadingScreen">
            <Loader color="#f36d00" size="36px" margin="4px"/>
        </section>
    )
}

export default LoadingScreen;