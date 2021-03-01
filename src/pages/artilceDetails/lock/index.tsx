import React, { useState } from "react";
import style from "./style.module.scss";
import articleAxios from "../../../api/article";
// 组件
import Icon from "../../../components/icon";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import message from "../../../components/message";

// 接口：props
interface ILockProps {
    articleInfo: any;
    reinitializePage: (p: string) => void;
    setIsLock: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lock: React.FC<ILockProps> = ({ articleInfo, setIsLock, reinitializePage }) => {
    // 弹窗
    const [visible, setVsible] = useState<boolean>(false);
    // 访问密码
    const [password, setPassword] = useState<string>("");

    // 确认密码
    const onOk = async () => {
        if (!password) {
            message.error("请输入校验密码！");
        } else {
            const articleId = window.location.href.split("?")[0].split("/").reverse()[0];
            const res = await articleAxios.checkPassword({
                _id: articleId,
                password,
            });
            if (res.data.success) {
                reinitializePage(password);
                setVsible(false);
                setPassword("");
            } else {
                message.error("密码校验失败！");
            }
        }
    };

    return (
        <div className={style["lock-box"]}>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            {/* 锁 */}
            <div className={style["lock-wrap"]}>
                <Icon
                    type="iconxingzhuang"
                    className={style["iconxingzhuang"]}
                    onClick={() => {
                        setVsible(true);
                    }}
                />
            </div>

            <Modal
                visible={visible}
                setVsible={setVsible}
                title="访问简历"
                width="30vw"
                onCancel={() => {
                    setPassword("");
                }}
                onOk={onOk}
            >
                <Input
                    className={style["input"]}
                    value={password}
                    placeholder="请输入访问密码"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Lock;
