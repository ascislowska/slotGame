import { scrollBy } from "../pixi/consts";
import { symbolsKeys } from "../pixi/consts";
export const symbolsList = (cheat?: boolean) => {
    const list: string[] = [];
    if (cheat) {
        for (let i = 0; i < scrollBy; i++) {
            const index = Math.floor(Math.random() * symbolsKeys.length);
            list.push(symbolsKeys[index]);
        }
        list[list.length - 2] = "star";
        return list;
    }
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
