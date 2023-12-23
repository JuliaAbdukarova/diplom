import { ACTION_TYPE } from "../actions";

const initialAccountTypeState = {
    modal: {
        isOpen: false,
        isCreation: false,
        text:'',
        onConfirm:()=>{},
        onCancel:()=>{}
    },

    data: {
        _id: '',
        description: ''
    }
};

export const accountTypeReducer = (state = initialAccountTypeState, action ) => {
    switch (action.type) {
        case ACTION_TYPE.OPEN_EDIT_ACCOUNT_TYPE_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: true,
                    isCreation: false,
                }
            };

        case ACTION_TYPE.OPEN_CREATE_ACCOUNT_TYPE_MODAL:
                return {
                    ...state,
                    modal: {
                        ...state.modal,
                        ...action.payload,
                        isOpen: true,
                        isCreation: true,
                    }
                };

        case ACTION_TYPE.CLOSE_ACCOUNT_TYPE_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: false,
                    isCreation: false,
                }
            };
        case ACTION_TYPE.SET_ACCOUNT_TYPE_DATA:
                return {
                    ...state,
                    ...action.payload,
                };

        case ACTION_TYPE.RESET_ACCOUNT_TYPE_DATA:
                return initialAccountTypeState;

        default:
            return state;
    }
};
