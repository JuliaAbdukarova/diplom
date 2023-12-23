import { ACTION_TYPE } from "../action-type";

export const  openEditAccountTypeModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_EDIT_ACCOUNT_TYPE_MODAL,
    payload: modalParams,
})
