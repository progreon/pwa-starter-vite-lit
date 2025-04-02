import { PwaPage } from "@/pages/PwaPage";

export type PwaRouteMap = { [key: string]: PwaRoute };

export class PwaRoute {
  protected static HREF_DELIMITER = '/';

  private _href: string;
  constructor(
    public readonly title: string,
    public readonly page: PwaPage,
    public readonly routes?: PwaRouteMap,
    public readonly showInMenu = true
  ) { }
  protected set href(href: string) {
    this._href = href;
    this.page.href = href;
    if (this.routes) {
      Object.keys(this.routes).forEach(key => {
        const nav = this.routes[key];
        nav.href = (href ? href + PwaRoute.HREF_DELIMITER : '') + key;
      })
    }
  }
  get href(): string {
    return this._href;
  }
  getPage(key: string): PwaPage {
    if (!key) {
      return this.page;
    } else {
      const i = key.indexOf(PwaRoute.HREF_DELIMITER);
      const subKey = i >= 0 ? key.substring(0, key.indexOf(PwaRoute.HREF_DELIMITER)) : key;
      const restKey = i >= 0 ? key.substring(key.indexOf(PwaRoute.HREF_DELIMITER) + 1) : undefined;
      const subNav = this.routes[subKey];
      return subNav ? subNav.getPage(restKey) : undefined;
    }
  }
}

export class PwaRoutes extends PwaRoute {
  constructor(
    contextPath: string,
    title: string,
    routes: PwaRouteMap,
    public readonly fourOFour: PwaRoute,
    public readonly home: string = 'home'
  ) {
    // super('/', '/', '/', subnav[home].page, subnav);
    super(title, routes[home]?.page, routes);
    this.href = contextPath;
    // this.href = '';
  }
  getPage(key: string): PwaPage {
    const page = super.getPage(key);
    return page || this.fourOFour.page;
  }
}
