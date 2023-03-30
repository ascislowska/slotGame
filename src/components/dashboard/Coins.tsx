import { useMainStore } from "../../hooks/useMainStore";
import { observer } from "mobx-react-lite";
import ChangeButton from "./ChangeButton";

const Coins: React.FC = () => {
    const {
        budget: { coins, coinValue, changeCoinValue, isMaxCoinValue },
    } = useMainStore();
    return (
        <>
            <div>
                Coin Value:
                <div>
                    <ChangeButton
                        change="decrease"
                        onClick={() => changeCoinValue("decrease")}
                        disabled={coinValue <= 0.1}
                    />
                    {coinValue.toFixed(1)}
                    <ChangeButton
                        change="increase"
                        onClick={() => changeCoinValue("increase")}
                        disabled={isMaxCoinValue}
                    />
                </div>
            </div>
            <div>Coins: {coins.toFixed(0)}</div>
        </>
    );
};

export default observer(Coins);
