import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
@Injectable()
export class ServerService {
  url = 'https://ng-http-example-cfc53.firebaseio.com/';
  constructor(private http: Http) {

  }
  storeServers(servers: any[]) {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    //return this.http.post(this.url + 'data.json', servers);
    return this.http.put(this.url + 'data.json', servers);

  }

  getServers() {
    return this.http.get(this.url  + 'data.json').map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'Fetched_' + server.name;
        }
        return data;
      }
    ).catch((error: Response) => {
      console.log('error', error);
      return Observable.throw(error);
    })
  }
  getAppName() {
    return this.http.get('https://ng-http-example-cfc53.firebaseio.com/appName.json').map(
      (response: Response) => {
        return response.json();
      }
    )
  }
}
