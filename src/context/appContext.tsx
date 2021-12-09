import React, { createContext, FC, useEffect, useReducer } from 'react';
import sch from '../static/img/index.jpeg';
import test from '../static/img/test2.jpeg';
import logo_axa from '../static/img/logo/logo_axa.svg';
import logo_detours from '../static/img/logo/logo_detours.svg';
import logo_gonzai from '../static/img/logo/logo_gonzai.svg';
import logo_jack from '../static/img/logo/logo_jack.svg';
import logo_netflix from '../static/img/logo/logo_netflix.svg';


interface IInnerContent {
    title: string
    videos?: string[]
    images?: string[]
}

interface IContentPageData {
    nb: number
    page: string
    imgUrl: string
    logo: string
    logoName: string
    content?: IInnerContent[]
}

interface IAppContext {
    pageUrl: string;
    displayCarousel: boolean;
    carousel: {
        transition: "start" | "transiting" | "end" | null,
        fadeStyle: React.CSSProperties | null,
        isDisplayed: boolean
    },
    subHeader: {
        transition: "start" | "transiting" | "end" | null
    },
    contentPage: {
        transition: "start" | "transiting" | "end" | null,
        displayContent: boolean | null
    },
    data: IContentPageData[];
};

const initialState: IAppContext = {
    pageUrl: "",
    displayCarousel: true,
    carousel: {
        transition: null,
        fadeStyle: null,
        isDisplayed: true
    },
    subHeader: {
        transition: null,
    },
    contentPage: {
        transition: null,
        displayContent: false
    },
    data: [
        {
            nb: 1,
            page: '/axa',
            imgUrl: sch,
            logo: logo_axa,
            logoName: "logo_axa",

        },
        {
            nb: 2,
            page: '/detours',
            imgUrl: test,
            logo: logo_detours,
            logoName: "logo_detours",
            content: [
                {
                    title: 'UN DETOUR PAR CHEZ VOUS AVEC CLAUDE DE KOH LANTA',
                    videos: [
                        "https://www.youtube.com/watch?v=kJLcOQb_lDE"
                    ],
                },
                {
                    title: "REPORTAGES DÉTOUR AVEC L'INFLUENCEUR ABOU SEGA",
                    videos: [
                        "https://www.youtube.com/watch?v=iSPeMYddfHM",
                        "https://www.youtube.com/watch?v=BHYZxaRzzGE",
                        "https://www.youtube.com/watch?v=DXcaCmy42Zc"
                    ]
                },
                {
                    title: "FLASHMOB : RENCONTRES AVEC DES ACTEURS DE LA MOBILITÉ",
                    videos: [
                        "https://www.youtube.com/watch?v=QjK2Q0VsPEA",
                        "https://www.youtube.com/watch?v=OEDf_XmxgSM",
                        "https://www.youtube.com/watch?v=sjknlHyiHKQ"
                    ]
                }
            ]
        },
        {
            nb: 3,
            page: '/gonzai',
            imgUrl: sch,
            logo: logo_gonzai,
            logoName: "logo_gonzai",
            content: [
                {
                    title: "",
                    videos: [
                        "https://www.youtube.com/watch?v=UcNVLSDRt1U",
                        "https://www.youtube.com/watch?v=aAwFlOOmv3A&t=1s",
                        "https://www.youtube.com/watch?v=_BF5DcmcEBU",
                        "https://www.youtube.com/watch?v=sCZlSLuRR4A"
                    ]
                }
            ]
        },
        {
            nb: 4,
            page: '/jack',
            imgUrl: test,
            logo: logo_jack,
            logoName: "logo_jack",
            content: [
                {
                    title: "AUTO-INTERVIEW",
                    videos: [
                        "https://www.youtube.com/watch?v=X5T8YdBE-o8",
                        "https://www.youtube.com/watch?v=N_nKMV31U0E"
                    ]
                },
                {
                    title: "T'AS PERCÉ - SÉRIE RAP",
                    videos: [
                        "https://www.youtube.com/watch?v=U0w_YfznM6g",
                        "https://www.youtube.com/watch?v=kKySeYIDBKc",
                        "https://www.youtube.com/watch?v=cy3is4jePpw",
                        "https://www.youtube.com/watch?v=T1XjKQ6etmM"
                    ]
                },
                {
                    title: "LES PATRONNES : LA PLACE DES FEMMES DANS LA MUSIQUE",
                    videos: [
                        "https://www.youtube.com/watch?v=cmE0OBcN9bs",
                        "https://www.youtube.com/watch?v=0_v9eG1Az_A",
                        "https://www.youtube.com/watch?v=yJpxgow35iQ",
                    ]
                },
                {
                    title: "DANS LES COULISSES DU CLIP...",
                    videos: [
                        "https://www.youtube.com/watch?v=Da2YS8-rh74",
                        "https://www.youtube.com/watch?v=3v4_esKoC9Q",
                    ]
                },
                {
                    title: "3 MINUTES AVANT...",
                    videos: [
                        "https://www.youtube.com/watch?v=9zksWlnxudY",
                        "https://www.youtube.com/watch?v=scW3sulWsec",
                    ]
                },
                {
                    title: "JACK SESSIONS",
                    videos: [
                        "https://www.youtube.com/watch?v=msltSAV0cBk",
                        "https://www.youtube.com/watch?v=MaJ8j7BJkt8",
                    ]
                },
            ]
        },
        {
            nb: 5,
            page: '/netflix',
            imgUrl: sch,
            logo: logo_netflix,
            logoName: "logo_netflix",
            content: [
                {
                    title: "BACKSTAGE EMILY IN PARIS - SAISON 2 (CONFIDENTIEL)",
                    images: [
                        "https://pro2-bar-s3-cdn-cf.myportfolio.com/73fc56856e3404cf40a8f168d2a39b83/8ffb4642-4ebc-4d53-8ac3-950fa3eb1d2e_rw_1920.png?h=1ca84b44f13a51f89def30c8bd6c000e",
                        "https://pro2-bar-s3-cdn-cf.myportfolio.com/73fc56856e3404cf40a8f168d2a39b83/1552384a-4fd5-4462-b0b6-aceb59545536_rw_1920.png?h=d1c4c33f756ad51180049cff966b6306",
                        "https://pro2-bar-s3-cdn-cf4.myportfolio.com/73fc56856e3404cf40a8f168d2a39b83/fc23c3fd-d2b2-4921-b3df-d39683e03835_rw_1920.png?h=72e0b78b5c206f80dbaa634966e10cfc",
                        "https://pro2-bar-s3-cdn-cf.myportfolio.com/73fc56856e3404cf40a8f168d2a39b83/8b9d8094-f300-421e-bc88-711d406b43e7_rw_1920.png?h=9851d4c2d48823923939e22da248323b"
                    ]
                }
            ]
        }
    ]
};

const appContext = createContext<{
    state: IAppContext;
    dispatch: React.Dispatch<any>;
}>({
    state: {} as IAppContext,
    dispatch: () => null
});

const reducer = (state: IAppContext, action: any): IAppContext => {
    const { type, target } = action;

    switch (type) {
        case 'TOGGLE_CAROUSEL': {
            return {
                ...state,
                displayCarousel: target
            }
        }
        case 'TOGGLE_SUBHEADER_TRANSITION': {
            return {
                ...state,
                subHeader: {
                    ...state.subHeader,
                    transition: target
                }
            }
        }
        case 'TOGGLE_CAROUSEL_FADE_IN_OUT_TRANSITION': {
            return {
                ...state,
                carousel: {
                    ...state.carousel,
                    transition: target
                }
            }
        }
        case 'SET_FADE_CAROUSEL_STYLE': {
            return {
                ...state,
                carousel: {
                    ...state.carousel,
                    fadeStyle: target
                }
            }
        }
        case 'TOGGLE_DISPLAY_PAGE_CONTENT': {
            return {
                ...state,
                contentPage: {
                    ...state.contentPage,
                    displayContent: target
                }
            }
        }
        case 'TOGGLE_CONTENT_PAGE_FADE_IN_OUT_TRANSITION': {
            return {
                ...state,
                contentPage: {
                    ...state.contentPage,
                    transition: target
                }
            }

        }
        default: return state;
    }
};

const AppProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <appContext.Provider value={{ state, dispatch }}>
            {children}
        </appContext.Provider>
    );

};

export { AppProvider, appContext };