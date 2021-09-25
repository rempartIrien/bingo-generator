import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { ABOUT_ROUTE, BINGO_ROUTE, GENERATOR_ROUTE } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <main className="App">
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
      </main>
    </BrowserRouter>
  );
}

export default App;
