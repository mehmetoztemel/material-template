import { Injectable } from "@angular/core";

@Injectable()
export class AppConfig {
    public Server = 'http://localhost:5604/';
    // public Server = 'http://192.168.5.128:8000/';
    public Api: string = 'api/';
    public ApiUrl = this.Server + this.Api;
}
