import { styled } from '@linaria/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Menu from './layout/Menu';
import ThemeSwitcher from './layout/ThemeSwitcher';
import { ABOUT_ROUTE, BINGO_ROUTE, GENERATOR_ROUTE } from './routes';
import { DARK_THEME, LIGHT_THEME } from './style/theme.model';

const Main = styled.main`
  font-size: 1.6rem;
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-regular-text);

  :global() {
    body {
    }
  }
`;

const Section = styled.section`
  margin: auto;
  max-width: 1024px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const [mainClassName, setMainClassName] = useState<string>();

  useEffect(() => {
    // FIXME: we need to consider the body as a special case as it cannot read
    // CSS variabels defined for one of its children...
    if (isDarkMode) {
      setMainClassName(DARK_THEME);
      document.body.style.backgroundColor = '#000';
    } else {
      setMainClassName(LIGHT_THEME);
      document.body.style.backgroundColor = '#fff';
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Main className={mainClassName}>
        <Section>
          <Nav>
            <Menu></Menu>
            <ThemeSwitcher themeChange={setIsDarkMode}></ThemeSwitcher>
          </Nav>
          <Switch>
            {[ABOUT_ROUTE, BINGO_ROUTE, GENERATOR_ROUTE].map(
              ({ path, component }) => (
                <Route key={path} path={path} component={component}></Route>
              )
            )}
            <Route exact path="/">
              <Redirect to="/generator"></Redirect>
            </Route>
            <Route render={() => <h1>404: page not found</h1>} />
          </Switch>
        </Section>
      </Main>
    </BrowserRouter>
  );
}

export default App;
