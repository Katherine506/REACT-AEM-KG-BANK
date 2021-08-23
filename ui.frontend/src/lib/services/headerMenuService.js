import { BehaviorSubject, ReplaySubject } from 'rxjs';

export class HeaderMenuService {
    // Initially, the menu is not open
    mobileMenuIsOpenSource = new BehaviorSubject(null);
    mobileMenuIsOpen = this.mobileMenuIsOpenSource.asObservable();

    // Function that, when called, will allow subscribers to know whether the menu is open or closed
    setMobileMenuOpen(isOpen) {
        this.mobileMenuIsOpenSource.next(isOpen);
    }

    // Initially, no menu is open
    whichMenuIsOpenSource = new BehaviorSubject(null);
    whichMenuIsOpen = this.whichMenuIsOpenSource.asObservable();

    // Function that, when called, will allow subscribers to know which menu was just opened (or that a menu was closed)
    setOpenMenu(menuName) {
        this.whichMenuIsOpenSource.next(menuName);
    }

    navigationLinksSubject = new ReplaySubject(1);

    setNavigationLinks(links) {
        if (!this.navigationLinksSubject.isStopped) {
            this.navigationLinksSubject.next(links);
        }
        this.navigationLinksSubject.complete();
    }

    getNavigationLinksSubject() {
        return this.navigationLinksSubject;
    }
}

const headerMenuService = new HeaderMenuService();

export default headerMenuService;
