import React from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

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
        <button
            className={`changeButton`}
            onClick={onClick}
            disabled={disabled}
        >
            {change === "increase" ? <IoChevronForward /> : <IoChevronBack />}
        </button>
    );
};

export default ChangeButton;
