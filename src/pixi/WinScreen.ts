import {
    Application,
    Assets,
    Container,
    DisplayObject,
    Sprite,
    Text,
} from "pixi.js";
import { gsap } from "gsap";
import { getSymbolHeight } from "./consts";
import { getBiggerSize } from "./utils";
import { WinText } from "./WinText";

export class WinScreen extends Container {
    app: Application;
    glows: Sprite[] = [];
    symbolHeight;
    size: number;
    text: Container;
    constructor(app: Application, winValue: number) {
        super();
        this.app = app;
        this.visible = false;
        this.symbolHeight = getSymbolHeight(app.screen);
        this.size = getBiggerSize(this.app.screen);
        this.sortableChildren = true;
        this.prepareNewScreen();

        this.text = new WinText(app.screen, winValue);
        this.addChild(this.text);
    }

    showScreen() {
        this.visible = true;
        this.showGlows();
    }
    prepareNewScreen = () => {
        this.glows.forEach((glow) => this.removeChild(glow));
        this.glows = [];
        this.drawGlows("lightGlow", 20);
        this.drawGlows("blueGlow", 20);
        this.drawGlows("pinkGlow", 10);
        this.drawGlows("lightpinkGlow", 10);
    };

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
        const tl = gsap.timeline();

        tl.fromTo(
            this.glows,
            {
                pixi: { alpha: 0 },
            },
            {
                pixi: { alpha: 1 },
                stagger: 0.1 * Math.random(),
                ease: "back",
                duration: 0.5,
                delay: 1,
            },
        );
        tl.to(this.glows, {
            // pixi: { alpha: 1 },
            x: this.app.screen.width / 2,
            y: this.symbolHeight * 3,
            width: this.size,
            height: this.size,
            alpha: 0.5,
            duration: 2,
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
    cleanUp = () => {
        this.app.stage.removeChild(this);
    };
}
