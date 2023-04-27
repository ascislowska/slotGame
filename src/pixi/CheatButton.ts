import {
    Application,
    Sprite,
    Container,
    Assets,
    MIPMAP_MODES,
    ColorMatrixFilter,
    TextStyle,
    Text,
} from "pixi.js";
import { getSymbolHeight } from "./consts";
import { gsap } from "gsap";

export class CheatBtn extends Container {
    onClick: () => void;
    app: Application;
    btn: Sprite | null = null;
    enabled: boolean = false;
    playAnimation = gsap.timeline();
    filter = new ColorMatrixFilter();

    constructor(onClick: () => void, app: Application) {
        super();
        this.app = app;

        this.addSprite();
        this.onClick = onClick;
        this.sortableChildren = true;

        this.filter = new ColorMatrixFilter();
        this.filters = [this.filter];
    }

    private async addSprite() {
        const texture = await Assets.load("check");
        this.btn = Sprite.from(texture);
        this.addChild(this.btn);
        this.btn.eventMode = "static";
        this.btn.texture.baseTexture.mipmap = MIPMAP_MODES.ON;

        this.btn.on("pointerdown", this.onClick);
        this.btn.on("mouseover", this.onMouseOver);
        this.btn.on("mouseout", this.onMouseOut);
        this.addText();
        this.btnSize();
        this.btnPosition();
    }

    public btnPosition() {
        if (this.app.screen.height < 400) {
            console.log(this.app.screen.height);
            this.x = 0;
            this.y = this.app.screen.height - this.height;
        } else {
            this.x = this.app.screen.width - this.width;
            this.y = 0;
        }
    }
    public btnSize() {
        if (this.btn) {
            this.btn.width = this.btn.height = getSymbolHeight(this.app.screen);
        }
    }
    addText() {
        const style = new TextStyle({
            fontFamily: "arial",
            fontSize: 18,
            fill: ["#678AF9"],
            stroke: "#0205FD",
            strokeThickness: 1,
            lineJoin: "round",
        });
        const text = new Text("cheat mode", style);
        this.addChild(text);
    }
    toggleBtn = () => {
        if (this.enabled) {
            this.disable();
        } else if (!this.enabled) {
            this.enable();
        }
    };
    enable = () => {
        this.enabled = true;
        gsap.to(this.filter, { brightness: 6 });
        console.log("enabled set to ", this.enabled);
    };
    disable = () => {
        this.enabled = false;
        gsap.to(this.filter, { brightness: 1 });
    };
    onMouseOver = () => {
        gsap.to(this.filter, { brightness: 6 });
    };
    onMouseOut = () => {
        console.log(this.enabled);
        if (!this.enabled) {
            gsap.to(this.filter, { brightness: 1 });
        }
    };
    onResize() {
        this.btnSize();
        this.btnPosition();
    }
}
