import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import style from './style.module.scss';
import commentAxios from '../../api/comment';
import { timeFormat } from '../../utils/help';
import lodash from '../../utils/lodash';
import Prism from 'prismjs';
import context from '../../store/context';
import CONFIG from '../../config';

import Icon from '../icon';
import Input from '../input';
import Button from '../button';
import message from '../message';
// 异步引入editor
const Editor = dynamic(() => import('../editor'), { ssr: false });

// 接口：props
interface ICommentProps {
    dataSource: any[];
    setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
    category: number;
    categoryId: string;
    title?: string;
}

const Comment: React.FC<ICommentProps> = ({
    dataSource = [],
    setDataSource = () => {},
    category = 0,
    categoryId = '',
    title = '全部留言',
}) => {
    const { state } = useContext(context);
    const { settingInfo } = state;
    // 编辑器
    const [editor, setEditor] = useState<any>({});
    // 评论内容
    const [html, setHtml] = useState<string>('');
    // 评论人姓名、邮箱
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    // 评论回复
    const [quoteObj, setQuoteObj] = useState<any>(null);
    // 评论头像
    const [headerImgObj, setHeaderImgObj] = useState<any>({});

    // 设置评论信息高亮
    useEffect(() => {
        Prism.highlightAll();
    }, [dataSource]);

    // 设置评论头像
    useEffect(() => {
        const obj = {};
        if (settingInfo && settingInfo.commentHeaderImg) {
            settingInfo.commentHeaderImg.forEach((item: any) => {
                obj[item.name] = item.img;
            });
            setHeaderImgObj(obj);
        }
    }, [settingInfo]);

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
            // 创建评论
            const res = await commentAxios.create({
                category,
                categoryId,
                html,
                name,
                email,
                quote: lodash.get(quoteObj, '_id', ''),
            });
            if (res.code === 0) {
                initDatasource();
                setHtml('');
                setName('');
                setEmail('');
                setQuoteObj(null);
                editor.initEditorState('');
                message.success('评论提交成功 ！');
            }
        }
    };
    // 初始化评论内容
    const initDatasource = async () => {
        // 查询文章评论信息
        const commentRes = await commentAxios.search({
            category,
            categoryId,
        });
        setDataSource(commentRes.data);
    };
    // 点击回复
    const clickReply = (item: any) => {
        document.getElementById('scroll-content').scrollTo({
            top: 10000,
            behavior: 'smooth',
        });
        setQuoteObj(item);
    };
    // 获取评论回复的信息
    const getQuoteInfo = (quote: string) => {
        const comment = dataSource.filter((item: any) => item._id === quote);
        return comment[0];
    };

    return (
        <div className={style['comment-box']}>
            {/* 标题 */}
            <div className={style['comment-title']}>
                <span>{title}</span>
                <span>（{dataSource.length}）</span>
            </div>
            {/* 评论内容 */}
            {dataSource.length ? (
                <div className={style['comment-content']}>
                    {dataSource.map((item: any) => (
                        <div className={style['item-wrap']} key={item._id}>
                            {/* 评论头像 */}
                            <div className={style['img-wrap']}>
                                {headerImgObj[item.name] ? (
                                    <img
                                        alt="评论人头像"
                                        src={`${
                                            CONFIG.IMAGE_REQUEST_PATH
                                        }/setting/${headerImgObj[item.name]}`}
                                    />
                                ) : (
                                    <Icon
                                        type="iconuser"
                                        className={style['icon']}
                                    />
                                )}
                            </div>

                            {/* 评论信息 */}
                            <div className={style['item-info']}>
                                {/* 顶部信息 */}
                                <header className={style['info-header']}>
                                    <h6 className={style['name']}>
                                        {item.name}
                                    </h6>
                                    <p>
                                        <span className={style['time']}>
                                            {timeFormat(item.createAt, 1)}
                                        </span>
                                        <span
                                            className={style['reply']}
                                            onClick={() => {
                                                clickReply(item);
                                            }}
                                        >
                                            回复
                                        </span>
                                    </p>
                                </header>
                                {/* 评论回复 */}
                                {item.quote && (
                                    <div className={style['reply-content']}>
                                        <header className={style['header']}>
                                            回复{' '}
                                            <span>
                                                {getQuoteInfo(item.quote).name}
                                            </span>{' '}
                                            的评论：
                                        </header>
                                        <div
                                            className={'braft-output-context'}
                                            dangerouslySetInnerHTML={{
                                                __html: getQuoteInfo(
                                                    item.quote
                                                ).html.replace(
                                                    /<br\s*\/?>/g,
                                                    '\n'
                                                ),
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {/* 评论内容 */}
                                <div
                                    className={'braft-output-context'}
                                    dangerouslySetInnerHTML={{
                                        __html: item.html.replace(
                                            /<br\s*\/?>/g,
                                            '\n'
                                        ),
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={style['empty-box']}>
                    <Icon type="iconempty" className={style['icon']} />
                    <span>暂无评论，快来抢沙发吧 ~</span>
                </div>
            )}

            {/* 编辑器 */}
            <div className={style['editor-box']}>
                {/* 回复某人 */}
                {quoteObj && (
                    <div className={style['reply-box']}>
                        <span>回复 @{quoteObj.name}</span>
                        <Icon
                            type="iconquxiao"
                            className={style['icon']}
                            onClick={() => {
                                setQuoteObj(null);
                            }}
                        />
                    </div>
                )}
                <Editor html={html} setHtml={setHtml} setEditor={setEditor} />
            </div>

            {/* 操作 */}
            <div className={style['comment-operate']}>
                <Input
                    placeholder="请输入您的名称"
                    className={style['input']}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value.substring(0, 20));
                    }}
                />
                <Input
                    placeholder="请输入您的邮箱"
                    className={style['input']}
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value.substring(0, 50));
                    }}
                />
                <Button onClick={submit}>提交</Button>
            </div>
        </div>
    );
};

export default Comment;
