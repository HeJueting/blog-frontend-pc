import React from "react";
import style from "./style.module.scss";

// 接口：props
interface IInputProps {
    placeholder?: string;
    value: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({
    placeholder,
    value,
    onChange,
    className,
}) => {
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <div className={`${style["input-wrap"]} ${className}`}>
            <input
                className={`${style["input"]}`}
                value={value}
                placeholder={placeholder}
                onChange={change}
                autoComplete={"off"}
            />
        </div>
    );
};

export default Input;
