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
import { Container } from "react-dom";
import { getSymbolHeight } from "./consts";

const PixiGame: React.FC = observer(() => {
    const canvasRef: any = useRef<HTMLCanvasElement>(null);
    let app: Application;
    let reelsContainer: ReelsContainer;
    let reels: Reel[];
    let reelsBackground: ReelBackground;
    let background: Background;
    let mask: Mask;

    let winScreen: WinScreen;
    let playBtn: Button;
    const {
        budget: { won, payForBet, toWin },
        player: { cheatMode },
    } = useMainStore();

    const onAssetsLoaded = (newApp: Application) => {
        app = newApp;
        app.stage.sortableChildren = true;

        background = new Background(app);
        app.stage.addChild(background);

        playBtn = new Button(play, app);
        app.stage.addChild(playBtn);

        reelsBackground = new ReelBackground(app);
        app.stage.addChild(reelsBackground);

        reelsContainer = new ReelsContainer(app, cheatMode);
        app.stage.addChild(reelsContainer);
        reelsContainer.positionContainer();
        reels = reelsContainer.children as Reel[];

        mask = new Mask(app);
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
    const onResize = (app: Application, reelsContainer: ReelsContainer) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        background.setPosition(app.screen);
        reelsBackground.onResize(app);
        reelsContainer.onResize();
        mask.onResize();

        playBtn.btnPosition();
        playBtn.btnSize();
    };
    useEffect(() => {
        app = new Application({
            backgroundColor: "#000000",
            resizeTo: window,
            // width: window.innerWidth,
            // height: window.innerHeight / 3,
        });
        canvasRef.current.appendChild(app.view);
        // resizeApp(app);
        window.addEventListener("resize", () => {
            onResize(app, reelsContainer);
        });

        // app.renderer.resize(window.innerWidth, window.innerHeight);
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
