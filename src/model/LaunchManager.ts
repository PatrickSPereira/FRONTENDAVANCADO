import { LaunchListStore } from './LaunchListStore';
import { Launch } from './Launch';

export class LaunchManager {
    private _store = new LaunchListStore();
    private _launchs = this._store.restore();

    get launchs() {
        return this._launchs;
    }

    addLaunchs(description: string, value: number, typeLaunch: string, dateLaunch: Date, account: string) {
        const launch = new Launch(description, value, typeLaunch, dateLaunch, account);
        this._launchs.add(launch);
        this._store.store(this._launchs);
        console.log("Lançamento Adicionado", launch);
    }
}