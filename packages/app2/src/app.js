import ReactDOM from 'react-dom'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Home, About } from './route'

function App () {
  return (
    <Router basename="app2">
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home2</Link>
            </li>
            <li>
              <Link to="/about">About2</Link>
            </li>
            <li>
              <a href="/app1">App1</a>
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
          <Redirect to='/app1' />
        </Switch>
      </div>
    </Router>
  );
}
const rootElement = document.getElementById("root")

ReactDOM.render(<App />, rootElement)
if (module.hot) module.hot.accept() 
