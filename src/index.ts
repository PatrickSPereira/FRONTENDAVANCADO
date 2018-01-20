import { AccountListController } from './controller/AccountListController';
import { LaunchListController } from './controller/LaunchListController';

const controller = new AccountListController();
const controllerLaunch = new LaunchListController();

controller.initialize();
controllerLaunch.initialize();

declare const module: any;

if (module.hot) {
    module.hot.accept();
}
