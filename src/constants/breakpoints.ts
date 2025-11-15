export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;

export const MEDIA_QUERIES = {
  MOBILE: `@media (max-width: ${BREAKPOINTS.MOBILE}px)`,
  TABLET: `@media (max-width: ${BREAKPOINTS.TABLET}px)`,
  DESKTOP: `@media (min-width: ${BREAKPOINTS.DESKTOP}px)`,
} as const;
