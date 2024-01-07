import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'b45478dd6f0f46658f5512ab4807247b'
    }
})