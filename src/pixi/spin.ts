import { Rectangle } from "pixi.js";
import { sound } from "@pixi/sound";
import { gsap } from "gsap";

import { WinScreen } from "./WinScreen";
import { Reel } from "./Reel";
import { ReelsContainer } from "./ReelsContainer";

import { getSymbolHeight, scrollBy } from "./consts";

export function spin(
    screen: Rectangle,
    reels: Reel[],
    reelsContainer: ReelsContainer,
    winScreen: WinScreen,
    won: () => void,
) {
    let symbolHeight = getSymbolHeight(screen);

    sound.play("neon");
    animate();

    function animate() {
        const timeline = gsap.timeline();
        const newPosition = symbolHeight * scrollBy;

        timeline.to(reels, {
            y: newPosition,
            duration: 2,
            stagger: 0.2,
            onComplete: stop,
        });
    }

    function stop() {
        // sound.stop("neon");
        reelsContainer.afterSpinning();

        if (reelsContainer.checkIfWins()) {
            won();
            reelsContainer.winAnimation();
            winScreen.showScreen();
        } else {
            reelsContainer.lostAnimation();
            winScreen.cleanUp();
        }
    }
}
