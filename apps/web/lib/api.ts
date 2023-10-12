import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class API {
  private _devUrl: string = "";
  private _prodUrl: string = "";
  private token: string = "";
  private tokenExpiresIn: number = 0;
  private axiosInstance: AxiosInstance = axios.create({baseURL: this._prodUrl === "" ? this._devUrl : this._prodUrl});

  private headers: AxiosRequestConfig<any> | undefined  = {
    headers: {
      "Authorization": `Bearer ${this.token}`
    }
  }

  public async getToken(body: any) {
    try {
      const res = await this.axiosInstance.post('/user/login', body, {
        headers: {
          
        }
      })
      if (res.status !== 201) throw Error("chuj ci na dziure");
      this.token = res?.data?.accessToken;
      return this.tokenExpiresIn = res?.data?.expiresIn

    } catch (e) {
      console.error(e.message);
    }
  }

  public async GET(url: string) {
    return await this.axiosInstance.get(url, this.headers)
  }
  public async POST(url: string, body: any) {
    return await this.axiosInstance.post(url, body, this.headers)
  }
  public async PUT(url: string, body: any) {
    return await this.axiosInstance.put(url, body, this.headers)
  }
  public async DELETE(url: string) {
    return await this.axiosInstance.delete(url, this.headers)
  }
}

export default API;