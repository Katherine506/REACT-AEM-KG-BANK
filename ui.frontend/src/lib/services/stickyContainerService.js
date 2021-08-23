import { BehaviorSubject } from 'rxjs';

/**
 * This observable is used to determine if the stickyContainer already added the portal
 */
export class StickyContainerService {
    containerMountedSource = new BehaviorSubject(false);
    containerMounted = this.containerMountedSource.asObservable();

    mountedContainer() {
        this.containerMountedSource.next(true);
    }
}

const stickyContainerService = new StickyContainerService();

export default stickyContainerService;
