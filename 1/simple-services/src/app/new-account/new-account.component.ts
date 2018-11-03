import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: []

})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService,
              private accountsServicer: AccountsService) {

    this.accountsServicer.statusUpdated.subscribe(
      (status: string) => alert("New Status: " + status)
    );

  }
  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });

    this.accountsServicer.addAccount(name, status)
    // this.loggingService.logStatusChange(accountStatus)
    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
