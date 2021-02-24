// 16进制色值转为rgba
export const hexToRgba = (hex: string, alpha: number = 1) => {
	// 统一去掉 # 符号
	hex = hex.slice(1, hex.length);
	// 处理长度为3或者4位的不规范的hex颜色
	if (hex.length === 3 || hex.length === 4) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	// 匹配6位在0-9或a-f(A-F)范围内的字符串
	let reg = /[0-9a-fA-F]{6}/;
	if (!reg.test(hex)) {
		throw "hex颜色格式有误";
	}

	const r = parseInt("0x" + (hex[0] + hex[1]));
	const g = parseInt("0x" + (hex[2] + hex[3]));
	const b = parseInt("0x" + (hex[4] + hex[5]));

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// 获取url参数
export const getUrlQuery = (url: string) => {
	const query = {};
	const queryStr = url.split("?")[1];
	if (queryStr) {
		const queryArr = queryStr.split("&");
		queryArr.forEach((item: string) => {
			const itemArr = item.split("=");
			query[itemArr[0]] = itemArr[1];
		});
	}
	return query;
};

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