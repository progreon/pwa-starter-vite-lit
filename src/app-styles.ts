import { css, unsafeCSS } from 'lit';
// import * as MatIcW2 from 'material-design-icons/iconfont/MaterialIcons-Regular.woff2';

// const fonts = css`
//   @font-face {
//     font-family: 'Material Icons';
//     src: url();
//   }
// `;

export const AppStyles = css`
  :host {
    /* GLOBALS */
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5;
    font-size: 14px;
  }

  * {
    box-sizing: border-box;
  }

  *[hidden] {
    display: none;
  }

  div[hidden] {
    display: none;
  }

  /* pre {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5;
    font-size: 14px;
    margin: 0;
  } */

  /* h1 {
    font-size: 36px;
    font-weight: 400;
  }

  h2 {
    font-size: 28px;
    font-weight: 400;
  }

  h3 {
    font-size: 20px;
    font-weight: 400;
  }

  h4 {
    font-size: 18px;
    font-weight: 500;
  }

  h5 {
    font-size: 14px;
    font-weight: 500;
  }

  h6 {
    font-size: 14px;
    font-weight: 500;
  } */

  /* p.heading {
    font-weight: bold;
  } */

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }

  /* @media (min-width: ${unsafeCSS(window.MyAppGlobals.wideWidth)}) {
    :host {
      font-size: 16px;
    }

    h1 { font-size: 60px; }
    h2 { font-size: 46px; }
    h3 { font-size: 32px; }
    h4 { font-size: 22px; }
    h5 { font-size: 16px; }
    h6 { font-size: 16px; }
  } */
`;
