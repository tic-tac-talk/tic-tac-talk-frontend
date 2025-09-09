import { Global, css } from '@emotion/react';
import theme from '@/styles/theme';

const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    touch-action: manipulation;
  }

  input,
  textarea,
  select {
    outline: none;
    touch-action: manipulation;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  * {
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
    color: ${theme.COLORS.LABEL_PRIMARY};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.025em;
  }

  html {
    font-size: clamp(14px, 2.5vw, 16px);
  }

  html,
  body {
    background: linear-gradient(
        ${theme.COLORS.BACKGROUND[1]},
        ${theme.COLORS.BACKGROUND[2]}
      )
      fixed;
    line-height: 1.5;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
  }

  h1 {
    font-size: 2rem;
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

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 13px;
    }

    button {
      min-height: 44px;
    }

    input,
    textarea,
    select {
      min-height: 44px;
    }
  }
`;

export default function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
