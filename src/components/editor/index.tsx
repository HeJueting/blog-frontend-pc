import React, { useState, useEffect } from "react";
// editor编辑器扩展
import BraftEditor from "braft-editor";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
// prismjs代码包
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-json.js";

// 编辑器代码高亮
BraftEditor.use(
	CodeHighlighter({
		syntaxs: [
			{
				name: "JavaScript",
				syntax: "javascript",
			},
			{
				name: "React/Vue",
				syntax: "jsx",
			},
			{
				name: "HTML",
				syntax: "html",
			},
			{
				name: "CSS",
				syntax: "css",
			},
			{
				name: "JSON",
				syntax: "json",
			},
		],
	})
);

// 接口：props
interface IEditorProps {
	html: string;
	setHtml: (html: string) => void;
	controls?: any[];
	setEditor?: React.Dispatch<React.SetStateAction<any>>;
}

const Editor = ({
	setEditor = () => {},
	html,
	setHtml,
	controls,
}: IEditorProps) => {
	const [editorState, setEditorState] = useState(
		BraftEditor.createEditorState(html)
	);

	// 初始化editor，将initEditorState、getTextContent方法暴露出去
	useEffect(() => {
		setEditor({
			initEditorState: (html: string) => {
				setEditorState(BraftEditor.createEditorState(html));
			},
			getTextContent: (length: number) => {
				return editorState.toText().slice(0, length).replace(/\r|\n/g, "");
			},
		});
	}, []);

	// 编辑器内容发生改变
	const handleChange = (editorState: any) => {
		setEditorState(editorState);
		setHtml(editorState.toHTML());
	};

	// px转rem
	const getHtmlFontSize = () => {
		const sizeBase = document.documentElement.style.fontSize.replace(
			/[a-z]/g,
			""
		);
		return Number(sizeBase);
	};
	const unitImportFn = (unit: string) => {
		const sizeBase = getHtmlFontSize();
		// 此函数的返回结果，需要过滤掉单位，只返回数值
		if (unit.indexOf("rem")) {
			return parseFloat(unit) * sizeBase;
		}
		return parseFloat(unit);
	};
	const unitExportFn = (unit: number, type: string, target: string) => {
		const sizeBase = getHtmlFontSize();
		// 输出行高时不添加单位
		if (type === "line-height") {
			return unit;
		}
		// target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
		if (target === "html") {
			// 只在将内容输出为html时才进行转换
			return `${unit / sizeBase}rem`;
		}
		// 在编辑器中显示时，按px单位展示
		return `${unit}px`;
	};

	// 默认控件
	const defaultControls = [
		"emoji",
		"font-size",
		"text-color",
		"bold",
		"italic",
		"link",
		"hr",
		"separator",

		"underline",
		"strike-through",
		"superscript",
		"subscript",
		"separator",

		"text-align",
		"separator",

		"blockquote",
		"code",
		"clear",
	];
	// 默认颜色配置
	const editorColors = [
		"#fff",
		"#f5f5f5",
		"#d9d9d9",
		"#bfbfbf",
		"#8c8c8c",
		"#595959",
		"#262626",
		"#141414",
		"#000",
		"#E8684A",
		"#5B8FF9",
		"#F6BD16",
		"#5AD8A6",
		"#9270CA",
		"#FF99C3",
		"#6DC8EC",
		"#FF9D4D",
		"#269A99",
		"#5D7092",
	];

	return (
		<BraftEditor
			colors={editorColors}
			controls={controls || defaultControls}
			value={editorState}
			converts={{
				unitImportFn,
				unitExportFn,
			}}
			onChange={handleChange}
			contentStyle={{ height: "10vw" }}
		/>
	);
};

export default React.forwardRef(Editor);
