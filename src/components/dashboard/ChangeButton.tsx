import React from "react";
interface ChangeButtonProps {
    change: "increase" | "decrease";
    onClick: any;
    disabled?: boolean;
}
const ChangeButton: React.FC<ChangeButtonProps> = ({
    change,
    onClick,
    disabled,
}) => {
    return (
        <button className="changeButton" onClick={onClick} disabled={disabled}>
            {change === "increase" ? "+" : "-"}
        </button>
    );
};

export default ChangeButton;
