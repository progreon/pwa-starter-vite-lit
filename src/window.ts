// import { TemplateResult } from 'lit-element';
// import { PwaPage } from "@/app/core/components/pwa/PwaPage";
// import { Dialog } from '@material/mwc-dialog';

export { }

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    app: any;
    appConfig: { app: string, version: string };
    // appConfig: { app: string, siteMap: PwaPage[], pageList: { [key: string]: PwaPage } };
    MyAppGlobals: { appName: string, version: string, rootPath: string, wideWidth: string, serverConfig: any };
    isUpdateAvailable: any;
    isMobileView: () => boolean;
    // openMwcDialog: (template: TemplateResult, dialogAtt?: { [key: string]: boolean|string }) => Dialog;
    // showTooltip: (template: TemplateResult, forElement: HTMLElement) => Dialog;
  }
}
