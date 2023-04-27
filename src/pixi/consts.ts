import { Rectangle } from "pixi.js";

export const symbolWidth = 100;
export const symbolHeight = 100;
export const symbolPadding = 10;
export const getSymbolHeight = (screen: Rectangle) => {
    if (screen.height < 800) {
        return screen.height / 6;
    }
    return screen.height / 9;
};

export const spinSpeed = 10;
export const scrollBy = 17;
export const numberOfRows = 3;
export const numberOfReels = 3;

export const symbolsKeys = ["drink", "cafe", "burger", "star", "music"];
// export const symbolsKeys = ["burger", "drink"];

export const glows = ["blueGlow", "lightGlow", "lightpinkGlow", "pinkGlow"];
