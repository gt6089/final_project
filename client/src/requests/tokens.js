import { BASE_URL } from './config';
import axios from 'axios';

export const Token = {
  create (params) {
    axios.post(`${BASE_URL}/tokens`, params).then(res => {
      console.log(res);
    })
  }
}