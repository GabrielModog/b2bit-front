import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.homologation.cliqdrive.com.br',
      headers: {
        'Accept': 'application/json;version=v1_web',
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        const requestUrl: string | undefined = error.config?.url;
        const method: string | undefined = error.config?.method;

        const isAuthLoginRequest =
          typeof requestUrl === 'string' && requestUrl.includes('/auth/login/') && method === 'post';

        if ((status === 401 || status === 403) && !isAuthLoginRequest) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data);
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url);
  }

  async put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url);
  }
}
