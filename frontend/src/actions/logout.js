import { request } from '../utils/request';
import {ACTION_TYPE} from './action-type'
//import {server} from '../bff'

export const logout = (/*session*/) => {
    request('/logout','POST', null)

    return {
        type: ACTION_TYPE.LOGOUT,
    }
}
