import { Application, Assets, Container, Sprite } from "pixi.js";
import { gsap } from "gsap";
import { getSymbolHeight } from "./consts";
import { getBiggerSize } from "./utils";
import { WinText } from "./WinText";
import { sound } from "@pixi/sound";
import { Button } from "./Button";

export class WinScreen extends Container {
    app: Application;
    glows: Sprite[] = [];
    symbolHeight;
    size: number;
    text: Container;
    playBtn: Button;
    constructor(app: Application, winValue: number, playBtn: Button) {
        super();
        this.app = app;
        this.visible = false;
        this.symbolHeight = getSymbolHeight(app.screen);
        this.size = getBiggerSize(this.app.screen);
        this.playBtn = playBtn;
        this.sortableChildren = true;
        this.prepareNewScreen();

        this.text = new WinText(app.screen, winValue);
        this.addChild(this.text);
    }

    prepareNewScreen = () => {
        this.glows.forEach((glow) => this.removeChild(glow));
        this.glows = [];
        this.drawGlows("lightGlow", 20);
        this.drawGlows("pinkGlow", 10);
        this.drawGlows("lightpinkGlow", 10);
        this.drawGlows("blueGlow", 20);
    };
    showScreen() {
        this.visible = true;
        this.showGlows();
    }
    async drawGlows(color: string, amount: number) {
        for (let i = 0; i < amount; i++) {
            const random1 = Math.random();
            const random2 = Math.random();

            const texture = await Assets.load(color);
            const lightGlow = Sprite.from(texture);
            lightGlow.position.set(
                this.app.screen.width * random1,
                this.app.screen.height * random2,
            );
            lightGlow.anchor.set(0.5);
            lightGlow.alpha = 0;
            lightGlow.scale.set(random1 + 1);
            this.addChild(lightGlow);
            this.glows.push(lightGlow);
        }
    }
    showGlows = () => {
        // this.playWinSound();
        const tl = gsap.timeline();
        tl.fromTo(
            this.glows,
            {
                pixi: { alpha: 0 },
            },
            {
                pixi: { alpha: 1 },
                stagger: 0.02,
                ease: "back",
                duration: 0.5,
                delay: 0.5,
                onStart: this.playWinSound,
            },
        );
        tl.to(this.glows, {
            x: this.app.screen.width / 2,
            y: this.symbolHeight * 3,
            width: this.size,
            height: this.size,
            alpha: 0.5,
            onStart: this.playWinSound,
            duration: 1.5,
        });
        tl.fromTo(
            this.text,
            { alpha: 0 },
            { alpha: 1, ease: "rough", duration: 2 },
            "<",
        );
        tl.to(this.glows, {
            alpha: 0,
            width: this.size * 2,
            height: this.size * 2,
            duration: 0.5,
        });
        tl.set(this, {
            visible: false,
            onComplete: this.cleanUp,
        });
    };
    playWinSound = () => {
        sound.play("winSound");
    };
    cleanUp = () => {
        this.app.stage.removeChild(this);
        this.playBtn.enable();
    };
}
