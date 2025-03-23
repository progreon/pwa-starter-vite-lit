import { navigatedToPage } from "./core/store/actions/router";
import { AppStore } from "./core/store";

export class NavigateEvent extends CustomEvent<{ href: string; external?: boolean; }> {
  public static TYPE = 'navigate';
  constructor(public href: string, public external = false) {
    super(NavigateEvent.TYPE, { detail: { href, external } });
  }
}

export class NavigateToPageEvent extends CustomEvent<{ page: string; }> {
  public static TYPE = 'navigateToPage';
  constructor(public page: string) {
    super(NavigateToPageEvent.TYPE, { detail: { page } });
  }
}

const doDispatch = (store: AppStore, location: Location, defaultPage?: string, contextPath: string = '/', scroll: number = 0) => {
  const url = new URL(location.href);

  if (url.pathname.startsWith(contextPath)) {
    // page = pathname after the origin with context path
    const page = url.pathname.substring(contextPath.length) || defaultPage;
    const search = url.search;
    const hash = url.hash;
    store.dispatch(navigatedToPage({ page, search, hash, scroll }));
  } else {
    store.dispatch(navigatedToPage({ page: '404' }))
  }
}

export const installRouter = (store: AppStore, defaultPage?: string, contextPath: string = '/', getScrollCallback: () => number = () => 0) => {
  // make sure the context path has a leading & ending slash
  contextPath = contextPath.startsWith('/') ? contextPath : '/' + contextPath;
  contextPath = contextPath.endsWith('/') ? contextPath : contextPath + '/';

  // catch anchor clicks
  document.body.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey) return;

    const anchor = e.composedPath().filter(
      n => (n as HTMLElement).tagName === 'A'
    )[0] as HTMLAnchorElement | undefined;
    if (!anchor || anchor.target ||
      anchor.hasAttribute('download') ||
      anchor.getAttribute('rel') === 'external') return;

    const href = anchor.href; // this includes 'https://...', even if the href property starts with '/...'
    if (!href || href.indexOf('mailto:') !== -1) return;

    const fullOrigin = new URL(contextPath, window.location.origin).href; // get the full origin with context path
    if (!href.startsWith(fullOrigin)) return;

    e.preventDefault();
    if (href !== window.location.href) {
      const scroll = getScrollCallback(); // TODO: test scroll correctly
      window.history.replaceState({ scroll }, '', window.location.href);
      window.history.pushState({ scroll }, '', href);
      doDispatch(store, window.location, defaultPage, contextPath, scroll);
    }
  });

  // catch navigation events caused by js code
  document.body.addEventListener(NavigateEvent.TYPE, (e: NavigateEvent) => {
    if (e.external) {
      window.location.href = e.href;
    } else {
      const scroll = getScrollCallback(); // TODO: test scroll correctly
      // window.history.replaceState({ scroll }, '', window.location.href);
      // window.history.pushState({ scroll: 0 }, '', e.href);
      window.history.pushState({ scroll }, '', e.href);
      doDispatch(store, window.location, defaultPage, contextPath, scroll);
    }
  });

  // catch navigation events caused by js code
  document.body.addEventListener(NavigateToPageEvent.TYPE, (e: NavigateToPageEvent) => {
    const href = window.location.origin + contextPath + e.page;
    const scroll = getScrollCallback(); // TODO: test scroll correctly
    // window.history.replaceState({ scroll }, '', window.location.href);
    // window.history.pushState({ scroll: 0 }, '', e.href);
    window.history.pushState({ scroll }, '', href);
    doDispatch(store, window.location, defaultPage, contextPath, scroll);
  });

  // catch history event
  window.addEventListener('popstate', (e: PopStateEvent) => {
    doDispatch(store, window.location, defaultPage, contextPath, e.state?.scroll);
  });

  // initial dispatch, this probably won't catch the scenario where someone goes back in history from another website and scroll back to where they were on the page
  doDispatch(store, window.location, defaultPage, contextPath);
};

export const navigate = (href: string, external?: boolean) => {
  document.body.dispatchEvent(new NavigateEvent(href, external));
}

export const navigateToPage = (page: string) => {
  document.body.dispatchEvent(new NavigateToPageEvent(page));
}
