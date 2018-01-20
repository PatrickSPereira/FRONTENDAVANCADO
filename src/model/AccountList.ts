import { Account } from './Account';

export class AccountList {
    public accounts = Array<Account>();

    get isEmpty() {
        return this.accounts.length == 0;
    }

    add(account: Account) {
        this.accounts.push(account);
    }

    remove(account: Account) {
        const index = this.accounts.indexOf(account);
        
        if (index >= 0) {
            this.accounts.splice(index, 1);
        }
    }
}
