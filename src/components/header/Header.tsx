import { FC, useEffect, useState } from 'react';
import './header.scss';
import { useApp } from '../../context/useApp';
import backgroundUrl from '../../static/img/index.jpeg';
import { Link } from 'react-router-dom';
import { ToggleCarouselButton } from '../boutons/ToggleCarouselButton';

interface ISubHeaderProps {
    backgroundImage: string,
    backgroundPosition: string,
    backgroundSize: string,
    backgroundRepeat: string,
    top: number,
    left: number,
    height: number | string,
    width: number | string,
    transition: string,
    borderRadius?: string
};

export const Header: FC = () => {
    const [subHeader, setSubHeader] = useState<ISubHeaderProps | null>(null);
    const {
        actions: {
            toggleCarousel,
            toggleSubHeaderTransition,
            toggleCarouselFadeInOutTransition,
            togglePageContentFadeInOutTransition
        },
        appStore: {
            displayCarousel,
            carousel,
            subHeader: subheaderState,
            contentPage,
            data
        }
    } = useApp();
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (displayCarousel && carousel.transition === 'end') {
            setSubHeader(null);
        }
    }, [carousel.transition])

    useEffect(() => {

        if (!displayCarousel) {
            const subHeader = document.getElementById("card-element");
            const domRect = subHeader?.getClientRects()[0];
            if (subHeader && domRect) {
                const idx = subHeader.className.split('idx-')[1];
                toggleSubHeaderTransition("transiting");
                setFirstRender(false); // pour pas qu'au premier affichage on voit la position ablosulte en dessous

                setSubHeader({
                    top: domRect.top,
                    left: domRect.left,
                    height: domRect.height,
                    width: domRect.width,
                    backgroundImage: `url("${data[parseInt(idx)].imgUrl}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    transition: '1s ease-in-out',
                    borderRadius: '30px'
                });
                setTimeout(() => {
                    setSubHeader({
                        top: 0,
                        left: 0,
                        height: 350,
                        width: "100%",
                        backgroundImage: `url("${data[parseInt(idx)].imgUrl}"})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        transition: '1s ease-in-out',
                        borderRadius: ''
                    });
                }, 300);
            }
        }
        else {
            setTimeout(() => {
                const subHeader = document.getElementById("card-element");
                const domRect = subHeader?.getClientRects()[0];
                if (subHeader && domRect && !firstRender) {
                    const idx = subHeader.className.split('idx-')[1];
                    toggleSubHeaderTransition("transiting");
                    setSubHeader({
                        top: domRect.top,
                        left: domRect.left,
                        height: domRect.height,
                        width: domRect.width,
                        backgroundImage: `url("${data[parseInt(idx)].imgUrl}"})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        transition: '0.5s ease-in-out',
                        borderRadius: '30px'
                    });
                }
            }, 600);
        }
    }, [displayCarousel]);


    const handleBoutton = () => {
        toggleCarousel();
        toggleSubHeaderTransition("start");
        toggleCarouselFadeInOutTransition("start");
        togglePageContentFadeInOutTransition("start");
    };

    return (
        <div className={`header d-flex align-center justify-between ${!displayCarousel && 'color-white'}`}>
            <div className="d-flex" style={{ zIndex: 5 }}>
                <div className="logo ml-2 mr-2"></div>
                <div className="d-flex flex-column ml-2 justify-end">
                    <h2 className="mb-0">Margaux</h2>
                    <h2 className="mt-0 mb-0" style={{ lineHeight: 1.2 }}>DESLANDES</h2>
                </div>
                <div className="d-flex align-end ml-2">
                    <Link to="/cv" className="ml-2 mr-2"><p className={`mb-0 ${!displayCarousel && 'color-white'}`}>CV</p></Link>
                    <Link to="/contact"><p className={`mb-0 ${!displayCarousel && 'color-white'}`}>CONTACT</p></Link>
                </div>
            </div>
            <ToggleCarouselButton onClick={handleBoutton} disabled={subheaderState?.transition === 'transiting'} text={displayCarousel ? "AFFICHER PLUS" : "RETOUR"} />
            {
                subHeader && <div onTransitionEnd={() => toggleSubHeaderTransition("end")} style={{ ...subHeader, position: 'absolute' }}></div>
            }
        </div>
    );
};