// 接口：state
interface IState {
    theme: string;
    loading: boolean;
    settingInfo: any;
    userInfo: any;
}
// 接口：action
interface IAction {
    type: string;
    params?: any;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        // 主题
        case "SET_THEME":
            state.theme = action.params.theme;
            return Object.assign({}, state);
        // 全局loading
        case "SET_LOADING":
            state.loading = action.params.loading;
            return Object.assign({}, state);
        // 配置信息
        case "SET_SETTINGINFO":
            state.settingInfo = action.params.settingInfo;
            return Object.assign({}, state);
        // 用户信息
        case "SET_USERINFO":
            state.userInfo = action.params.userInfo;
            return Object.assign({}, state);
        default:
            throw new Error();
    }
};

export default reducer;
