import { observer } from "mobx-react-lite";
import { useMainStore } from "../../hooks/useMainStore";

import ChangeButton from "./ChangeButton";
const NextBet = () => {
    const {
        budget: { nextBet, betLevel, changeBetLevel, isMaxBet },
    } = useMainStore();
    return (
        <>
            <div>Next bet: {nextBet}</div>

            <div>
                Bet level:
                <div>
                    <ChangeButton
                        change="decrease"
                        onClick={() => changeBetLevel("decrease")}
                        disabled={betLevel <= 1}
                    />
                    {betLevel}
                    <ChangeButton
                        change="increase"
                        onClick={() => changeBetLevel("increase")}
                        disabled={isMaxBet}
                    />
                </div>
            </div>
        </>
    );
};

export default observer(NextBet);
