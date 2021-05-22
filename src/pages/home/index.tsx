import React, { useState, useContext } from 'react';
import Link from 'next/link';
import lodash from '../../utils/lodash';
import style from './style.module.scss';
import context from '../../store/context';
import CONFIG from '../../config';
import commentAxios from '../../api/comment';
import { getImageWidthByClientWidth } from '../../utils/help';

import Icon from '../../components/icon';
import Footer from '../../components/footer';
import Textarea from '../../components/textarea';
import Input from '../../components/input';
import Button from '../../components/button';
import message from '../../components/message';

// 接口：props
interface IHomeProps {
    hotArticles: any;
}

const Home: React.FC<IHomeProps> = ({ hotArticles = [] }) => {
    // 路由信息
    const routerInfo = [
        {
            title: '文章',
            icon: 'iconbook',
            path: '/article',
        },
        {
            title: '相册',
            icon: 'iconzhaopian',
            path: '/album',
        },
        {
            title: '生活',
            icon: 'iconlifeon',
            path: '/life',
        },
        {
            title: '留言',
            icon: 'iconmingshijiyu',
            path: '/comment',
        },
        {
            title: '简历',
            icon: 'iconpersonal-info',
            path: '/resume',
        },
    ];
    // store
    const { state } = useContext(context);
    const { settingInfo, userInfo } = state;
    // 建议箱
    const [name, setName] = useState<string>('');
    const [html, setHtml] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    // 建议内容发送改变
    const htmlOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHtml(e.target.value);
    };
    // 名称发生改变
    const nameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value.substring(0, 20));
    };
    // email发送改变
    const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.substring(0, 50));
    };
    // 点击提交
    const submit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const emailReg =
            /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,8})$/;
        if (!html) {
            message.error('请输入您的建议 ！');
        } else if (!name) {
            message.error('请输入的大名 ！');
        } else if (!emailReg.test(email)) {
            message.error('请输入正确的email ！');
        } else {
            const res = await commentAxios.create({
                category: 3,
                html,
                name,
                email,
            });
            if (res.code === 0) {
                setName('');
                setHtml('');
                setEmail('');
                message.success('提交成功 ！');
            }
        }
    };
    // 处理背景图片
    const dealBacImg = (url: string) => {
        if (url) {
            return `${CONFIG.IMAGE_REQUEST_PATH}/setting/${url}`;
        }
        return '';
    };

    return (
        <>
            {/* 第一屏 */}
            <section
                className={`${style['home-section']} ${style['imgScroll']} ${style['section-one']}`}
                style={{
                    backgroundImage:
                        settingInfo.firstBacImage &&
                        `url(${dealBacImg(settingInfo.firstBacImage)})`,
                }}
            >
                <div className={style['section-one-content']}>
                    <div className={style['section-one-headImg']}>
                        {userInfo.headImg && (
                            <img
                                alt="个人头像"
                                src={`${CONFIG.IMAGE_REQUEST_PATH}/user/${
                                    userInfo.headImg
                                }?width=${getImageWidthByClientWidth(180)}`}
                            ></img>
                        )}
                    </div>
                    <p className={style['section-one-name']}>
                        {userInfo.nickName}
                    </p>
                    <p className={style['section-one-job']}>{userInfo?.job}</p>
                    <p className={style['section-one-motto']}>
                        {userInfo.motto}
                    </p>
                </div>
            </section>

            {/* 第二屏 */}
            <section
                className={`${style['home-section']} ${style['section-two']}`}
            >
                <div className={style['section-two-left']}>
                    {settingInfo.aboutMeBacImage && (
                        <img
                            alt="关于我的配图"
                            src={`${CONFIG.IMAGE_REQUEST_PATH}/setting/${
                                settingInfo.aboutMeBacImage
                            }?width=${getImageWidthByClientWidth(680)}`}
                        />
                    )}
                </div>
                <div className={style['section-two-right']}>
                    <div className={style['section-two-right-title']}>
                        <h2>个</h2>
                        <h2>人</h2>
                        <h2>简</h2>
                        <h2>介</h2>
                    </div>
                    <div className={style['section-two-right-context']}>
                        <p className={style['context-introduction']}>
                            {userInfo.introduction}
                        </p>
                        <div className={style['context-info']}>
                            <Icon
                                type="iconlocation"
                                className={style['context-info-icon']}
                            />
                            <span style={{ marginRight: '0.8vw' }}>
                                Location：
                            </span>
                            <span>{userInfo.city}</span>
                        </div>
                        <div className={style['context-info']}>
                            <Icon
                                type="icongongsi"
                                className={style['context-info-icon']}
                            />
                            <span style={{ marginRight: '0.8vw' }}>
                                Company：
                            </span>
                            <span>{userInfo.company}</span>
                        </div>
                        <div className={style['context-info']}>
                            <Icon
                                type="iconlove"
                                className={style['context-info-icon']}
                            />
                            <span style={{ marginRight: '0.8vw' }}>
                                Hobbys：
                            </span>
                            <p>
                                {lodash
                                    .get(userInfo, 'hobby', [])
                                    .map((item: string, index: number) => (
                                        <span key={item}>{`${item}${
                                            index + 1 !==
                                            lodash.get(userInfo, 'hobby.length')
                                                ? '、'
                                                : ''
                                        }`}</span>
                                    ))}
                            </p>
                        </div>
                        <div className={style['context-info']}>
                            <Icon
                                type="iconshengqian"
                                className={style['context-info-icon']}
                            />
                            <span style={{ marginRight: '0.8vw' }}>
                                Labels：
                            </span>
                            <p>
                                {lodash
                                    .get(userInfo, 'label', [])
                                    .map((item: string, index: number) => (
                                        <span key={item}>{`${item}${
                                            index + 1 !==
                                            lodash.get(userInfo, 'label.length')
                                                ? '、'
                                                : ''
                                        }`}</span>
                                    ))}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 第三屏 */}
            <section
                className={`${style['home-section']} ${style['imgScroll']} ${style['section-three']}`}
                style={{
                    backgroundImage: `url(${dealBacImg(
                        settingInfo.secondBacImage
                    )})`,
                }}
            >
                <div className={style['section-three-content']}>
                    {routerInfo.map((item) => (
                        <Link href={item.path} key={item.title}>
                            <div className={style['three-wrap']}>
                                <div className={style['three-wrap-mask']} />
                                <div className={style['three-icon-wrap']}>
                                    <Icon
                                        type={item.icon}
                                        className={style['three-iconfont']}
                                    />
                                </div>
                                <h5 className={style['three-title']}>
                                    {item.title}
                                </h5>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 第四屏 */}
            <section
                className={`${style['home-section']} ${style['section-four']}`}
            >
                <div className={style['section-four-content']}>
                    {/* 标题 */}
                    <div className={style['section-four-title']}>
                        <h2>热</h2>
                        <h2>门</h2>
                        <h2>导</h2>
                        <h2>读</h2>
                    </div>
                    {/* 文章 */}
                    <div className={style['four-article-wrap']}>
                        {hotArticles.map((item) => (
                            <Link
                                href={`/article/${item._id}`}
                                key={item.title}
                            >
                                <div className={style['four-article-item']}>
                                    {item.bacImg ? (
                                        <img
                                            alt="文章配图"
                                            src={`${
                                                CONFIG.IMAGE_REQUEST_PATH
                                            }/article/${
                                                item.bacImg
                                            }?width=${getImageWidthByClientWidth(
                                                340
                                            )}`}
                                        />
                                    ) : (
                                        <div
                                            className={style['four-icon-wrap']}
                                        >
                                            <Icon
                                                type="iconbook"
                                                className={
                                                    style['four-iconbook']
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 第五屏 */}
            <section
                className={`${style['home-section']} ${style['imgScroll']} ${style['section-five']}`}
                style={{
                    backgroundImage: `url(${dealBacImg(
                        settingInfo.thirdBacImage
                    )})`,
                }}
            >
                <div className={style['section-five-content']}>
                    <div className={style['suggestion-wrap']}>
                        <h3 className={style['five-context-title']}>
                            Suggestion
                        </h3>
                        <Textarea
                            placeholder="请输入您的意见"
                            className={style['suggestion-textarea-wrap']}
                            value={html}
                            onChange={htmlOnChange}
                        />
                        <div className={style['suggestion-input-wrap']}>
                            <Input
                                placeholder="请输入您的昵称"
                                className={style['suggestion-input']}
                                value={name}
                                onChange={nameOnChange}
                            />
                            <Input
                                placeholder="请输入您的邮箱"
                                className={style['suggestion-input']}
                                value={email}
                                onChange={emailOnChange}
                            />
                            <Button onClick={submit}>提交</Button>
                        </div>
                    </div>
                    <div className={style['contact-wrap']}>
                        <h3 className={style['five-context-title']}>Contact</h3>
                        <div className={style['contact-item-wrap']}>
                            <Icon
                                type="iconemail"
                                className={style['contact-iconfont']}
                            />
                            <span>{userInfo.email}</span>
                        </div>
                        <div className={style['contact-item-wrap']}>
                            <Icon
                                type="icongithub"
                                className={style['contact-iconfont']}
                                style={{ fontSize: '2.8rem' }}
                            />
                            <span>{userInfo.github}</span>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default Home;
