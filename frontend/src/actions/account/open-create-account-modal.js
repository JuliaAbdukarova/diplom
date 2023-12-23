import { ACTION_TYPE } from "../action-type";

export const  openCreateAccountModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_CREATE_ACCOUNT_MODAL,
    payload: modalParams,
})
