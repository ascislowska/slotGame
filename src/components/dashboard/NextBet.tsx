import { observer } from "mobx-react-lite";
import { useMainStore } from "../../hooks/useMainStore";

import ChangeButton from "./ChangeButton";
import { reaction } from "mobx";
const NextBet = observer(() => {
    const {
        budget: { nextBet, betLevel, changeBetLevel, isMaxBet },
    } = useMainStore();
    reaction(
        () => nextBet,
        (nextBet) => console.log("reaction"),
    );
    return (
        <div className="next-bet">
            <div>
                Next bet:
                <div className="amount">{nextBet}</div>
            </div>

            <div>
                Bet level
                <div className="changeable">
                    <ChangeButton
                        change="decrease"
                        onClick={() => changeBetLevel("decrease")}
                        disabled={betLevel <= 1}
                    />
                    <div className="amount">{betLevel}</div>
                    <ChangeButton
                        change="increase"
                        onClick={() => changeBetLevel("increase")}
                        disabled={isMaxBet}
                    />
                </div>
            </div>
        </div>
    );
});

export default NextBet;
