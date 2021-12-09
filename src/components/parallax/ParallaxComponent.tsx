import { FC } from 'react';
import Tilt from 'react-parallax-tilt';
import './parallax.scss';

export const ParallaxComponent: FC<{ nb: number, isParallax: boolean, imgUrl: string, logoUrl: string, logoName: string }> = ({ nb, isParallax, imgUrl, logoUrl, logoName }) => {

    return (
        <Tilt
            className="parallax-effect-img"
            tiltMaxAngleX={2}
            tiltMaxAngleY={2}
            perspective={400}
            transitionSpeed={1000}
            scale={1.05}
            tiltReverse={true}
            glareEnable={true}
            glareMaxOpacity={0.4}
            glarePosition="bottom"
            glareColor="#ffffff"
            style={{ backgroundImage: `url(${imgUrl})` }}
        >
            {
                <div className={`inner-element`}>
                    <img src={logoUrl} alt="pic" id="logo" className={`${isParallax && "big"} ${logoName}`} />
                </div>
            }
        </Tilt>
    );
};
