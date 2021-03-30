import React, { useEffect, useState } from 'react';
import style from './style.module.scss';

const Anchor: React.FC = () => {
    // 导航
    const [navList, setNavList] = useState([]);
    const [top, setTop] = useState<number>(28);

    // 监听滚轮滚动，控制导航的位置
    useEffect(() => {
        const scrollDom = document.getElementById('scroll-content');
        const litsen = () => {
            if (scrollDom.scrollTop > (scrollDom.clientWidth / 100) * 28) {
                setTop(2);
            } else {
                setTop(28);
            }
        };
        scrollDom.addEventListener('scroll', litsen);
        return () => {
            scrollDom.removeEventListener('scroll', litsen);
        };
    }, []);

    // 初始化快速导航的内容
    useEffect(() => {
        process.nextTick(() => {
            // 获取整个文章内容的dom元素
            const articleContent = document.getElementById('article-content');

            // 找出所有具有id属性的元素，并过滤出 h 元素
            const idDoms = [];
            let diffLevel = 6;
            const tagNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
            articleContent
                .querySelectorAll('[id]')
                .forEach((node: HTMLElement) => {
                    if (tagNames.indexOf(node.tagName) !== -1) {
                        idDoms.push(node);
                        if (Number(node.tagName[1]) < diffLevel) {
                            diffLevel = Number(node.tagName[1]);
                        }
                    }
                });

            // 根据idDoms和level得到navList
            const newNavList = [];
            idDoms.forEach((node: HTMLElement) => {
                newNavList.push({
                    level: Number(node.tagName[1]) - diffLevel,
                    title: node.innerText,
                    id: node.id,
                });
            });
            setNavList(newNavList);
        });
    }, []);

    return (
        <div className={style['anchor-box']} style={{ top: `${top}vw` }}>
            {navList.map((item: any) => (
                <a
                    title={item.title}
                    className={style[`level-${item.level}`]}
                    key={item.id}
                    href={`#${item.id}`}
                >
                    ● {item.title}
                </a>
            ))}
        </div>
    );
};

export default Anchor;
