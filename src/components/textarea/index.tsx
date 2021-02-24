import React from "react";
import style from "./style.module.scss";

// 接口：props
interface ITextAreaProps {
    placeholder?: string;
    value: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<ITextAreaProps> = ({
    placeholder,
    value,
    className,
    onChange,
}) => {
    const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e);
    };

    return (
        <div className={`${style["textarea-wrap"]} ${className}`}>
            <textarea
                className={style["textarea"]}
                value={value}
                placeholder={placeholder}
                onChange={change}
            />
        </div>
    );
};

export default Textarea;
