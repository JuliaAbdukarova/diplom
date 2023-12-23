import { ACTION_TYPE } from "../action-type";

export const  openEditAccountModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_EDIT_ACCOUNT_MODAL,
    payload: modalParams,
})
