import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class ApiClient {
  private static instance: ApiClient;
  private readonly api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3005",
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  public get<T = any>( {url, config, token} :{url: string, config?: AxiosRequestConfig, token?: string}): Promise<AxiosResponse<T>> {
    return this.api.get(url, {
        headers: {
            Authorization: `Bearer ${token && token}`,
        },
        // onDownloadProgress: (progressEvent) => {
        //     const total = parseFloat((progressEvent.progress || "0").toString());
        //     console.log(`${total}% downloaded from ${url}`)
        // },
        responseType: 'json',
        ...config
    });
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig, token?: string): Promise<AxiosResponse<T>> {
    return this.api.delete(url, {
        headers: {
            Authorization: `Bearer ${token && token}`,
        },
        onDownloadProgress: (progressEvent) => {
            const total = parseFloat((progressEvent.progress || "0").toString());
            console.log(`${total}% downloaded from ${url}`)
        },
        responseType: 'json',
        ...config
    });
  }

  public post<T = any>({url, data, config, token} :{url: string, data: any, config?: AxiosRequestConfig, token?: string}): Promise<AxiosResponse<T>> {
    return this.api.post(url, data, {
        headers: {
            Authorization: `Bearer ${token && token}`,
        },
        // onDownloadProgress: (progressEvent) => {
        //     const total = parseFloat((progressEvent.progress || "0").toString());
        //     console.log(`${total}% downloaded from ${url}`)
        // },
        responseType: 'json',
        ...config,
    });
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig, token?: string): Promise<AxiosResponse<T>> {
    return this.api.put(url, data, {
        headers: {
            Authorization: `Bearer ${token && token}`,
        },
        onDownloadProgress: (progressEvent) => {
            const total = parseFloat((progressEvent.progress || "0").toString());
            console.log(`${total}% downloaded from ${url}`)
        },
        responseType: 'json',
        ...config
    });
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig, token?: string): Promise<AxiosResponse<T>> {
    return this.api.patch(url, data, {
        headers: {
            Authorization: `Bearer ${token && token}`,
        },
        onDownloadProgress: (progressEvent) => {
            const total = parseFloat((progressEvent.progress || "0").toString());
            console.log(`${total}% downloaded from ${url}`)
        },
        responseType: 'json',
        ...config,
    });
  }
}