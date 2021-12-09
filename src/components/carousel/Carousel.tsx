import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useApp } from '../../context/useApp';
import { ReactComponent as ArrowButton } from '../../static/img/icons/next.svg';
import { ParallaxComponent } from '../parallax/ParallaxComponent';
import './carousel.scss';

export const Card: FC<{ nb: number, imgUrl: string, logoUrl: string, logoName: string }> = ({ nb, imgUrl, logoUrl, logoName }) => {
    return (
        <div >
            <ParallaxComponent nb={nb} isParallax={true} imgUrl={imgUrl} logoUrl={logoUrl} logoName={logoName} />
        </div>
    );
};
// export const Card: FC<{ nb: number, classList: string, imgUrl: string, logoUrl: string, logoName: string }> = ({ nb, classList, imgUrl, logoUrl, logoName }) => {
//     return (
//         <div id={classList.includes('present') ? "card-element" : ""} className={classList + " d-flex align-center" + " idx-" + nb}>
//             <ParallaxComponent nb={nb} isParallax={classList.includes('present')} imgUrl={imgUrl} logoUrl={logoUrl} logoName={logoName} />
//         </div>
//     );
// };

export const Carousel: FC = () => {
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
    const { pathname } = useLocation();

    const currentIndexPage = () => {
        if (data.findIndex(d => d.page === pathname) < 0) {
            return 0;
        } else {
            return data.findIndex(d => d.page === pathname);
        }
    };

    const [cardNum, setCardnum] = useState(currentIndexPage());
    const [scale, setScale] = useState(false);
    const history = useHistory();

    const [display, setDisplay] = useState<boolean>(displayCarousel);

    useEffect(() => {

        // fait apparaite le carousel sans opacity
        if (displayCarousel && !display && carouselFadeTransition === 'start' && contentPageTransition === 'end') {
            setDisplay(true);
            handleCarouselFadeStyle({ opacity: 0, transition: '0.5s ease-in-out', height: '100%' });
        }
        // fade in le carousel
        else if (displayCarousel && subHeaderTransition === 'end' && display) {
            handleCarouselFadeStyle({ opacity: 1, transition: '0.5s ease-in-out', height: '100%' });
        }
        //fade out le carousel
        else if (!displayCarousel && subHeaderTransition === 'start') {
            handleCarouselFadeStyle({ opacity: 0, transition: '0.5s ease-in-out', height: '100%' });
        }
        // fais disparaitre le carousel
        else if (!displayCarousel && carouselFadeTransition === 'end' && display) {
            setDisplay(false);
        }

    }, [subHeaderTransition, displayCarousel, carouselFadeTransition, contentPageTransition])

    const handleClick = (action: string) => {
        setScale(true);

        setTimeout(() => {
            setScale(false);
        }, 1500);

        if (action === '+') {
            setCardnum(prev => prev + 1);
            history.push(data[cardNum + 1].page);
        } else {
            setCardnum(prev => prev - 1);
            history.push(data[cardNum - 1].page);
        }
    };

    const setClass = (idx: number) => {
        const classArr = ['Card center-box']
        if (idx === cardNum) classArr.push('present');
        if (idx > cardNum) classArr.push('next');
        if (idx < cardNum) classArr.push('previous');
        if (idx === cardNum - 2) classArr.push('less-index-0');
        if (idx === cardNum - 1) classArr.push('less-index-1');
        if (idx === cardNum + 2 || idx === cardNum + 3) classArr.push('less-index-0');
        if (idx === cardNum + 1) classArr.push('less-index-1');
        return classArr.join(' ');
    };

    if (!display) {
        return null;
    } else {
        return (
            <div
                className={`d-flex flex-column carousel-container`}
                style={{ width: '100%', ...fadeStyle }}
                onTransitionEnd={() => toggleCarouselFadeInOutTransition("end")}
            >
                <div className="d-flex justify-center pagination-container">
                    {cardNum !== data.length - 1 && <ArrowButton height='50' onClick={() => handleClick('+')} className="mr-2 btn-previous" />}
                    {cardNum !== 0 && <ArrowButton height='50' onClick={() => handleClick('-')} className="ml-2 btn-next" />}
                </div>
                <div className={`h-100 carousel d-flex flex-column justify-center align-center  ${scale ? "scale-on" : ""}`}>
                    {
                        data.map((d, idx) => {
                            // return <Card
                            //     key={idx}
                            //     nb={idx}
                            //     classList={setClass(idx)}
                            //     imgUrl={data[idx].imgUrl}
                            //     logoUrl={data[idx].logo}
                            //     logoName={data[idx].logoName}
                            // />
                        })
                    }
                </div>
            </div>
        );
    }

};