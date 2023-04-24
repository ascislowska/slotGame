import { Rectangle } from "pixi.js";

export const symbolWidth = 100;
export const symbolHeight = 100;
export const symbolPadding = 10;
export const getSymbolHeight = (screen: Rectangle) => screen.height / 8;

export const spinSpeed = 10;
export const scrollBy = 17;
export const numberOfRows = 3;
export const numberOfReels = 3;

export const symbolsKeys = ["drink", "cafe", "burger", "star", "music"];
export const glows = ["pink-glow", "light-glow", "blue-glow", "lightpink-glow"];
