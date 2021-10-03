import { css } from '@linaria/core';

// FIXME: For now it is impossible with Linaria to use these variables
// with `var(${CSS_VARIABLES.primaryColor})` unfortunately.
export const CSS_VARIABLES = {
  primaryColor: '--color-primary',
  accentColor: '--color-accent',
  regularColor: '--color-regular',
  backgroundColor: '--color-background'
};

export const LIGHT_THEME: string = css`
  ${CSS_VARIABLES.primaryColor}: #60e;
  ${CSS_VARIABLES.accentColor}: #0dc;
  ${CSS_VARIABLES.regularColor}: #000;
  ${CSS_VARIABLES.backgroundColor}: #fff;
`;

export const DARK_THEME: string = css`
  ${CSS_VARIABLES.primaryColor}: #0af;
  ${CSS_VARIABLES.accentColor}: #e16;
  ${CSS_VARIABLES.regularColor}: #fff;
  ${CSS_VARIABLES.backgroundColor}: #000;
`;
