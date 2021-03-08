import React from "react";
import style from "./style.module.scss";

// 接口：props
interface IInputProps {
    type?: string;
    placeholder?: string;
    value: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({ placeholder, value, onChange, className, type }) => {
    return (
        <div className={`${style["input-wrap"]} ${className}`}>
            <input
                type={type}
                className={`${style["input"]}`}
                value={value}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                }}
                autoComplete={"off"}
            />
        </div>
    );
};

export default Input;
