import {
    DisplayObject,
    Application,
    Container,
    Sprite,
    MIPMAP_MODES,
} from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { getSymbolHeight } from "./consts";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI({
    DisplayObject: DisplayObject,
    Application,
    Container,
    Sprite,
});

export class Symbol extends Container {
    symbolHeight: number;

    constructor(index: number, symbolKey: string, app: Application) {
        super();
        this.symbolHeight = getSymbolHeight(app.screen);
        const symbol = Sprite.from(symbolKey);

        symbol.width = symbol.height = this.symbolHeight;
        symbol.texture.baseTexture.mipmap = MIPMAP_MODES.ON;
        this.addChild(symbol);
        symbol.anchor.set(0.5, 0.5);
        symbol.y = index * this.symbolHeight;
        this.blink();
    }
    blink() {
        const blinking = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        blinking.to(this.children, {
            pixi: { tint: "rgb(255, 255, 180)" },
            duration: Math.random() + 0.1,
            repeat: 3,
        });
        blinking.to(this.children, {
            pixi: { tint: "rgb(130, 150, 255)" },
            duration: Math.random() + 0.1,
            repeat: 2,
        });
        blinking.to(this.children, {
            pixi: { tint: "rgb(255, 255, 255)" },
            duration: Math.random() + 0.1,
        });
        blinking.play();
    }
    async win() {
        await gsap.to(this.children, {
            rotation: Math.PI * 4,
            // pixi: { tint: "rgb(255, 255, 130)", scaleX: 0.7, scaleY: 0.7 },
            duration: 0.5,
        });
    }
    lost() {
        const symbolScale = this.children[0].scale;
        const rotateBy = Math.PI * (Math.random() * 0.05);
        console.log(rotateBy);
        const shaking = gsap.timeline();
        shaking.fromTo(
            this.children,
            {
                rotation: rotateBy,
                pixi: {
                    scaleX: symbolScale.x * 0.8,
                    scaleY: symbolScale.y * 0.8,
                },
            },
            {
                rotation: -rotateBy,
                pixi: {
                    scaleX: symbolScale.x * 1.2,
                    scaleY: symbolScale.y * 1.2,
                },
                duration: 0.02,
                yoyo: true,
                repeat: 10,
            },
        );
        shaking.to(this.children, { rotation: 0 });
    }
}
