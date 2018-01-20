import { AccountList } from './AccountList';
import { Account } from './Account';

export class AccountListStore {
    private readonly key = "accounts";

    store(accounts: AccountList) {
        localStorage.setItem(this.key, JSON.stringify(accounts));
    }

    restore() {        
        const storedAccountsValue = localStorage.getItem(this.key);
        
        if (!storedAccountsValue) {
            return new AccountList();
        }

        const storedAccounts: AccountList = JSON.parse(storedAccountsValue);
        const list = new AccountList();
        
        for (const account of storedAccounts.accounts) {
            list.add(new Account(account.NameAccount, account.initialValue));
        }

        return list;
    }
}