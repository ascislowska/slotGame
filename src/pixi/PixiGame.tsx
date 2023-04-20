import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Application, Rectangle } from "pixi.js";
import { useMainStore } from "../hooks/useMainStore";
import { Reel } from "./Reel";
import { getSymbolHeight, scrollBy } from "./consts";
import { loadAssets } from "./loadAssets";
import { observer } from "mobx-react-lite";
import { Button } from "./Button";
import { ReelsContainer } from "./ReelsContainer";
import { Mask } from "./Mask";
import { WinScreen } from "./WinScreen";
import { ReelBackground } from "./ReelBackground";
let app: Application | null = null;

const PixiGame: React.FC = () => {
    const canvasRef: any = useRef<HTMLCanvasElement>(null);
    let screen: Rectangle;
    let reelsContainer: ReelsContainer;
    let reels: Reel[];
    let winScreen: WinScreen;
    let isSpinning = false;
    let symbolHeight: number;
    const {
        budget: { won, payForBet },
    } = useMainStore();

    const onAssetsLoaded = (app: Application) => {
        screen = app.screen;
        symbolHeight = getSymbolHeight(screen);

        const reelsBackground = new ReelBackground(app);
        app.stage.addChild(reelsBackground);

        reelsContainer = new ReelsContainer(app);
        app.stage.addChild(reelsContainer);
        reels = reelsContainer.children as Reel[];

        const mask = new Mask(app);
        app.stage.addChild(mask);
        reelsContainer.mask = mask;

        const playBtn = new Button(play, app);
        app.stage.addChild(playBtn);

        winScreen = new WinScreen(app);
        app.stage.addChild(winScreen);
    };

    async function play() {
        payForBet();
        if (isSpinning) return;
        isSpinning = true;

        reels.forEach(async (reel) => {
            reelsContainer.addSymbols(reel);
        });

        let newPosition = symbolHeight * scrollBy;
        await gsap.to(reels, {
            y: newPosition,
            duration: 2,
            stagger: 0.2,
            onComplete: stop,
        });
        if (reelsContainer.checkIfWins()) {
            won();
            winScreen.showScreen();
        }
        newPosition = 0;
        isSpinning = false;
    }

    const stop = () => {
        reelsContainer.stopSpinning();
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
};
export default observer(PixiGame);
