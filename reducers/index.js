import { combineReducers } from 'redux'
import {
  LOGIN,
  OK_EDIT_USER,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_USERS,
  LOGOUT,
  DELETE_USER,
} from '../actions'

// function register(state = {}, action){
//   switch (action.type) {
//       case REGISTER:
//         return {...state, ...action.payload}
//       default:
//         return state
//   }
// }

function login(state = {}, action){
    switch (action.type) {
        case LOGIN:
          return {...state, ...action.payload}
        case LOGOUT:
          return {}
        default:
          return state
    }
}
// function userEdit(state = {}, action){
//     switch (action.type) {
//         case OK_EDIT_USER:
//           return {...state, [action.payload.email]: action.payload.status === STATUS_SUCC ? null : action.payload.user}
//         case LOGOUT:
//           return {}
//         default:
//           return state
//     }
// }
function userList(state = {}, action){
    switch (action.type) {
        case OK_EDIT_USER:
          return {...state, users:state.users.map(user => {
            if(user.email === action.payload.email)
              return {...user, isEdit:false, firstName:action.payload.user.firstName, lastName:action.payload.user.lastName};

            return user;
          })}
        case DELETE_USER:
          return {...state, users:state.users.filter(user => {
            return user.email !== action.payload.email
          })}
        case REQUEST_USERS:
          return {...action.payload};
        case LOGOUT:
          return {}
        default:
          return state
    }
}

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  login,
  userList,
})

export default rootReducer