import React, { useEffect } from "react";

const ErroCapture: React.FC = () => {
    // 捕获网页错误的方法
    const windowCapture = (e: ErrorEvent) => {
        console.log("错误信息：", e.error.stack);
    };

    // 捕获promise错误
    const promiseCapture = (e: PromiseRejectionEvent) => {
        console.log("错误信息：", e.reason.stack);
    };

    useEffect(() => {
        window.addEventListener("error", windowCapture);
        window.addEventListener("unhandledrejection", promiseCapture);
        return () => {
            window.removeEventListener("error", windowCapture);
            window.removeEventListener("unhandledrejection", promiseCapture);
        };
    }, []);

    return null;
};

export default ErroCapture;
