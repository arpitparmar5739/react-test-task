import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-test-task.firebaseio.com/'
});

export default instance;