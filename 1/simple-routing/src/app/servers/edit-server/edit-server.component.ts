import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('snapshot', this.route.snapshot.queryParams)
    console.log('fragment', this.route.snapshot.fragment)
    this.route.queryParamMap.subscribe( (queryParams: Params) => {
      this.allowEdit = queryParams.params['allowEdit'] == 1 ? true : false;
    } )
    this.route.fragment.subscribe()
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
