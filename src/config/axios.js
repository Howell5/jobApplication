import axios from 'axios';
import { apiBaseURL } from './default';

axios.defaults.baseURL = apiBaseURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
