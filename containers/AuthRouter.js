import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>{
          console.log('rest1', props);
          return rest.loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      }
      />
    );
  } 

  export default connect(
    state => ({
      loggedIn: !!sessionStorage.getItem('login'),
    })
  )(AuthRoute);