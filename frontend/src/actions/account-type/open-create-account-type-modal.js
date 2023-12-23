import { ACTION_TYPE } from "../action-type";

export const  openCreateAccountTypeModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_CREATE_ACCOUNT_TYPE_MODAL,
    payload: modalParams,
})
