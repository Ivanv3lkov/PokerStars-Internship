import React from 'react';
import Home from '../src/components/Home';
import Details from '../src/components/Details';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
export default function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}