import { ACTION_TYPE } from '../actions';
import {ROLE} from '../constants'

const inistialUserState = {
    id: null,
    login: null,
    roleId: ROLE.GUEST,
    session: null,
};

export const userReducer = (state=inistialUserState, action ) => {
    switch (action.type) {
        case ACTION_TYPE.SET_USER:
            //console.log('ACTION_TYPE.SET_USER =', action.payload)
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.LOGOUT:
            return inistialUserState;

        default:
            return state;
    }
};
