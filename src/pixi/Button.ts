import {
    Application,
    Sprite,
    Container,
    Assets,
    MIPMAP_MODES,
    ColorMatrixFilter,
} from "pixi.js";
import { getSymbolHeight } from "./consts";
import { gsap } from "gsap";

export class Button extends Container {
    onClick: () => void;
    app: Application;
    btn: Sprite | null = null;
    disabled: boolean = false;
    playAnimation = gsap.timeline();
    filter: ColorMatrixFilter;

    constructor(onClick: () => void, app: Application) {
        super();
        this.app = app;
        this.addSprite();
        this.btnPosition();
        this.onClick = onClick;
        this.sortableChildren = true;
        this.filter = new ColorMatrixFilter();
        this.filters = [this.filter];
    }

    private async addSprite() {
        const texture = await Assets.load("spin");
        this.btn = Sprite.from(texture);
        this.addChild(this.btn);
        this.btn.eventMode = "static";
        this.btn.texture.baseTexture.mipmap = MIPMAP_MODES.ON;

        this.btn.width = this.btn.height = getSymbolHeight(this.app.screen) * 2;
        // this.pivot.set(this.width / 2, this.height / 2);
        this.btn.anchor.set(0.5);
        this.btn.on("pointerdown", this.onClick);
        this.btn.on("mouseover", this.onMouseOver);
        this.btn.on("mouseout", this.onMouseOut);

        this.blink(this.btn);
    }
    private btnPosition() {
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height * 0.7;
    }
    onMouseOver = () => {
        this.playAnimation.pause();
        // gsap.to(this.btn, { pixi: { tint: "rgb(255,255,255" } });
        gsap.to(this.filter, { brightness: 3 });
    };
    onMouseOut = () => {
        if (!this.disabled) {
            this.playAnimation.play();
            gsap.to(this.filter, { brightness: 1 });
        }
    };
    disable = () => {
        this.disabled = true;
        this.playAnimation.pause();
        gsap.to(this.filter, { brightness: 0.2 });
    };
    enable = () => {
        this.disabled = false;
        if (this.btn) {
            gsap.to(this.filter, { brightness: 1 });

            // this.btn.tint = "#FFFFFF";
        }
    };
    blink(target: Sprite) {
        this.playAnimation.fromTo(
            this.btn,
            {
                pixi: { tint: "rgb(0,0, 0)" },
            },
            {
                pixi: { tint: "rgb(255,255, 255)" },
                duration: 4,
                ease: "bounce.out",
            },
        );
        this.playAnimation.fromTo(
            this.filter,
            { brightness: 3 },
            {
                brightness: 1,
                duration: 4,
                ease: "bounce.out",
            },
        );
        const blinking = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        blinking.to(target, {
            pixi: { tint: "rgb(180, 0, 180)" },
            duration: Math.random() + 0.1,
            repeat: 3,
        });
        blinking.to(target, {
            pixi: { tint: "rgb(100,200, 100)" },
            duration: Math.random() + 0.05,
            repeat: 2,
        });
        blinking.to(target, {
            pixi: { tint: "rgb(255, 255, 255)" },
            duration: Math.random() + 2.5,
        });
        this.playAnimation.add(blinking);
        // blinking.play();
    }
}
