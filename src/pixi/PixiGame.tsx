import React, { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { useMainStore } from "../hooks/useMainStore";
import { Reel } from "./Reel";
import { loadAssets } from "./loaders/loadAssets";
import { observer } from "mobx-react-lite";
import { PlayBtn } from "./Button";
import { ReelsContainer } from "./ReelsContainer";
import { Mask } from "./Mask";
import { WinScreen } from "./WinScreen";
import { ReelBackground } from "./ReelBackground";
import { Background } from "./Background";
import { sound } from "@pixi/sound";
import { spin } from "./spin";
import { Container } from "react-dom";
import { getSymbolHeight } from "./consts";
import { CheatBtn } from "./CheatButton";

const PixiGame: React.FC = observer(() => {
    const canvasRef: any = useRef<HTMLCanvasElement>(null);
    let app: Application;
    let reelsContainer: ReelsContainer;
    let reels: Reel[];
    let reelsBackground: ReelBackground;
    let background: Background;
    let mask: Mask;
    let cheatBtn: CheatBtn;

    let winScreen: WinScreen;
    let playBtn: PlayBtn;
    const {
        budget: { won, payForBet, toWin },
    } = useMainStore();

    const onAssetsLoaded = (newApp: Application) => {
        app = newApp;
        app.stage.sortableChildren = true;

        background = new Background(app);
        app.stage.addChild(background);

        playBtn = new PlayBtn(play, app);
        app.stage.addChild(playBtn);

        reelsBackground = new ReelBackground(app);
        app.stage.addChild(reelsBackground);

        reelsContainer = new ReelsContainer(app);
        app.stage.addChild(reelsContainer);
        reelsContainer.positionContainer();
        reels = reelsContainer.children as Reel[];

        mask = new Mask(app);
        app.stage.addChild(mask);
        reelsContainer.mask = mask;

        cheatBtn = new CheatBtn(toggleCheatMode, app);
        app.stage.addChild(cheatBtn);
    };
    function toggleCheatMode() {
        reelsContainer.cheatMode = !reelsContainer.cheatMode;
        cheatBtn.toggleBtn();
    }
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
    const onResize = (app: Application) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        background.setPosition(app.screen);
        reelsBackground.onResize(app);
        reelsContainer.onResize();
        mask.onResize();
        playBtn.onResize();

        cheatBtn.onResize();
    };
    useEffect(() => {
        app = new Application({
            backgroundColor: "#000000",
            resizeTo: window,
        });
        canvasRef.current.appendChild(app.view);
        app.start();
        //enable Chrome extension
        (globalThis as any).__PIXI_APP__ = app;

        window.addEventListener("resize", () => {
            onResize(app);
        });
        window.screen.orientation.addEventListener("change", () => {
            onResize(app);
        });

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
