import { useState } from 'react';
import styled from 'styled-components'
import { Icon, Input, TableRow } from '../../../../components';
import { getAccountTypeAsync } from "../../../../actions/account-type/get-account-type-async";
import { useDispatch } from "react-redux";
import { setAccountType, openEditAccountTypeModal, CLOSE_ACCOUNT_TYPE_MODAL } from "../../../../actions";

const AccountTypeRowContainer = ({
    className,
    id,
    description,
    onAccountTypeRemove
}) =>  {
    const dispatch = useDispatch()
    const [stateDescription, setStateDescription] = useState(description)


    const refresh = (newDescription, newDirection, newIconUrl) => {
        setStateDescription(newDescription)

    }

    const onAccountTypeEdit = (id) => {
        dispatch(getAccountTypeAsync(id))
            .then((accountType)=> dispatch(setAccountType({data:
                                            {
                                              _id: accountType._id,
                                              description: accountType.description,

                                            }
                                    }
                                )
                            )
                )
            .then(() => dispatch(openEditAccountTypeModal({
                text: "Редактирование типа счета",
                onConfirm: (newDescription ) => refresh(newDescription) ,
                onCancel: () => dispatch(CLOSE_ACCOUNT_TYPE_MODAL)})));
    }

    return (
            <div className = {className}>
                <TableRow border = {false}>
                    <div >
                        <div className = "iconurl-column">
                            <Input className = "description-column"
                            value = {stateDescription}
                            onChange = {()=>{}}
                           />
                            <Icon
                                icon_id="fa-pencil-square-o"
                                margin="0 0 0 10px"
                                onClick={() => onAccountTypeEdit(id)}/>
                            <Icon
                                icon_id="fa-trash-o"
                                margin="0 0 0 10px"
                                onClick={onAccountTypeRemove}/>
                        </div>
                    </div>
                </TableRow>

            </div>
           )
}

export const AccountTypeRow = styled(AccountTypeRowContainer)`
    display: flex;
    margin-top: 10px;

    &  .description-column {
        width: 250px;
    }

    &  .direction-column {
        width: 120px;
    }

    &  .iconurl-column {
        display: flex;
        flex-direction: row;
        width: auto;
    }
`
