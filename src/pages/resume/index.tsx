import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import localforage from 'localforage';
import { getUrlQuery } from '../../utils/help';
import resumeAxios from '../../api/resume';
// 组件
import Icon from '../../components/icon';
import Modal from '../../components/modal';
import Input from '../../components/input';
import message from '../../components/message';
// 接口
import { IResumeSearch } from '../../typing/api/resume';

// 接口：props
interface IResumeProps {
    resumeInfo: any;
}

const Resume: React.FC<IResumeProps> = ({ resumeInfo }) => {
    // 是否锁住简历
    const [isLock, setIsLock] = useState<boolean>(true);
    // 简历信息
    const [html, setHtml] = useState<string>('');
    // 访问简历的弹窗
    const [visible, setVsible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    // 重新初始化页面
    const reinitializePage = async (password?: string) => {
        // 查询简历信息
        const condition: IResumeSearch = {};
        password && (condition.password = password);
        const res = await resumeAxios.search(condition);
        // 如果查询成功
        if (res.data) {
            setHtml(res.data.content);
            setIsLock(false);
        }
    };

    useEffect(() => {
        // 判断该简历是否可以解锁查看
        const checkIsLock = async () => {
            // 如果resumeInfo信息存在，说明可以直接访问我的简历
            if (resumeInfo) {
                // 初始化简历数据
                setHtml(resumeInfo.content);
                setIsLock(false);
            } else {
                const query: any = getUrlQuery(window.location.href);
                const token = await localforage.getItem('token');
                // 如果访问时携带password，则重新查询文章详情
                if (query.password) {
                    reinitializePage(query.password);
                }
                // 如果是本人登录后查看
                else if (token) {
                    reinitializePage();
                }
                // 上锁文章
                else {
                    setIsLock(true);
                }
            }
        };
        checkIsLock();
    }, [resumeInfo]);

    //确认访问简历
    const onOk = async () => {
        if (!password) {
            message.error('请输入校验密码！');
        } else {
            const res = await resumeAxios.checkPassword({ password });
            if (res.data.success) {
                reinitializePage(password);
                message.success('密码校验成功！');
                setVsible(false);
                setPassword('');
            } else {
                message.error('密码校验失败！');
            }
        }
    };

    return (
        <div className={style['resume-box']}>
            {isLock ? (
                <div className={style['no-resume-wrap']}>
                    <header />
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    {/* 锁 */}
                    <div className={style['lock-wrap']}>
                        <Icon
                            type="iconxingzhuang"
                            className={style['iconxingzhuang']}
                            onClick={() => {
                                setVsible(true);
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className={`${style['resume-wrap']} braft-output-context`}
                    dangerouslySetInnerHTML={{ __html: html }}
                ></div>
            )}

            <Modal
                visible={visible}
                setVsible={setVsible}
                title="访问简历"
                width="30vw"
                onCancel={() => {
                    setPassword('');
                }}
                onOk={onOk}
            >
                <Input
                    className={style['input']}
                    value={password}
                    placeholder="请输入访问密码"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Resume;
