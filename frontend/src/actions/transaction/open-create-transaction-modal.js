import { ACTION_TYPE } from "../action-type";

export const  openCreateTransactionModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_CREATE_TRANSACTION_MODAL,
    payload: modalParams,
})
