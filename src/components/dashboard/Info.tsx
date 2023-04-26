import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMainStore } from "../../hooks/useMainStore";

interface InfoProps {
    onClose: () => void;
}
const Info = ({ onClose }: InfoProps) => {
    const {
        player: { cheatMode, toggleCheatMode },
    } = useMainStore();
    const setCheatMode = () => {
        toggleCheatMode(!cheatMode);
    };
    return (
        <div className="modal">
            <div>
                <div className="info-header">
                    <h2 className="blue-neon">Info</h2>
                    <button className="blue-neon close-btn" onClick={onClose}>
                        <IoClose />
                    </button>
                </div>
                <ul>
                    <li>
                        <a href="https://www.freepik.com/free-vector/futuristic-night-city-background_4359761.htm#query=city%20night%20futuristic&position=9&from_view=search&track=ais">
                            Image by pikisuperstar
                        </a>{" "}
                        on Freepik
                    </li>
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
