import { LaunchList } from './LaunchList';
import { Launch } from './Launch';

export class LaunchListStore {
    private readonly key = "launchs";

    store(launchs: LaunchList) {
        localStorage.setItem(this.key, JSON.stringify(launchs));
    }

    restore() {        
        const storedLaunchsValue = localStorage.getItem(this.key);
        
        if (!storedLaunchsValue) {
            return new LaunchList();
        }

        const storedLaunchs: LaunchList = JSON.parse(storedLaunchsValue);
        const list = new LaunchList();
        
        for (const launch of storedLaunchs.launchs) {
            list.add(new Launch(launch.description, launch.value, launch.typeLaunch, launch.dateLaunch, launch.account));
        }

        return list;
    }
}