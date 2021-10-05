import { css } from '@linaria/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { LINK_DEFAULT_STYLE } from '../style';

const list = css`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const item: string = css`
  & + & {
    margin-left: 1rem;
  }
`;

function Menu(): JSX.Element {
  return (
    <ol className={list}>
      <li className={item}>
        <Link className={LINK_DEFAULT_STYLE} to="/">
          Home
        </Link>
      </li>
      <li className={item}>
        <Link className={LINK_DEFAULT_STYLE} to="/about">
          About
        </Link>
      </li>
    </ol>
  );
}

export default Menu;
