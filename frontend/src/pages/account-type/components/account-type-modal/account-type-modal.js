import styled from "styled-components"
import { Button, Input } from "../../../../components";
import { useSelector } from "react-redux";
import { selectAccountTypeModalData,
         selectAccountTypeModalIsOpen,
         selectAccountTypeModalIsCreation,
         selectAccountTypeModalText,
         selectAccountTypeModalOnConfirm,
         selectAccountTypeModalOnCancel,
         selectUserId}  from '../../../../selectors'
import { request } from "../../../../utils/request";
import { useEffect, useState } from "react";

const AccountTypeModalContainer = ({className}) => {

    const userId = useSelector(selectUserId)

    const isOpen = useSelector(selectAccountTypeModalIsOpen)
    const isCreation = useSelector(selectAccountTypeModalIsCreation)

    const text = useSelector(selectAccountTypeModalText) ;

    const onCancel = useSelector(selectAccountTypeModalOnCancel);
    const onConfirm = useSelector(selectAccountTypeModalOnConfirm);

    const data = useSelector(selectAccountTypeModalData);

    const [description, setDescription] = useState("")

    //console.log("isCreation = ", isCreation);

    useEffect(() => {
        //console.log("useEffect isCreation = ", isCreation);
        if (isCreation)
        {
            setDescription("")
        }
        else
        {
            setDescription(data.description)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [data, isCreation]
    );

    const onDescriptionChange = ({target}) => {
        setDescription(target.value);
    }

    const onAccountTypeyCreate = () => {
        //console.log('userId = ', userId);
        request (`/api/accounttype/create`, 'POST',
                    {
                        description: description,
                        user: userId
                    }
                )
            .then(() => {onConfirm()})
            .then(() => onCancel() );
    }

    const onAccountTypeSave = () => {
        request (`/api/accounttype/${data._id}`,
                    'PATCH',
                    {
                        description: description
                    }
                )
            .then(() => onConfirm(description))
            .then(() => onCancel() );
    }

    if (!isOpen) {
        return null;
    }

    return (<div className = {className}>
        <div className = "overlay"> </div>
        <div className = "box">
            <h3>{text}</h3>
            <div className = "inputs">
                <Input className = "description"
                        value = {description}
                        placeholder="Тип счета..."
                        onInput = {onDescriptionChange}
                        />
            </div>
            <div className="buttons">
                <Button width="120px" onClick = {isCreation ? onAccountTypeyCreate : onAccountTypeSave}>Да</Button>
                <Button width="120px" onClick = {onCancel}>Отмена</Button>
            </div>
        </div>
    </div>);
}

export const AccountTypeModal = styled(AccountTypeModalContainer)`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 20;

    & .overlay {
        position: absolute;
        background-color: rgba(0,0,0,0.7);
        width: 100%;
        height: 100%;
    }

    & .box {
        position: relative;
        width: 400px;
        margin: 0 auto;
        padding: 0 20px 20px;
        text-align: center;
        background-color: #fff;
        border: 2px solid #000;
        top: 35%;
        transform: translate(0,-50%)
        z-index: 30;
    }

    & .buttons {
        display: flex;
        justify-content: center;
    }

    & .buttons button {
        margin: 0 5px;
    }

    & .inputs {
        display: flex;
        flex-direction: column;
    }

    & .direction {
        width: 100% height:40px;
        margin: 0 0 10px;
        padding: 10px;
        border: 1px solid #000;
        font-size: 18px;
    }
`
