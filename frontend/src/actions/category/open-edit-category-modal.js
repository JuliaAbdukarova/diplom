import { ACTION_TYPE } from "../action-type";

export const  openEditCategoryModal  = (modalParams) => ({
    type: ACTION_TYPE.OPEN_EDIT_CATEGORY_MODAL,
    payload: modalParams,
})
