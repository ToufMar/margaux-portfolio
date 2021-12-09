import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useApp } from '../../context/useApp';
import './page.scss';
import Youtube from 'react-youtube';

export const Page: FC = () => {
    const { pathname } = useLocation();

    const {
        appStore: {
            displayCarousel,
            subHeader,
            contentPage: {
                displayContent,
                transition: contentPageTransition
            },
            data
        },
        actions: {
            toggleDisplayPageContent,
            togglePageContentFadeInOutTransition
        }
    } = useApp();

    const [pageFadeStyle, setPageFadeStyle] = useState<React.CSSProperties | null>(null);
    const pageData = data.find(d => d.page === pathname);

    useEffect(() => {
        if (subHeader.transition === 'end' && !displayCarousel && !displayContent) {
            setPageFadeStyle({ opacity: 0, transition: '0.5s ease-in-out' });
            setTimeout(() => {
                setPageFadeStyle({ opacity: 1, transition: '0.5s ease-in-out' });
            }, 300);
            toggleDisplayPageContent(true);
        }
        if (displayCarousel && contentPageTransition !== 'end') {
            setPageFadeStyle({ opacity: 0, transition: '0.5s ease-in-out' });
        }
        if (contentPageTransition === 'end' && displayCarousel) {
            toggleDisplayPageContent(false);
        }
    }, [displayCarousel, subHeader.transition, contentPageTransition]);

    if (!displayContent) {
        return null;
    } else {
        return (
            <div className="page d-flex justify-center flex-column align-center" style={{ ...pageFadeStyle }} onTransitionEnd={() => togglePageContentFadeInOutTransition('end')}>
                {
                    pageData?.content?.map((d: any) => {
                        return (
                            <div className="mb-2">
                                <h2 className="mb-2">{d.title}</h2>
                                <div className="videos-container">
                                    {
                                        d.videos?.map((v: string) => <Youtube id={v} />)
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};