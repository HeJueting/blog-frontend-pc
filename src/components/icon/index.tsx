import React from "react";

// 接口：props
interface IIconProps {
    type: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const Icon: React.FC<IIconProps> = ({
    type,
    style = {},
    className = "",
    onClick = () => {},
}) => {
    return (
        <span
            onClick={onClick}
            className={`iconfont ${type} ${className || ""}`}
            style={style}
        />
    );
};

export default Icon;
