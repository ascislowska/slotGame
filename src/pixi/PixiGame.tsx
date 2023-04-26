import React, { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { useMainStore } from "../hooks/useMainStore";
import { Reel } from "./Reel";
import { loadAssets } from "./loaders/loadAssets";
import { observer } from "mobx-react-lite";
import { Button } from "./Button";
import { ReelsContainer } from "./ReelsContainer";
import { Mask } from "./Mask";
import { WinScreen } from "./WinScreen";
import { ReelBackground } from "./ReelBackground";
import { Background } from "./Background";
import { sound } from "@pixi/sound";
import { spin } from "./spin";

const PixiGame: React.FC = observer(() => {
    const canvasRef: any = useRef<HTMLCanvasElement>(null);
    let app: Application;
    let reelsContainer: ReelsContainer;
    let reels: Reel[];
    let winScreen: WinScreen;
    let playBtn: Button;
    // let symbolHeight: number;
    const {
        budget: { won, payForBet, toWin },
        player: { cheatMode },
    } = useMainStore();

    const onAssetsLoaded = (newApp: Application) => {
        app = newApp;
        // symbolHeight = getSymbolHeight(screen);
        app.stage.sortableChildren = true;

        const background = new Background(app);
        app.stage.addChild(background);

        playBtn = new Button(play, app);
        app.stage.addChild(playBtn);

        const reelsBackground = new ReelBackground(app);
        app.stage.addChild(reelsBackground);

        reelsContainer = new ReelsContainer(app, cheatMode);
        app.stage.addChild(reelsContainer);
        reelsContainer.positionContainer();
        reels = reelsContainer.children as Reel[];

        const mask = new Mask(app);
        app.stage.addChild(mask);
        reelsContainer.mask = mask;
    };

    function play() {
        sound.play("neon");
        playBtn.disable();
        payForBet();

        // prepare win screen
        winScreen = new WinScreen(app, toWin(), playBtn);
        app.stage.addChild(winScreen);

        //prepare new symbols to show
        reels.forEach((reel) => {
            reelsContainer.addSymbols(reel);
        });
        spin(app.screen, reels, reelsContainer, winScreen, won);
    }

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
            }
        };
    }, []);

    return <div ref={canvasRef} />;
});
// export default observer(PixiGame);
export default PixiGame;
