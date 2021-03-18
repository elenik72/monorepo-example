import ReactDOM from 'react-dom'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Home, About } from './route'

function App () {
  return (
    <Router basename='app1'>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="/app2">app2</a>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
const rootElement = document.getElementById("root")

ReactDOM.render(<App />, rootElement)
if (module.hot) module.hot.accept()
