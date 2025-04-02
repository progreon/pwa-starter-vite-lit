// Old "Page" class from the old codebase for reference
// Replacement in the new codebase is in pwa-router
export class Page {
    constructor(key, title, element, authorizations = [], lazyLoadFunction = null, fullSize = false, showInMenu = true, is404 = false) {
        this.key = key;
        this.title = title;
        this.element = element;
        this.authorizations = authorizations;
        this.lazyLoadFunction = lazyLoadFunction;
        this.fullSize = !!fullSize;
        this.showInMenu = !!showInMenu;
        this.is404 = !!is404;
        this.subPages = [];
    }

    addSubPage(subPage) {
        this.subPages.push(subPage);
        return this;
    }

    setSubPages(subPages = []) {
        this.subPages = subPages;
        return this;
    }

    getAllSubPagesIncludingThis() {
        let pages = [this];
        this.subPages.forEach(sp => pages.push(...sp.getAllSubPagesIncludingThis()));
        return pages;
    }

    doLazyLoad() {
        if (this.lazyLoadFunction) {
            this.lazyLoadFunction();
        }
    }
}