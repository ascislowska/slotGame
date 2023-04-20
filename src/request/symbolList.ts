//export const symbolsList = ["0", "7", "0", "7", "0", "7", "0", "7", "0", "7"];
import { scrollBy } from "../pixi/consts";
import { symbolsKeys } from "../pixi/consts";
export const symbolsList = () => {
    const list: string[] = [];
    for (let i = 0; i < scrollBy; i++) {
        const index = Math.floor(Math.random() * symbolsKeys.length);
        list.push(symbolsKeys[index]);
    }
    return list;
};
export const randomInitialSymbols = () => {
    const list: string[] = [];
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * symbolsKeys.length);
        list.push(symbolsKeys[index]);
    }
    return list;
};
