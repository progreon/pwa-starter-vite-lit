import { PwaPage } from "@/pages/PwaPage";

export type PwaRouteMap = { [key: string]: PwaRoute };

export class PwaRoute {
  protected static HREF_DELIMITER = '/';

  private _href: string;
  constructor(
    public readonly title: string,
    public readonly page: PwaPage,
    private readonly _authorizations: string[] = [],
    public readonly fullSize = false,
    public readonly showInMenu = true,
    public readonly subRoutes?: PwaRouteMap
  ) { }
  protected set href(href: string) {
    if (href.endsWith(PwaRoute.HREF_DELIMITER)) {
      href = href.substring(0, href.length - PwaRoute.HREF_DELIMITER.length);
    }
    this._href = href;
    this.page.href = href;
    if (this.subRoutes) {
      Object.keys(this.subRoutes).forEach(key => {
        const route = this.subRoutes[key];
        route.href = (href ? href + PwaRoute.HREF_DELIMITER : '') + key;
      })
    }
  }
  get href(): string {
    return this._href;
  }
  getRoute(key: string, authorizations: string[] = [], mayViewAllPages = false): PwaRoute {
    if (!key) {
      return this;
    } else {
      const i = key.indexOf(PwaRoute.HREF_DELIMITER);
      const subKey = i >= 0 ? key.substring(0, key.indexOf(PwaRoute.HREF_DELIMITER)) : key;
      const restKey = i >= 0 ? key.substring(key.indexOf(PwaRoute.HREF_DELIMITER) + 1) : undefined;
      const subRoute = this.subRoutes[subKey];
      return subRoute ? subRoute.getRoute(restKey, authorizations, mayViewAllPages) : undefined;
    }
  }
  isAuthorized(authorizations: string[], mayViewAllPages = false): boolean {
    return mayViewAllPages || this._authorizations.every(a => authorizations.includes(a));
  }
}

export class PwaRoutes extends PwaRoute {
  constructor(
    contextPath: string,
    title: string,
    routes: PwaRouteMap,
    public readonly fourOFour: PwaRoute,
    public readonly fourOOne: PwaRoute,
    public readonly home: string = 'home'
  ) {
    super(title, routes[home]?.page, [], false, true, routes);
    this.href = contextPath;
  }
  getRoute(key: string, authorizations: string[] = [], mayViewAllPages = false): PwaRoute {
    const page = super.getRoute(key, authorizations, mayViewAllPages);
    if (page) {
      if (page.isAuthorized(authorizations, mayViewAllPages)) {
        return page;
      } else {
        return this.fourOOne;
      }
    } else {
      return this.fourOFour;
    }
    // return page || this.fourOFour.page;
  }
}
