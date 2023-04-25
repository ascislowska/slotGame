import { Assets, Container, Rectangle, Text, TextStyle } from "pixi.js";
import { symbolHeight } from "./consts";

export class WinText extends Container {
    style = new TextStyle({
        fontFamily: "arial",
        fontSize: 36,
        fontWeight: "bold",
        fill: ["#020F9C", "#1F98FA"], // gradient
        stroke: "rgb(255, 255, 130)",
        strokeThickness: 1,
        // dropShadow: true,
        // dropShadowColor: "rgb(255, 255, 209)",
        // dropShadowBlur: 20,
        // dropShadowDistance: 0,

        lineJoin: "round",
    });
    constructor(screen: Rectangle, winValue: number) {
        // Assets.add(neonFont, "../assets/fonts/TiltNeon-Regular.ttf");
        // Assets.load("neonFont").then(() => this.createText());

        super();
        const textContent = `Big win!!! ${winValue}`;
        this.createText(textContent);
        this.positionContainer(screen);
    }
    createText = (textContent: string) => {
        const text = new Text(textContent, this.style);
        // text.anchor.set(0.5)
        this.zIndex = 2;
        this.addChild(text);
    };
    positionContainer = (screen: Rectangle) => {
        this.pivot.set(this.width / 2, this.height / 2);
        this.y = symbolHeight * 3;
        this.x = screen.width / 2;
    };
}
