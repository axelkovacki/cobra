import Axios from 'axios';

const get = async (url) => {
    const { data } = await Axios.get(url);

    return data;
};

export default {
    get
}
