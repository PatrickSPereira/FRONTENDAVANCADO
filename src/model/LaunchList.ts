import { Launch } from './Launch';

export class LaunchList {
    readonly launchs = Array<Launch>();

    get isEmpty() {
        return this.launchs.length == 0;
    }

    add(launch: Launch) {
        this.launchs.push(launch);
    }

    remove(launch: Launch) {
        const index = this.launchs.indexOf(launch);
        
        if (index >= 0) {
            this.launchs.splice(index, 1);
        }
    }
}
