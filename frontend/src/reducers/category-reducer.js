import { ACTION_TYPE } from "../actions";

const initialCategoryState = {
    modal: {
        isOpen: false,
        isCreation: false,
        text:'',
        onConfirm:()=>{},
        onCancel:()=>{}
    },

    data: {
        _id: '',
        description: '',
        direction: '',
        iconUrl:''
    }
};

export const categoryReducer = (state = initialCategoryState, action ) => {
    switch (action.type) {
        case ACTION_TYPE.OPEN_EDIT_CATEGORY_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: true,
                    isCreation: false,
                }
            };

        case ACTION_TYPE.OPEN_CREATE_CATEGORY_MODAL:
                return {
                    ...state,
                    modal: {
                        ...state.modal,
                        ...action.payload,
                        isOpen: true,
                        isCreation: true,
                    }
                };

        case ACTION_TYPE.CLOSE_CATEGORY_MODAL:
            //console.log("REDUCER = CLOSE_CATEGORY_MODAL");
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: false,
                    isCreation: false,
                }
            };
        case ACTION_TYPE.SET_CATEGORY_DATA:
                return {
                    ...state,
                    ...action.payload,
                };

        case ACTION_TYPE.RESET_CATEGORY_DATA:
                return initialCategoryState;

        default:
            return state;
    }
};
