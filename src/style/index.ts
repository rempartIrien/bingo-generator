import { css } from '@linaria/core';

// FIXME: For now it is impossible with Linaria to use these variables
// with `var(${CSS_VARIABLES.primaryColor})` unfortunately.
export const CSS_VARIABLES = {
  primaryColor: '--color-primary',
  selectColor: '--color-select',
  regularTextColor: '--color-regular-text',
  selectTextColor: '--color-select-text',
  backgroundColor: '--color-background'
};

export const DARK_BACKGROUND_COLOR: string = '#000';
export const LIGHT_BACKGROUND_COLOR: string = '#fff';

export const LIGHT_THEME: string = css`
  ${CSS_VARIABLES.primaryColor}: #f60;
  ${CSS_VARIABLES.selectColor}: #e16;
  ${CSS_VARIABLES.regularTextColor}: #000;
  ${CSS_VARIABLES.selectTextColor}: #fff;
  ${CSS_VARIABLES.backgroundColor}: ${LIGHT_BACKGROUND_COLOR};
`;

export const DARK_THEME: string = css`
  ${CSS_VARIABLES.primaryColor}: #f60;
  ${CSS_VARIABLES.selectColor}: #e16;
  ${CSS_VARIABLES.regularTextColor}: #fff;
  ${CSS_VARIABLES.selectTextColor}: #fff;
  ${CSS_VARIABLES.backgroundColor}: ${DARK_BACKGROUND_COLOR};
`;

export const INPUT_DEFAULT_STYLE: string = css`
  color: var(${CSS_VARIABLES.primaryColor});
  background-color: var(${CSS_VARIABLES.backgroundColor});
`;

export const LINK_DEFAULT_STYLE: string = css`
  text-decoration: none;

  &,
  &:hover,
  &:visited {
    color: var(${CSS_VARIABLES.selectColor});
  }

  &:hover {
    text-decoration: underline;
  }
`;
