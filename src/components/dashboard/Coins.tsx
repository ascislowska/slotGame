import { useMainStore } from "../../hooks/useMainStore";
import { observer } from "mobx-react-lite";
import ChangeButton from "./ChangeButton";

const Coins: React.FC = () => {
    const {
        budget: { coins, coinValue, changeCoinValue, isMaxCoinValue },
    } = useMainStore();
    return (
        <div className="coins">
            <div>
                Coins
                <div className="amount">{coins.toFixed(0)}</div>
            </div>
            <div>
                Coin value
                <div className="changeable ">
                    <ChangeButton
                        change="decrease"
                        onClick={() => changeCoinValue("decrease")}
                        disabled={coinValue <= 0.1}
                    />
                    <div className="amount">{coinValue.toFixed(1)}</div>
                    <ChangeButton
                        change="increase"
                        onClick={() => changeCoinValue("increase")}
                        disabled={isMaxCoinValue}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(Coins);
