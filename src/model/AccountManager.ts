import { AccountListStore } from './AccountListStore';
import { Account } from './Account';

export class AccountManager {
    private _store = new AccountListStore();
    private _accounts = this._store.restore();

    get accounts() {
        return this._accounts;
    }

    addAccounts(nameAccount: string, initialValue: number) {
        if (nameAccount.length === 0) {
            console.log("Sem nome a Conta");
        };
        
        const account = new Account(nameAccount, initialValue);        
        this._accounts.add(account);        
        this._store.store(this._accounts);        
        console.log("Conta Adicionada", account);
    }
}