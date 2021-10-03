import { css } from '@linaria/core';
import React from 'react';
import { Link } from 'react-router-dom';

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

const link: string = css`
  text-decoration: none;

  &,
  &:hover,
  &:visited {
    color: var(--color-select);
  }

  &:hover {
    text-decoration: underline;
  }
`;

function Menu(): JSX.Element {
  return (
    <ol className={list}>
      <li className={item}>
        <Link className={link} to="/">
          Home
        </Link>
      </li>
      <li className={item}>
        <Link className={link} to="/about">
          About
        </Link>
      </li>
    </ol>
  );
}

export default Menu;
