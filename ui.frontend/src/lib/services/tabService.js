import { BehaviorSubject } from 'rxjs';

export class TabService {
    tabContainers = {};

    getTabIsActive(tabContainerId) {
        if (!this.tabContainers[tabContainerId]) {
            this.tabContainers[tabContainerId] = {};
            this.tabContainers[tabContainerId].source = new BehaviorSubject(null);
            this.tabContainers[tabContainerId].value = this.tabContainers[
                tabContainerId
            ].source.asObservable();
            this.tabContainers[tabContainerId].setActiveTab = (tabTitle) => {
                this.tabContainers[tabContainerId].source.next(tabTitle);
            };
        }
        return this.tabContainers[tabContainerId].value;
    }

    getTabIsActiveSource(tabContainerId) {
        return this.tabContainers[tabContainerId];
    }
}

const tabService = new TabService();

export default tabService;
