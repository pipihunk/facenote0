import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {logout, req} from '../actions'


let AuthButton = withRouter(
  (props) =>
    props.loggedIn ? (
      <span>
        Welcome! {`${props.user.firstName} ${props.user.lastName}`}&nbsp;
        <button
          onClick={async () => {
              let response = await req('/logout', 'POST');
              let status = response.status;
        
              if(status === 200){
                  props.dispatch(logout());
                  sessionStorage.clear()
                  props.history.push('/login');
              } 
            }}
        >
          Sign out
        </button>
      </span>
    ) : (
      <span>You are not logged in.</span>
    )
);

export default connect(
  state => ({
    loggedIn: !!sessionStorage.getItem('login'),
    user: JSON.parse(sessionStorage.getItem('login') || '{}')
  })
)(AuthButton);