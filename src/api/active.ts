import Axios from '../utils/axios';

const activeAxios = {
    // 访问量+1
    addLook: () =>
        Axios({
            method: 'get',
            url: '/active/frontend/addLook',
        }),
};

export default activeAxios;
