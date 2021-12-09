import { FC } from "react";
import "./buttons.scss";

interface IToggleCarouselButton {
    onClick: () => void,
    disabled?: boolean,
    text: string
};

export const ToggleCarouselButton: FC<IToggleCarouselButton> = ({ onClick, disabled, text }) => {

    return (
        <div className="btn-container">
            <button className={`btn`} onClick={onClick} disabled={disabled}>
                {text}
            </button>
        </div>
    );
};