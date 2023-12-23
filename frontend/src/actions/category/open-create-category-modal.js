import { ACTION_TYPE } from "../action-type";

export const  openCreateCategoryModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_CREATE_CATEGORY_MODAL,
    payload: modalParams,
})
