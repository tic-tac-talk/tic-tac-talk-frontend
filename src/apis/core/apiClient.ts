import axios from 'axios';
import JSONbig from 'json-bigint';
import setupInterceptors from '@/apis/core/setupInterceptors';

const JSONbigParser = JSONbig({
  storeAsString: true,
});

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  transformResponse: [
    (data) => {
      if (typeof data === 'string') {
        try {
          return JSONbigParser.parse(data);
        } catch {
          return data;
        }
      }
      return data;
    },
  ],
});

setupInterceptors(apiClient);

export default apiClient;
