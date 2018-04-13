import axios from 'axios';
import { apiBaseURL } from './default';

axios.defaults.baseURL = apiBaseURL;

export default axios;
