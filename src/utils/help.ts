// 获取url参数
export function getUrlQuery(url: string) {
    const query = {};
    const queryStr = url.split('?')[1];
    if (queryStr) {
        const queryArr = queryStr.split('&');
        queryArr.forEach((item: string) => {
            const itemArr = item.split('=');
            query[itemArr[0]] = itemArr[1];
        });
    }
    return query;
}

// 时间格式转换: 0(YYYY-MM-DD)、1(YYYY-MM-DD mm:ss)
export function timeFormat(stamp: number | string, format: number) {
    const date = new Date(stamp);
    const year = date.getFullYear();

    const monthNum = date.getMonth() + 1;
    const month = monthNum < 10 ? `0${monthNum}` : monthNum;

    const dayNum = date.getDate();
    const day = dayNum < 10 ? `0${dayNum}` : dayNum;

    const hourNum = date.getHours();
    const hour = hourNum < 10 ? `0${hourNum}` : hourNum;

    const minuteNum = date.getMinutes();
    const minute = minuteNum < 10 ? `0${minuteNum}` : minuteNum;

    if (format === 1) {
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    return `${year}-${month}-${day}`;
}

// 更新主题
export function updateTheme(className: string, dispatch: React.Dispatch<any>) {
    // 更新主题
    dispatch({
        type: 'SET_THEME',
        params: {
            theme: className,
        },
    });
    // 更新body的class
    const bodyDom = document.body;
    bodyDom.setAttribute('class', `theme-${className}`);
}

// 设置bubbly
export function setBubbly(
    bubbleColor: string,
    bgStartColor: string,
    bgStopColor: string
) {
    // 配置config
    const config = {
        radiusFunc: () => 2 + Math.random() * 4,
        bubbleFunc: () => bubbleColor,
        bubbles: 100,
        blur: 1,
        colorStart: bgStartColor,
        colorStop: bgStopColor,
        canvas: null,
    };

    // 判断是否存在bubbly这个canvas元素
    let bubblyCanvas = document.getElementById('bubbly-canvas');
    const { clientWidth, clientHeight } = document.body;
    if (!bubblyCanvas) {
        bubblyCanvas = document.createElement('canvas');
        bubblyCanvas.setAttribute('id', 'bubbly-canvas');
        bubblyCanvas.setAttribute('width', String(clientWidth));
        bubblyCanvas.setAttribute('height', String(clientHeight));
        bubblyCanvas.setAttribute(
            'style',
            `position: fixed; z-index: -1; left: 0; top: 0; min-width: 100vw; min-height: 100vh;`
        );
        document.body.appendChild(bubblyCanvas);
    }

    // 添加这个canvas
    config.canvas = bubblyCanvas;

    // 生成背景
    window.bubbly(config);
}
// 清除背景
export function clearBubbly() {
    const bubblyCanvas = document.getElementById('bubbly-canvas');
    document.body.removeChild(bubblyCanvas);
}

// 根据页面宽度计算获取图片适当的大小
export function getImageWidthByClientWidth(width: number) {
    let newWidth = width;
    try {
        const { clientWidth } = document.body;
        newWidth = Math.round((clientWidth * width) / 1920);
    } catch (e) {}
    return newWidth;
}
