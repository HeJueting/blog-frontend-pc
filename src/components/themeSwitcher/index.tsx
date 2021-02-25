import React, { useState, useContext } from "react";
import style from "./style.module.scss";
import context from "../../store/context";
import Icon from "../icon";

const ThemeSwitcher: React.FC = () => {
    // store
    const { dispatch } = useContext(context);
    // 是否开启夜间模式
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={style["switcher-box"]}>
            <div className={style["track"]}></div>
            <div
                className={style["thumb"]}
                style={{ left: isOpen ? "1.3vw" : "-0.9vw" }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    // 初始化主题色
                    dispatch({
                        type: "SET_THEME",
                        params: { theme: isOpen ? "dark" : "light" },
                    });
                }}
            >
                <Icon
                    type={isOpen ? "iconyueliang" : "icontaiyang"}
                    className={style["icon"]}
                />
            </div>
        </div>
    );
};

export default ThemeSwitcher;
