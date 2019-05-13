import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ServerService {
  url = 'https://ng-http-example-cfc53.firebaseio.com/';
  constructor(private http: Http) {

  }
  storeServers(servers: any[]) {
    return this.http.post(this.url + 'data.json', servers);
  }
}
