import '@emotion/react';
import theme from '@/styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    COLORS: typeof theme.COLORS;
  }
}
