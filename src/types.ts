export type Currency = "€" | "$" | "PLN";

export type Change = "increase" | "decrease";
export interface IBudget {
    credits: number;
    nextBet: number;
    payout: number;
    changeBudget: (amount: number) => void;
    bet: (change: Change) => void;
    win: (amount: number) => void;
}
export type IReel = { top: string; middle: string; bottom: string };
