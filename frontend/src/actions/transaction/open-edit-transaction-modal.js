import { ACTION_TYPE } from "../action-type";

export const  openEditTransactionModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_EDIT_TRANSACTION_MODAL,
    payload: modalParams,
})
