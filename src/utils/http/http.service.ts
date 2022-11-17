import axios, { AxiosInstance } from 'axios';
import { IHttpService } from './http.interface';

export default class HttpService implements IHttpService {
  private http: AxiosInstance;
  constructor(uri: string) {
    this.http = axios.create({
      baseURL: uri,
    });
  }

  async post(path: string, data: object) {
    const res = await this.http.post(path, data);
    return res;
  }

  async patch(path: string, data: object) {
    const res = await this.http.patch(path, data);
    return res;
  }
}
