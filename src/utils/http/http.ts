import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IHttp } from './interfaces/http.interface';

@Injectable()
export default class Http implements IHttp {
  private http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: process.env.AUTH_SERVICE_URL,
    });
  }

  async post(path: string, data: object) {
    return this.http.post(path, data);
  }

  async patch(path: string, data: object) {
    return this.http.patch(path, data);
  }
}
