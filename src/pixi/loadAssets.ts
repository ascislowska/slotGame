import { Assets } from "pixi.js";
import { symbolsKeys } from "./consts";
export const loadAssets = async () => {
    // for (let i = 0; i < symbolsKeys.length; i++) {
    //     Assets.add(`${i}`, `../../assets/symbols/${i}.png`);
    // }

    // Assets.add("play", "../../assets/symbols/play.svg");
    // await Assets.load(["0", "1", "2", "3", "4", "5", "6"]);
    symbolsKeys.forEach(async (symbol) => {
        Assets.add(`${symbol}`, `../../assets/symbols/${symbol}.png`);
        await Assets.load(symbol);
    });
    // Assets.add("star", `../../assets/symbols/star.png`);
    // Assets.add("drink", `../../assets/symbols/drink.png`);
    //   await Assets.load([symbolsKeys[0], "drink"]);
    await Assets.load("play");
    Assets.add("coin", `../../assets/coin.png`);
    await Assets.load("coin");
    Assets.add("button-glow", `../../assets/button-glow.png`);
    await Assets.load("button-glow");
    Assets.add("button-withoutglow", `../../assets/button-withoutglow.png`);
    await Assets.load("button-withoutglow");
    Assets.add("border-neon", `../../assets/border-neon.png`);
    await Assets.load("border-neon");
    Assets.add("spin", `../../assets/spin.jpg`);
    Assets.load("spin");
    Assets.add("night", `../../assets/night.jpg`);
    await Assets.load("night");
};
