import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../button";
import style from "./style.module.scss";
import Icon from "../icon";

// 接口：props
interface IModalProps {
    title?: string;
    width?: string;
    visible: boolean;
    setVsible: (v: boolean) => void;
    className?: string;
    onOk?: () => void;
    onCancel?: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({
    title = "弹窗",
    width,
    visible,
    setVsible,
    className,
    onOk,
    onCancel = () => {},
    children,
}) => {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        //判断当前页面中是否有装载moudle的盒子
        let wrap = document.getElementById("global-modal-wrap");
        if (!wrap) {
            wrap = document.createElement("div");
            wrap.id = "global-modal-wrap";
            document.body.appendChild(wrap);
        }
        setContainer(wrap);
    }, []);

    // 点击取消
    const cancel = () => {
        setVsible(false);
        onCancel();
    };

    // modal-box的style
    const getBoxStyle = () => {
        const style: any = {};
        if (width) {
            style.width = width;
        }
        return style;
    };

    return container
        ? ReactDOM.createPortal(
              <div
                  className={`${style["modal-wrap"]} ${
                      visible
                          ? style["modal-wrap-show"]
                          : style["modal-wrap-hidden"]
                  }`}
              >
                  <div className={style["modal-mask"]} onClick={cancel}></div>
                  <div className={style["modal-box"]} style={getBoxStyle()}>
                      <header>
                          <h4>{title}</h4>
                          <Icon
                              type="iconfail"
                              className={style["iconfail"]}
                              onClick={cancel}
                          />
                      </header>
                      <main>{children}</main>
                      <footer>
                          <Button className={style["button"]} onClick={cancel}>
                              取消
                          </Button>
                          <Button className={style["button"]} onClick={onOk}>
                              确认
                          </Button>
                      </footer>
                  </div>
              </div>,
              container
          )
        : null;
};

export default Modal;
