import { LaunchManager } from '../model/LaunchManager';
import { LaunchListView } from "../view/LaunchListView";
import { AccountManager } from '../model/AccountManager';


export class LaunchListController {
    private readonly _view = new LaunchListView(this);
    private readonly _manager = new LaunchManager();
    private readonly _managerAccount = new AccountManager();

    initialize() {        
        this._view.showAccounts(this._managerAccount.accounts);
        this._view.showReport(this._manager.launchs);
    }

    addAccounts(description: string, value: number, typeLaunch: string, dateLaunch: Date, account: string) {
        this._manager.addLaunchs(description, value, typeLaunch, dateLaunch, account);
        this._view.showContacts(this._manager.launchs);
    }

    reportLaunch(){
        this._view.showReport(this._manager.launchs);
    }
}
