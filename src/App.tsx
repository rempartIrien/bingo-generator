import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Grid from './grid/Grid';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <main className="App">
        <Grid></Grid>
      </main>
    </BrowserRouter>
  );
}

export default App;
