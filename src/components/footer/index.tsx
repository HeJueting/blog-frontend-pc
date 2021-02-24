import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.scss";
import Icon from "../../components/icon";
import CONFIG from "../../config";
import context from "../../store/context";
import lodash from "../../utils/lodash";

const Footer: React.FC = () => {
    // store
    const { state } = useContext(context);
    const { settingInfo } = state;
    // state
    const [time, setTime] = useState<string>("");

    const setRuningTime = (): void => {
        const current = +new Date();
        const diff = (current - CONFIG.PUBLISH_TIME) / 1000;
        const dd = parseInt(String(diff / 60 / 60 / 24));
        const hh = parseInt(String((diff / 60 / 60) % 24));
        const mm = parseInt(String((diff / 60) % 60));
        const ss = parseInt(String(diff % 60));
        setTime(
            `${dd}天 ${hh < 10 ? `0${hh}` : hh}时 ${
                mm < 10 ? `0${mm}` : mm
            }分 ${ss < 10 ? `0${ss}` : ss}秒`
        );
    };

    useEffect(() => {
        setRuningTime();
        const timer = setInterval(() => {
            setRuningTime();
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <footer className={style["footer-wrap"]}>
            <div className={style["footer-top"]}>
                <div className={style["reward"]}>
                    <p className={style["tea"]}>
                        <Icon
                            type="iconlifeon"
                            className={style["tea-iconfont"]}
                        />
                        继续加油
                    </p>
                    <div className={style["weixin"]}></div>
                    <p className={style["pay"]}>微信扫一扫</p>
                </div>

                <div className={style["footer-content-wrap"]}>
                    <p className={style["content-title"]}>Website Links</p>
                    <div className={style["context-links"]}>
                        {lodash.get(settingInfo, "links", []).map((item) => (
                            <a target="_blank" href={item.url} key={item.title}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>

                <div className={style["reward"]}>
                    <p className={style["tea"]}>
                        <Icon
                            type="iconlifeon"
                            className={style["tea-iconfont"]}
                        />
                        继续加油
                    </p>
                    <div className={style["zhifubao"]}></div>
                    <p className={style["pay"]}>支付宝扫一扫</p>
                </div>
            </div>

            <div className={style["footer-bottom"]}>
                <p>design by He Jueting. All rights reserved. </p>
                <span></span>
                <p>渝ICP备18002750号</p>
                <span></span>
                <p>本站已运行: {time}</p>
            </div>
        </footer>
    );
};

export default Footer;
