import { Global, css } from '@emotion/react';
import BackgroundImage from '@/assets/images/landing-background.webp';
import { MEDIA_QUERIES } from '@/constants';
import theme from '@/styles/theme';

const globalStyles = css`
  @font-face {
    font-family: 'KakaoBigFont';
    src: url('/KakaoBigSans-Bold-subset.woff2') format('woff2');
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    color: ${theme.COLORS.LABEL.PRIMARY};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.03em;
    overscroll-behavior: none;
    -webkit-tap-highlight-color: transparent;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;

    &:before,
    &:after {
      content: '';
      content: none;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button,
  input,
  textarea,
  select {
    border: none;
    background: none;
    cursor: pointer;
    touch-action: manipulation;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  html {
    font-size: 16px;
    height: 100%;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    margin: 0;
    background-image: url(${BackgroundImage});
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 500;
  }

  h5 {
    font-size: 1rem;
    font-weight: 500;
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 500;
  }

  #root {
    width: 100%;
    min-height: 100dvh;
  }

  ${MEDIA_QUERIES.MOBILE} {
    html {
      font-size: 14px;
    }
  }
`;

const GlobalStyle = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyle;
