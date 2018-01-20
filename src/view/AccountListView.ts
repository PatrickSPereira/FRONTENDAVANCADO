import "./ContractListView.scss";
import { AccountList } from '../model/AccountList';
import { Account } from '../model/Account';
import { AccountListController } from '../controller/AccountListController';
import { AccountManager } from '../model/AccountManager';

function elementOf<T extends Element>(id: string) {
    return <T>document.querySelector(id);
}

export class AccountListView {
    private readonly key = "accounts";
    
    private readonly _contactList =
        elementOf<HTMLUListElement>("#contactList");

    private readonly _manager = new AccountManager();        

    private readonly _contactItemTemplate =
        elementOf<Element>("#contactItemTemplate");

    private readonly _nameInput =
        elementOf<HTMLInputElement>("#nameAccount");

    private readonly _phoneInput =
        elementOf<HTMLInputElement>("#initialValue");
    
    private readonly _addButton =
        elementOf<HTMLButtonElement>("#addButton");

    constructor(private readonly _controller: AccountListController) {
        if (document.getElementById('contactItemTemplate') == null){
            //console.log('Não encontrado contactItemTemplate');
        }else{                                    
            this._contactItemTemplate.remove();
            this._addButton.addEventListener("click", () => this.onAddButtonClick());
            this.showContacts(this._manager.accounts);
        }
    }

    showContacts(contacts: AccountList) {
        if (document.getElementById('contactList') == null){
            
        }else{            
            if (contacts.isEmpty) {            
                this.showNoItems();
                return;
            }else{
                this.clearItems();             
                const storedAccountsValue = localStorage.getItem(this.key);            
                if (!storedAccountsValue) {
                    return new AccountList();
                }
        
                const storedAccounts: AccountList = JSON.parse(storedAccountsValue);
                const list = new AccountList();
                
                for (const account of storedAccounts.accounts) {                    
                    const item = document.createElement("li");            
                    item.textContent = "Conta: " + account.NameAccount +
                                        " Saldo Inicial: " + account.initialValue;
                    this._contactList.appendChild(item);
                    var btn = document.createElement("BUTTON");      // Create a <button> element
                    var t = document.createTextNode("Apagar");       // Create a text node
                    btn.addEventListener('click', function() {alert("ok")});                              // Append the text to <button>
                    btn.appendChild(t);                              // Append the text to <button>
                    this._contactList.appendChild(btn);              // Append <button> to <body>
                }            
            }
        }                
    }

    showNoItems() {
        this.clearItems();

        const item = document.createElement("li");

        item.textContent = "Sem contas registradas";
        this._contactList.appendChild(item);
    }

    clearItems() { 
        while (this._contactList.children.length) {
            const child = this._contactList.children.item(0);
            this._contactList.removeChild(child);
        }       
    }

    private onAddButtonClick() {
        const name = this._nameInput.value;
        const initialValue = parseFloat(this._phoneInput.value);
 
        this._controller.addAccounts(name, initialValue);        
    }
}
