import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserRegistration from './containers/UserRegistration'
import UserList from './containers/UserList'
import Login from './containers/Login'
import AuthRouter from './containers/AuthRouter'

import { Provider } from 'react-redux'
import configureStore from './configureStore'
import AuthButton from './containers/AuthButton';

const store = configureStore()

//sessionStorage.clear()
// console.log('sessionStorage', sessionStorage)
// if(sessionStorage.login){
//   store.getState().login = sessionStorage.login;
//   // for(let key of Object.keys(sessionStorage.state))
//   //   store.getState()[key] = sessionStorage.state[key];
// }

function Home() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <AuthButton/>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/registration" component={UserRegistration} />
          <AuthRouter path="/users" component={UserList} />
          <Route path="/" component={Login} />
        </Switch>

      </div>
    </Router>
    </Provider>
  );
}

export default Home