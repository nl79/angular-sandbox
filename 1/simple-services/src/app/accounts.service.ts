import { LoggingService } from "./logging.service";
import { Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) {

  }

  addAccount(name: string, status: string) {
    this.accounts.push({
      name: name,
      status: status
    });
    this.loggingService.logStatusChange(status);


  }

  statusUpdated = new EventEmitter<string>();

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);

  }
}
