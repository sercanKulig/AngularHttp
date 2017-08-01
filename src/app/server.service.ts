import { Injectable } from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://angular-http-b118b.firebaseio.com/data.json', servers, {headers: headers});
    return this.http.put('https://angular-http-b118b.firebaseio.com/data.json', servers, {headers: headers})
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong with storeServers');
        }
      );
  }

  getServers() {
    return this.http.get('https://angular-http-b118b.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'Fetched_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong with getServers');
        }
      );
  }

  getAppName() {
    return this.http.get('https://angular-http-b118b.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong with getServers');
        }
      );
  }
}
