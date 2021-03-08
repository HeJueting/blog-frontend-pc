import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import userAxios from "../../api/user";
import localforage from "localforage";
import CONFIG from "../../config";

import Input from "../../components/input";
import Button from "../../components/button";
import message from "../../components/message";

const Login: React.FC = () => {
    // 用户名，密码
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // 邮箱校验码
    const [code, setCode] = useState<string>("");
    // 倒计时
    const [count, setCount] = useState<number>(0);

    // 验证码倒计时
    useEffect(() => {
        let timer = null;
        if (count > 0) {
            timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        }
        return () => {
            timer && clearTimeout(timer);
        };
    }, [count]);

    // 点击获取验证码
    const getCode = () => {
        // 请求发送验证码
        userAxios.sendVerifyCode();
        // 开始倒计时
        setCount(60);
    };

    // 点击登录
    const login = async () => {
        if (!userName) {
            message.error("请输入登录昵称");
        } else if (!password) {
            message.error("请输入登录密码");
        } else if (!code) {
            message.error("请输入邮箱验证码");
        } else {
            const res = await userAxios.login({
                userName,
                password,
                code,
            });
            if (res.code === 0) {
                message.success(`登录成功，系统1s将自动跳转到管理端 ~`);
                await localforage.setItem("token", res.data.token);
                // 跳转到博客管理系统
                setTimeout(() => {
                    window.location.href = CONFIG.BLOG_ADMIN_URL;
                }, 1000);
            }
        }
    };

    return (
        <div className={style["login-box"]}>
            <h3 className={style["login-title"]}>博客管理系统 - 后台登录</h3>
            <div className={style["login-box"]}>
                <Input
                    className={style["input"]}
                    placeholder="请输入登录昵称"
                    value={userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserName(e.target.value.substring(0, 20));
                    }}
                />
                <Input
                    className={style["input"]}
                    placeholder="请输入登录密码"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value.substring(0, 20));
                    }}
                    type="password"
                />
                <div className={style["code-box"]}>
                    <Input
                        className={style["input"]}
                        placeholder="邮箱验证码"
                        value={code}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCode(e.target.value.substring(0, 20));
                        }}
                    />
                    {count === 0 ? (
                        <Button className={style["button"]} onClick={getCode}>
                            点击获取
                        </Button>
                    ) : (
                        <Button className={style["disable-button"]}>{count}</Button>
                    )}
                </div>
                <Button onClick={login} className={style["button"]}>
                    登录
                </Button>
            </div>
        </div>
    );
};

export default Login;
