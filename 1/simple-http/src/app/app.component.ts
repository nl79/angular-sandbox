import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Response, Http } from "@angular/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverService.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serverService: ServerService,
    private http: Http) {

  }
  onGet() {
    this.serverService.getServers().subscribe(
      (data) => {
        console.log('data', data);
        this.servers = data;
      },
      (error) => {
        console.log('error', error);
      }
    )
  }
  onSave() {
    this.serverService.storeServers(this.servers).subscribe(
      (data) => {
        console.log('data', data)
      },
      (error) => {
        console.log('error', error);
      },
      () => {

      }
    )
  }
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
