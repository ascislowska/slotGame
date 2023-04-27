import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMainStore } from "../../hooks/useMainStore";

interface InfoProps {
    onClose: () => void;
}
const Info = ({ onClose }: InfoProps) => {
    return (
        <div className="modal">
            <div className="info-header">
                <h2 className="blue-neon">Info</h2>
                <button className="blue-neon close-btn" onClick={onClose}>
                    <IoClose />
                </button>
            </div>
            <div className="about">
                <p>
                    This is slot game created during Evolution Typescript
                    Bootcamp. Good luck!
                </p>
            </div>
            <div>
                <h3 className="blue-neon">Resources</h3>
                <h4>Images</h4>
                <ul>
                    <li>
                        Image by{" "}
                        <a href="https://www.freepik.com/free-vector/assortment-neon-light-signs_1090969.htm#query=neon%20icons&position=0&from_view=author">
                            Freepik
                        </a>
                    </li>
                    <li>
                        Image by{" "}
                        <a href="https://www.freepik.com/free-vector/neon-frame-design_18491888.htm#page=3&query=border%20glow%20neon&position=25&from_view=search&track=robertav1_2_sidr">
                            Freepik
                        </a>
                    </li>
                    <li>
                        <a href="https://www.freepik.com/free-vector/futuristic-night-city-background_4359761.htm#query=city%20night%20futuristic&position=9&from_view=search&track=ais">
                            Image by pikisuperstar
                        </a>{" "}
                        on Freepik
                    </li>
                </ul>
                <h4>Images</h4>
                <ul>
                    <li>
                        <a href="https://opengameart.org/content/summertown">
                            Summer City by LushoGames
                        </a>{" "}
                        on OpenGamesArt
                    </li>
                    <li>
                        <a href="https://freesound.org/people/sepal/sounds/121994/">
                            Neon tube by Sepal
                        </a>{" "}
                        on freesound.org
                    </li>
                    <li>
                        <a href="https://www.zapsplat.com/music/fruit-machine-sound-win-or-spin-tone-2/">
                            Fruit machine sound, win or spin tone 2{" "}
                        </a>{" "}
                        by ZapSplat
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Info;
