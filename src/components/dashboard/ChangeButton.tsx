import React from "react";
interface ChangeButtonProps {
    change: "increase" | "decrease";
    onClick: any;
}
const ChangeButton = ({ change, onClick }: ChangeButtonProps) => {
    return (
        <button className="changeButton" onClick={onClick}>
            {change === "increase" ? "+" : "-"}
        </button>
    );
};

export default ChangeButton;
