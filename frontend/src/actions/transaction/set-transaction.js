import {ACTION_TYPE} from '../action-type'

export const setTransaction = (transaction) => ({
    type: ACTION_TYPE.SET_TRANSACTION_DATA,
    payload: transaction,
})
