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
import { getSymbolHeight, symbolPadding } from "./consts";
import { gsap } from "gsap";
import { mobileLandscape } from "./utils";

export class CheatBtn extends Container {
    onClick: () => void;
    app: Application;
    // btn: Sprite | null = null;
    enabled: boolean = false;
    playAnimation = gsap.timeline();
    filter = new ColorMatrixFilter();
    checkbox: Sprite | null = null;
    checked: Sprite | null = null;
    text: Text | null = null;

    constructor(onClick: () => void, app: Application) {
        super();
        this.app = app;

        this.addSprite("checkbox");
        this.addSprite("checked");
        this.addText();
        this.onClick = onClick;
        this.sortableChildren = true;

        this.filter = new ColorMatrixFilter();
        this.filters = [this.filter];
        // this.checkbox = this.addSprite("checkbox");
        // this.btnSize();
        this.containerPosition();
    }

    private async addSprite(name: "checkbox" | "checked") {
        const texture = await Assets.load(name);
        const btn = Sprite.from(texture);
        this.addChild(btn);

        btn.eventMode = "static";
        btn.texture.baseTexture.mipmap = MIPMAP_MODES.ON;

        btn.on("pointerdown", this.onClick);
        btn.on("mouseover", this.onMouseOver);
        btn.on("mouseout", this.onMouseOut);
        this[name] = btn;
        this.btnSize(name);
        this.containerPosition();
        if (this.checked) {
            this.checked.visible = false;
        }
    }

    public containerPosition() {
        if (mobileLandscape(this.app.screen)) {
            this.x = getSymbolHeight(this.app.screen) / 2;
            this.y = this.app.screen.height - this.height;
        } else {
            this.x = this.app.screen.width - this.text!.width;
            this.y = +symbolPadding;
        }
    }
    public btnSize(name: "checkbox" | "checked") {
        if (this[name]) {
            this[name]!.width = this[name]!.height =
                getSymbolHeight(this.app.screen) / 2;
            this[name]!.x = -this[name]!.width;
        }
    }
    addText() {
        const style = new TextStyle({
            fontFamily: "arial",
            fontSize: 18,
            fill: ["#FFFF66", "LemonChiffon"],
            stroke: "black",
            strokeThickness: 1,
            lineJoin: "round",
        });
        const text = new Text("cheat mode", style);
        this.addChild(text);
        this.text = text;
        text.anchor.set(0, 0.5);
        text.position.set(0, getSymbolHeight(this.app.screen) / 4);
    }
    toggleBtn = () => {
        if (this.enabled) {
            this.disable();
            if (this.checked) {
                this.checked.visible = false;
            }
        } else if (!this.enabled) {
            this.enable();
            if (this.checked) {
                this.checked.visible = true;
            }
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
        this.btnSize("checkbox");
        this.btnSize("checked");

        this.containerPosition();
    }
}
