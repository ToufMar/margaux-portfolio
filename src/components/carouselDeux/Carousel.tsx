import React from 'react';
import { useApp } from '../../context/useApp';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


export const Carousel = () => {

    const {
        appStore: {
            displayCarousel,
            subHeader: {
                transition: subHeaderTransition
            },
            carousel: {
                fadeStyle,
                transition: carouselFadeTransition,
            },
            contentPage: {
                transition: contentPageTransition
            },
            data
        },
        actions: {
            toggleCarouselFadeInOutTransition,
            handleCarouselFadeStyle,
        }
    } = useApp();

    return (
        <div style={{width: '100%', height: '100px'}}>

            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={3}
            >
                <Slider >
                    <Slide style={{backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}} index={0} >I am the first Slide.</Slide>
                    <Slide style={{backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}} index={1}>I am the second Slide.</Slide>
                    <Slide style={{backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}} index={2}>I am the third Slide.</Slide>
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
        </div>
    );
};