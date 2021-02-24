import React from "react";
import styles from "./style.module.scss";

// 接口：props
interface IButtonProps {
	style?: any;
	className?: string;
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<IButtonProps> = ({
	className = "",
	children,
	onClick,
	style = {},
}) => {
	return (
		<button
			style={style}
			className={`${styles["button"]} ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
