import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:4433';

  constructor(private http: HttpClient) {}

  getLoginFlow(flowId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/self-service/login/flows?id=${flowId}`, { withCredentials: true });
  }

  submitLogin(flowId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/self-service/login?flow=${flowId}`, payload, { withCredentials: true });
  }
}
