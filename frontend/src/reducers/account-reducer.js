import { ACTION_TYPE } from "../actions";

const initialAccountState = {
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
        type: '',
        user: '',
        iconUrl: ''
    }
};

export const accountReducer = (state = initialAccountState, action ) => {
    switch (action.type) {
        case ACTION_TYPE.OPEN_EDIT_ACCOUNT_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: true,
                    isCreation: false,
                }
            };

        case ACTION_TYPE.OPEN_CREATE_ACCOUNT_MODAL:
                return {
                    ...state,
                    modal: {
                        ...state.modal,
                        ...action.payload,
                        isOpen: true,
                        isCreation: true,
                    }
                };

        case ACTION_TYPE.CLOSE_ACCOUNT_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: false,
                    isCreation: false,
                }
            };
        case ACTION_TYPE.SET_ACCOUNT_DATA:
                return {
                    ...state,
                    ...action.payload,
                };

        case ACTION_TYPE.RESET_ACCOUNT_DATA:
                return initialAccountState;

        default:
            return state;
    }
};
