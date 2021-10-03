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

function Menu(): JSX.Element {
  return (
    <ol className={list}>
      <li className={item}>
        <Link to="/">Home</Link>
      </li>
      <li className={item}>
        <Link to="/about">About</Link>
      </li>
    </ol>
  );
}

export default Menu;
