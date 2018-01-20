import { AccountManager } from '../model/AccountManager';
import { AccountListView } from "../view/AccountListView";


export class AccountListController {
    private readonly _view = new AccountListView(this);
    private readonly _manager = new AccountManager();

    initialize() {            
        this._view.showContacts(this._manager.accounts);
    }

    addAccounts(nameAccount: string, initialValue: number) {                
        if (isNaN(initialValue)){
            initialValue = 0;
        }
        console.log(initialValue);
    
        this._manager.addAccounts(nameAccount, initialValue);        
        this._view.showContacts(this._manager.accounts);
    }
}
