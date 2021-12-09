import React, { useContext } from 'react';
import { appContext } from './appContext';

export const useApp = () => {
    const { state, dispatch } = useContext(appContext);

    const toggleCarousel = () => {
        dispatch({ type: 'TOGGLE_CAROUSEL', target: !state.displayCarousel });
    };

    const toggleSubHeaderTransition = (state: string) => {
        dispatch({ type: 'TOGGLE_SUBHEADER_TRANSITION', target: state });
    };

    const toggleCarouselFadeInOutTransition = (state: string) => {
        dispatch({ type: 'TOGGLE_CAROUSEL_FADE_IN_OUT_TRANSITION', target: state });
    };

    const handleCarouselFadeStyle = (state: React.CSSProperties) => {
        dispatch({ type: 'SET_FADE_CAROUSEL_STYLE', target: state });
    };

    const toggleDisplayPageContent = (target: boolean) => {
        dispatch({ type: 'TOGGLE_DISPLAY_PAGE_CONTENT', target });
    };

    const togglePageContentFadeInOutTransition = (target: string) => {
        dispatch({ type: 'TOGGLE_CONTENT_PAGE_FADE_IN_OUT_TRANSITION', target });
    };
    
    return {
        appStore: state,
        actions: {
            toggleCarousel,
            toggleSubHeaderTransition,
            toggleCarouselFadeInOutTransition,
            handleCarouselFadeStyle,
            toggleDisplayPageContent,
            togglePageContentFadeInOutTransition
        }
    };
};