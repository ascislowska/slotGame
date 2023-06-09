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
import { mobileLandscape } from "./utils";

export class PlayBtn extends Container {
    onClick: () => void;
    app: Application;
    btn: Sprite | null = null;
    disabled: boolean = false;
    playAnimation = gsap.timeline();
    filter = new ColorMatrixFilter();
    normalBrightness = 2;

    constructor(onClick: () => void, app: Application) {
        super();
        this.app = app;

        this.addSprite();
        this.onClick = onClick;
        this.sortableChildren = true;

        this.filter = new ColorMatrixFilter();
        this.filters = [this.filter];
        this.lightUp();
        this.addGlows();
    }

    private async addSprite() {
        const texture = await Assets.load("spin");
        this.btn = Sprite.from(texture);
        this.addChild(this.btn);
        this.btn.eventMode = "static";
        this.btn.texture.baseTexture.mipmap = MIPMAP_MODES.ON;

        this.btn.on("pointerdown", this.onClick);
        this.btn.on("mouseover", this.onMouseOver);
        this.btn.on("mouseout", this.onMouseOut);

        this.btnPosition();
        this.btnSize();
        this.blink(this.btn);
    }
    private addGlows() {
        const glow = Sprite.from("lightGlow");
        this.addChild(glow);
        glow.alpha = 0.1;
        glow.anchor.set(0.5, 0.5);
        // glow.position.set(this.width / 2, this.height / 2);
        glow.zIndex = -1;
    }

    public btnPosition() {
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height * 0.7;
        if (mobileLandscape(this.app.screen)) {
            this.x = this.width;
            this.y = this.app.screen.height / 2;
        }
    }
    public btnSize() {
        if (this.btn) {
            this.btn.width = this.btn.height =
                getSymbolHeight(this.app.screen) * 2;
            this.btn.anchor.set(0.5);
        }
    }
    onMouseOver = () => {
        if (!this.disabled) {
            this.playAnimation.pause();
            gsap.to(this.filter, { brightness: this.normalBrightness * 2 });
        }
    };
    onMouseOut = () => {
        if (!this.disabled) {
            this.playAnimation.play();
            gsap.to(this.filter, { brightness: this.normalBrightness });
        }
    };
    disable = () => {
        this.disabled = true;
        if (this.btn) this.btn.eventMode = "none";
        this.playAnimation.pause();
        gsap.to(this.filter, { brightness: 0.2 });
    };
    enable = () => {
        this.disabled = false;

        if (this.btn) {
            gsap.to(this.filter, { brightness: this.normalBrightness });
            this.btn.eventMode = "static";
        }
    };
    lightUp = () => {
        this.playAnimation.fromTo(
            this.filter,
            { brightness: 0.1 },
            {
                brightness: 3,
                duration: 4,
                ease: "bounce.out",
            },
            "<",
        );
    };
    blink(target: Sprite) {
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
    onResize() {
        this.btnPosition();
        this.btnSize();
    }
}
