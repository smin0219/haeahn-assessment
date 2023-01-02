import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

function App() {
  return (
    <BrowserRouter basename='/certification'>
      <Router/>
    </BrowserRouter>
  );
}
export default App;
