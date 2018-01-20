import "./ContractListView.scss";
import { LaunchList } from '../model/LaunchList';
import { Launch } from '../model/Launch';
import { LaunchListController } from '../controller/LaunchListController';
import { AccountList } from '../model/AccountList';
import { Account } from '../model/Account';
import * as moment from 'moment';

function elementOf<T extends Element>(id: string) {
    return <T>document.querySelector(id);
}

export class LaunchListView {    
    private readonly key = "launchs";
    private readonly key_Account = "accounts";
    
    private readonly _contactList =
        elementOf<HTMLUListElement>("#contactList");

    private readonly _reportLaunchList =
        elementOf<HTMLUListElement>("#reportLaunchList");

    private readonly _reportLaunchItemTemplate =
        elementOf<HTMLUListElement>("#reportLaunchItemTemplate");        

    private readonly _comboBox =
        elementOf<HTMLSelectElement>("#account");

    private readonly _descriptionInput =
        elementOf<HTMLInputElement>("#description");

    private readonly _valueInput =
        elementOf<HTMLInputElement>("#value");

    private readonly _typeLaunch =
        elementOf<HTMLInputElement>("#typeLaunch");

    private readonly _dateLaunch =
        elementOf<HTMLInputElement>("#dateLaunch");

    private readonly _dateInitialLaunch =
        elementOf<HTMLInputElement>("#dateInitialLaunch");
        
    private readonly _dateFinaleLaunch =
        elementOf<HTMLInputElement>("#dateFinaleLaunch");

    private readonly _addButtonCreateReportLaunch =
        elementOf<HTMLButtonElement>("#addButtonCreateReportLaunch");                

    private readonly _addButtonLaunch =
        elementOf<HTMLButtonElement>("#addButtonLaunch");

    constructor(private readonly _controller: LaunchListController) {        
        if (document.getElementById('addButtonLaunch') == null){
            //console.log('Não existe');
        }else{
            this._addButtonLaunch.addEventListener("click", () => this.onAddButtonLaunchClick());
        };
        
        if (document.getElementById('addButtonCreateReportLaunch') == null){
            //console.log('Não existe');
        }else{
            this._addButtonCreateReportLaunch.addEventListener("click", () => this.onAddButtonCreateReportLaunchClick());
        }        
    }

    showContacts(launchs: LaunchList) {
        
        if (!document.getElementById('contactList') == null){
            if (launchs.isEmpty) {          
                this.showNoItems();
                return;
            }else{
                this.clearItems();             
                const storedAccountsValue = localStorage.getItem(this.key);            
                if (!storedAccountsValue) {
                    return new LaunchList();
                }
        
                const storedAccounts: LaunchList = JSON.parse(storedAccountsValue);
                const list = new LaunchList();
                
                for (const account of storedAccounts.launchs) {
                    const item = document.createElement("li");            
                    item.textContent = "Conta: " + account.description +
                                       " Saldo Inicial: " + account.value;
                    this._contactList.appendChild(item);
                }            
            }
        }
    } 

    showAccounts(contacts: AccountList) { 
        if (contacts.isEmpty) {            
            this.showNoItems();
            return;
        }else{            
            this.clearItems();             
            const storedAccountsValue = localStorage.getItem(this.key_Account);            
            if (!storedAccountsValue) {
                return new AccountList();
            }
            
            const storedAccounts: AccountList = JSON.parse(storedAccountsValue);
            const list = new AccountList();
            
            for (const account of storedAccounts.accounts) {                
                const item = document.createElement("option");                            
                item.textContent = account.NameAccount;
                item.value = account.NameAccount;
                this._comboBox.appendChild(item);
            }            
        }                       
    }    

    showNoItems() {
        this.clearItems();
        const item = document.createElement("option");
        item.textContent = "Sem conta registrada";
        item.value = "Sem conta registrada";
        this._comboBox.appendChild(item);
    }

    showNoLaunchs() {
        this.clearItems();        
        const item = document.createElement("li");
        item.textContent = "Sem Lançamentos";
        this._reportLaunchList.appendChild(item);
    }    

    clearItems() {
        if (!document.getElementById('contactItemTemplate') == null){
            while (this._contactList.children.length) {
                const child = this._contactList.children.item(0);
                this._contactList.removeChild(child);
            }
        }
    }

    clearItemsReport() {
        while (this._reportLaunchList.children.length) {
            const child = this._reportLaunchList.children.item(0);
            this._reportLaunchList.removeChild(child);
        }        
    }    

    private onAddButtonLaunchClick() {
        const description = this._descriptionInput.value;
        const value       = parseFloat(this._valueInput.value);
        const typeLaunch  = this._typeLaunch.value;
        const dateLaunch  = new Date(this._dateLaunch.value);
        
        const account     = this._comboBox.value;
        //console.log(this._comboBox.value);
        
        this._controller.addAccounts(description, value, typeLaunch, dateLaunch, account);
    }

    showReport(launchs: LaunchList) {                
        //console.log('Report de Lançamentos  ');
        moment.locale('pt-br');
        const accountCombo = this._comboBox.value;
        const dateInitial  = this._dateInitialLaunch.value;
        const dateFinale   = this._dateFinaleLaunch.value; 
        const valorReport  = parseFloat(this._valueInput.value); 
        //console.log(valorReport);
        if (launchs.isEmpty) {            
            //console.log('limpo');
            this.showNoItems();
            return;
        }else{            
            
            this.clearItemsReport();             
            const storedAccountsValue = localStorage.getItem(this.key);            
            if (!storedAccountsValue) {
                return new LaunchList();
            }

            if(((dateFinale !== "") && (dateInitial == "")) || ((dateFinale == "") && (dateInitial !== ""))){
                alert('Verificar as Datas');
                throw('Verificar as Datas');
            }            

            const storedAccounts: LaunchList = JSON.parse(storedAccountsValue);
            const list = new LaunchList();            
            for (const account of storedAccounts.launchs) {
                if((dateFinale == "") && (dateInitial == "")){
                    if (accountCombo == "selecione"){
                        const item = document.createElement("li");
                        item.textContent = account.description + 
                                           ' - R$: ' + account.value +
                                           ' - Tipo: ' + account.typeLaunch +
                                           ' - Data: ' + moment(account.dateLaunch).format('l') ;
                        this._reportLaunchList.appendChild(item);
                    }else{
                        if (account.account == accountCombo){
                            const item = document.createElement("li");
                            item.textContent = account.description + 
                                               ' - R$: ' + account.value +
                                               ' - Tipo: ' + account.typeLaunch +
                                               ' - Data: ' + moment(account.dateLaunch).format('l') ;
                            this._reportLaunchList.appendChild(item);
                        }
                    }
                }else if((dateFinale !== "") && (dateInitial !== "")){
                    if (accountCombo == "selecione"){                        
                        if ((new Date(dateInitial) <= new Date(String(account.dateLaunch)) ) && 
                            (new Date(dateFinale) >= new Date(String(account.dateLaunch)) )){
                            const item = document.createElement("li");
                            item.textContent = account.description + 
                                               ' - R$: ' + account.value +
                                               ' - Tipo: ' + account.typeLaunch +
                                               ' - Data: ' + moment(account.dateLaunch).format('l') ;
                            this._reportLaunchList.appendChild(item);                            
                        } 
                    }else{
                        if ((new Date(dateInitial) <= new Date(String(account.dateLaunch)) ) && 
                            (new Date(dateFinale) >= new Date(String(account.dateLaunch)) )){
                            if (account.account == accountCombo){
                                const item = document.createElement("li");
                                item.textContent = account.description + 
                                                   ' - R$: ' + account.value +
                                                   ' - Tipo: ' + account.typeLaunch +
                                                   ' - Data: ' + moment(account.dateLaunch).format('l') ;
                                this._reportLaunchList.appendChild(item);
                            }                            
                        }
                    }
                }

                if(valorReport != 0){
                    //console.log(valorReport);
                    if ((valorReport <= account.value) && (valorReport >= account.value)){   
                        if (accountCombo == "selecione"){
                            /*if ((new Date(dateInitial) <= new Date(account.dateLaunch)) && 
                                (new Date(dateFinale) >= new Date(account.dateLaunch))){                        
    
                                const item = document.createElement("li");
                                item.textContent = account.description + 
                                                   ' - R$: ' + account.value +
                                                   ' - Tipo: ' + account.typeLaunch +
                                                   ' - Data: ' + moment(account.dateLaunch).format('l') ;
                                this._reportLaunchList.appendChild(item);                            
                                } */
                        }else{
                            /*if ((new Date(dateInitial) <= new Date(account.dateLaunch)) && 
                                (new Date(dateFinale) >= new Date(account.dateLaunch))){
                                if (account.account == accountCombo){
                                    const item = document.createElement("li");
                                    item.textContent = account.description + 
                                                       ' - R$: ' + account.value +
                                                       ' - Tipo: ' + account.typeLaunch +
                                                       ' - Data: ' + moment(account.dateLaunch).format('l') ;
                                    this._reportLaunchList.appendChild(item);
                                }                            
                                } */
                        }
                        
                        if((dateFinale == "") && (dateInitial == "")){
                            if (accountCombo == "selecione"){
                                const item = document.createElement("li");
                                item.textContent = account.description + 
                                                   ' - R$: ' + account.value +
                                                   ' - Tipo: ' + account.typeLaunch +
                                                   ' - Data: ' + moment(account.dateLaunch).format('l') ;
                            this._reportLaunchList.appendChild(item);
                        }else{
                            if (account.account == accountCombo){
                                const item = document.createElement("li");
                                item.textContent = account.description + 
                                                    ' - R$: ' + account.value +
                                                    ' - Tipo: ' + account.typeLaunch +
                                                    ' - Data: ' + moment(account.dateLaunch).format('l') ;
                                this._reportLaunchList.appendChild(item);
                            }
                        }                        
                    }
                }                                                    
            }
                

        }
    }                       
    }

    private onAddButtonCreateReportLaunchClick() {
        this._controller.reportLaunch();       
//        console.log('Gerandorelatorio');
    }    
}