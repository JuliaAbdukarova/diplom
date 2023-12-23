import { useState } from 'react';
import styled from 'styled-components'
import { Icon, Input, TableRow } from '../../../../components';
import { getAccountAsync } from "../../../../actions/account/get-account-async";
import { useDispatch } from "react-redux";
import { setAccount, openEditAccountModal, CLOSE_ACCOUNT_MODAL } from "../../../../actions";

const AccountRowContainer = ({
    className,
    id,
    description,
    type,
    iconUrl,
    onAccountRemove
}) =>  {
    const dispatch = useDispatch()
    const [stateDescription, setStateDescription] = useState(description)
    const [stateType, setStateType] = useState(type)
    const [stateIconUrl, setStateIconUrl] = useState(iconUrl)

    const refresh = (newDescription, newType, newIconUrl) => {
        setStateDescription(newDescription)
        setStateType(newType)
        setStateIconUrl(newIconUrl)
    }

    const onAccountEdit = (id) => {
        dispatch(getAccountAsync(id))
            .then((account) => dispatch(setAccount({data:
                                            {
                                              _id: account._id,
                                              description: account.description,
                                              type: account.type,
                                              iconUrl: account.iconUrl,
                                            }
                                    }
                                )
                            )
                )
            .then(() => dispatch(openEditAccountModal({
                text: "Редактирование счета",
                onConfirm: (newDescription, newType, newIconUrl ) => refresh(newDescription, newType, newIconUrl) ,
                onCancel: () => dispatch(CLOSE_ACCOUNT_MODAL)})));
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

                            <Input className = "type-column"
                                value = {stateType}
                                onChange = {()=>{}}
                           />

                            <Input className = "iconurl-column"
                                value = {stateIconUrl}
                                onChange = {()=>{}}
                           />

                            <Icon
                                icon_id="fa-pencil-square-o"
                                margin="0 0 0 10px"
                                onClick={() => onAccountEdit(id)}/>
                            <Icon
                                icon_id="fa-trash-o"
                                margin="0 0 0 10px"
                                onClick={onAccountRemove}/>
                        </div>
                    </div>
                </TableRow>

            </div>
           )
}

export const AccountRow = styled(AccountRowContainer)`
    display: flex;
    margin-top: 10px;

    &  .description-column {
        width: 250px;
    }

    &  .type-column {
        width: 120px;
    }

    &  .iconurl-column {
        display: flex;
        flex-direction: row;
        width: auto;
    }
`
