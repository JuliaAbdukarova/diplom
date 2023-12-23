import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {appReducer, userReducer, usersReducer, postReducer, postsReducer,
    accountReducer,
    accountTypeReducer,
    categoryReducer,
    transactionReducer } from './reducers'

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,

    account: accountReducer,
    accountType: accountTypeReducer,
    category: categoryReducer,
    transaction: transactionReducer

})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
