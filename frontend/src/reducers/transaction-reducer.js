import { ACTION_TYPE } from "../actions";

const initialTransactionState = {
    modal: {
        isOpen: false,
        isCreation: false,
        text:'',
        onConfirm:()=>{},
        onCancel:()=>{}
    },

    data: {
        id: ''
    }
};

export const transactionReducer = (state = initialTransactionState, action ) => {
    switch (action.type) {
        case ACTION_TYPE.OPEN_EDIT_TRANSACTION_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: true,
                    isCreation: false,
                }
            };

        case ACTION_TYPE.OPEN_CREATE_TRANSACTION_MODAL:
                return {
                    ...state,
                    modal: {
                        ...state.modal,
                        ...action.payload,
                        isOpen: true,
                        isCreation: true,
                    }
                };

        case ACTION_TYPE.CLOSE_TRANSACTION_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                    isOpen: false,
                    isCreation: false,
                }
            };
        case ACTION_TYPE.SET_TRANSACTION_DATA:
                return {
                    ...state,
                    ...action.payload,
                };

        case ACTION_TYPE.RESET_TRANSACTION_DATA:
                return initialTransactionState;

        default:
            return state;
    }
};
