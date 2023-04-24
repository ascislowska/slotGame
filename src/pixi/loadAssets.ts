import { Assets } from "pixi.js";
import { symbolsKeys, glows } from "./consts";
export const loadAssets = async () => {
    symbolsKeys.forEach(async (symbol) => {
        Assets.add(symbol, `../../assets/symbols/${symbol}.png`);
        await Assets.load(symbol);
    });
    glows.forEach(async (element) => {
        Assets.add(element, `../../assets/glows/${element}.png`);
        Assets.load(element);
    });
    Assets.add("coin", `../../assets/coin.png`);
    await Assets.load("coin");
    Assets.add("border-neon", `../../assets/border-neon.png`);
    await Assets.load("border-neon");
    Assets.add("spin", `../../assets/play.png`);
    await Assets.load("spin");
    Assets.add("check", `../../assets/check.png`);
    Assets.load("check");
    Assets.add("night", `../../assets/night.jpg`);
    await Assets.load("night");
};
