import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenResponse } from '../models/tokenresponse';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint : string ="";
  constructor(private http : HttpClient, private appConfig : AppConfig) { 
    this.endPoint = appConfig.ApiUrl + 'auth/'
  }
  auth(data : any) : Observable<ITokenResponse>{
    return this.http.post<ITokenResponse>(this.endPoint, data);
  }
}
