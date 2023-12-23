import {ACTION_TYPE} from '../action-type'

export const setAccountType = (accountType) => ({
    type: ACTION_TYPE.SET_ACCOUNT_TYPE_DATA,
    payload: accountType,
})
