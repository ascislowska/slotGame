import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Application, Rectangle } from "pixi.js";
import { useMainStore } from "../hooks/useMainStore";
import { Reel } from "./Reel";
import { getSymbolHeight, scrollBy } from "./consts";
import { loadAssets } from "./loaders/loadAssets";
import { observer } from "mobx-react-lite";
import { Button } from "./Button";
import { ReelsContainer } from "./ReelsContainer";
import { Mask } from "./Mask";
import { WinScreen } from "./WinScreen";
import { ReelBackground } from "./ReelBackground";
import { Background } from "./Background";

const PixiGame: React.FC = observer(() => {
    const canvasRef: any = useRef<HTMLCanvasElement>(null);
    let app: Application;
    let screen: Rectangle;
    let reelsContainer: ReelsContainer;
    let reels: Reel[];
    let winScreen: WinScreen;
    let playBtn: Button;
    let isSpinning = false;
    let symbolHeight: number;
    // let app: Application;
    const {
        budget: { won, payForBet, toWin },
        player: { cheatMode },
    } = useMainStore();

    const onAssetsLoaded = (app: Application) => {
        app = app;
        screen = app.screen;
        symbolHeight = getSymbolHeight(screen);
        app.stage.sortableChildren = true;

        const background = new Background(app);
        app.stage.addChild(background);

        const reelsBackground = new ReelBackground(app);
        app.stage.addChild(reelsBackground);
        reelsContainer = new ReelsContainer(app, cheatMode);
        app.stage.addChild(reelsContainer);
        reels = reelsContainer.children as Reel[];
        reelsContainer.positionContainer();

        const mask = new Mask(app);
        app.stage.addChild(mask);
        reelsContainer.mask = mask;

        playBtn = new Button(play, app);
        app.stage.addChild(playBtn);
    };

    const spin = () => {
        const timeline = gsap.timeline();
        const newPosition = symbolHeight * scrollBy;

        timeline.to(reels, {
            y: newPosition,
            duration: 2,
            stagger: 0.2,
            onComplete: stop,
        });
    };

    function play() {
        if (isSpinning) return;
        playBtn.disable();
        payForBet();
        // prepare win screen
        winScreen = new WinScreen(app, toWin());
        app.stage.addChild(winScreen);

        isSpinning = true;

        reels.forEach((reel) => {
            reelsContainer.addSymbols(reel);
        });
        spin();
    }

    const stop = () => {
        afterSpinning();
        isSpinning = false;

        if (reelsContainer.checkIfWins()) {
            won();
            reelsContainer.winAnimation();

            winScreen.showScreen();
        } else {
            reelsContainer.lostAnimation();
        }
        playBtn.enable();
    };
    const afterSpinning = () => {
        reelsContainer.afterSpinning();
    };
    useEffect(() => {
        app = new Application({
            backgroundColor: "#000000",
            width: window.innerWidth,
            height: window.innerHeight / 3,
        });
        canvasRef.current.appendChild(app.view);
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.start();

        //enable Chrome extension
        (globalThis as any).__PIXI_APP__ = app;

        loadAssets().then(() => {
            if (app) {
                onAssetsLoaded(app);
            }
        });

        return () => {
            if (app) {
                app.stop();
                // app.destroy();
                // app = null;
            }
        };
    }, []);

    return <div ref={canvasRef} />;
});
// export default observer(PixiGame);
export default PixiGame;
