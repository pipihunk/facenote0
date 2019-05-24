
export const STATUS_IN = 'I'
export const STATUS_FAILED = 'F'
export const STATUS_AUTH_FAILED = 'AF'
export const STATUS_SUCC = 'S'


export const AUTH_FAILED = 'AUTH_FAILED'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REGISTER = 'REGISTER'
export const EDIT_USER = 'EDIT_USER'
export const CANCEL_EDIT_USER = 'CANCEL_EDIT_USER'
export const DELETE_USER = 'DELETE_USER'
export const OK_EDIT_USER = 'OK_EDIT_USER'


export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function req(url, method, body){
    const proxy = 'http://localhost:8081';
    
    const data = {
        method,
        headers: {'Accept': 'application/json'},
        credentials: 'include'
    }

    if(body){
        data.body = body;
        data.headers['Content-Type'] = 'application/json';
    }
    

    return fetch((url.startsWith('http') ? '' : proxy) + url, data);
} 

export function get(url){
    return req(url, 'GET');
}

// export function register(user) {
//   return async dispatch => {
//     dispatch({type: REGISTER, payload:{status: STATUS_IN}});
    
//     let response = await req('/register', 'POST', JSON.stringify(user));
//     let data = await response.json();
//     if(response.status === 409){
//       dispatch({type: REGISTER, payload:{status: STATUS_FAILED, msg: data.msg}});
//     } else {
//       dispatch({type: REGISTER, payload:{status: STATUS_SUCC}});
//     }

//     return response.status;
//   }
// }

export function login(user) {
    return {type:LOGIN, payload:{email:user.email, user}}
  }
export function logout() {
    return {type:LOGOUT}
  }
// function editUser(type, email) {
//     return {type, payload:{email}};
//   }
// export function clickEditUser(email) {
//     return editUser(EDIT_USER, email);
//   }
// export function cancelEditUser(email) {
//     return editUser(CANCEL_EDIT_USER, email);
//   }
export function okEditUser(email, user) {
    return {type: OK_EDIT_USER, payload:{status: STATUS_SUCC, email, user}};
  }
export function deleteUser(email) {
    return {type: DELETE_USER, payload:{email}};
  }

  
  function fetchUsers() {
    return async dispatch => {
      //dispatch({type:REQUEST_USERS, payload:{status:STATUS_IN}})
      let response = await req('/users', 'GET');
      let json = await response.json();

      let status = response.status;

      if(status === 403){
        //dispatch({type:REQUEST_USERS, payload:{msg:json.msg}})
        return {status:STATUS_AUTH_FAILED, msg:json.msg}
      } else dispatch({type:REQUEST_USERS, payload:{users:json._embedded.users}})

      return {status: STATUS_SUCC};
    }
  }
  
  function shouldFetchUsers(state) {
    const isFetched = state.userList && state.userList.users;
    return !isFetched;
  }
  
  export function fetchUsersIfNeeded() {
    return (dispatch, getState) => {
      console.log('shouldFetchUsers', shouldFetchUsers(getState()))
      if (shouldFetchUsers(getState())) {
        return dispatch(fetchUsers())
      }

      return {status: STATUS_SUCC};
    }
  }

  
