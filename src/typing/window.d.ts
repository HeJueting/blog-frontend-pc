export {};

// 定义window对象上的全局属性
declare global {
    interface Window {
        bubbly: any;
        $setLoading: (v: boolean) => void;
    }
}
