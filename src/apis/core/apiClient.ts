import axios from 'axios';
import setupInterceptors from '@/apis/core/setupInterceptors';

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
          const processedData = data.replace(/:(\d{16,})([,\]}])/g, ':"$1"$2');
          return JSON.parse(processedData);
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
