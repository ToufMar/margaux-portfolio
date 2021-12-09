import React, { useContext } from 'react';
import { appContext } from './appContext';

export const useCarousel = () => {
    const { state: { carousel }, dispatch } = useContext(appContext);

    //start / transiting / end
    const handleCarouselTransition = (state: string) => {
        dispatch({ type: 'HANDLE_CAROUSEL_TRANSITION', target: state });
    };

    //isDisplayed: true / false
    const handleCarouselExists = (exists: boolean) => {
        dispatch({ type: 'HANDLE_CAROUSEL_EXISTS', target: exists });
    };

    //style (opacity / transition )
    const handleCarouselVStyle = (style: React.CSSProperties) => {
        dispatch({ type: 'HANDLE_CAROUSEL_STYLE', target: style });
    };

    return {
        actions: {
            handleCarouselTransition,
            handleCarouselExists,
            handleCarouselVStyle,
        },
        state: {
            carousel
        }
    }
};