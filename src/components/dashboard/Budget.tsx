import { observer } from "mobx-react-lite";
import { useMainStore } from "../../hooks/useMainStore";
const Budget = () => {
    const {
        budget: { budget, nextBetVal, winValue },
        player: { currency },
    } = useMainStore();

    return (
        <div className="budget">
            <div>
                Total budget: {budget.toFixed(2)}
                {currency}
            </div>
            <div>
                Bet: {nextBetVal.toFixed(1)} {currency}
            </div>
            <div>
                Win: {winValue.toFixed(2)} {currency}
            </div>
        </div>
    );
};
export default observer(Budget);
