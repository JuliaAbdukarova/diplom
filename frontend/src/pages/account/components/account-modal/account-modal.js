import styled from "styled-components"
import { Button, Input } from "../../../../components";
import { useSelector } from "react-redux";
import { selectAccountModalData,
         selectAccountModalIsOpen,
         selectAccountModalIsCreation,
         selectAccountModalText,
         selectAccountModalOnConfirm,
         selectAccountModalOnCancel,
         selectUserId}  from '../../../../selectors'
import { request } from "../../../../utils/request";
import { useEffect, useState } from "react";

const AccountModalContainer = ({className}) => {

    const userId = useSelector(selectUserId)

    const isOpen = useSelector(selectAccountModalIsOpen)
    const isCreation = useSelector(selectAccountModalIsCreation)

    const text = useSelector(selectAccountModalText) ;

    const onCancel = useSelector(selectAccountModalOnCancel);
    const onConfirm = useSelector(selectAccountModalOnConfirm);

    const data = useSelector(selectAccountModalData);

    const [description, setDescription] = useState("")
    const [type, setType] = useState(null)
    const [iconUrl, setIconUrl] = useState("")

    const [accountTypes, setAccountTypes] = useState([])

    const accountTypeTransform = (id) => {
        const ret = accountTypes.filter(accountType => accountType._id === id)[0].description
        return ret;
    }

    useEffect(() => {

        request(`/api/accounttype`)
            .then(({data: {accountTypes}})=>{
                setAccountTypes(accountTypes);
            }).then( () => {
                    if (isCreation)
                    {
                        setDescription("")
                        setType(null)
                        setIconUrl("")
                    }
                    else
                    {
                        setDescription(data.description)
                        setType(data.type)
                        setIconUrl(data.iconUrl)
                    }
                })

    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [data, isCreation]
    );

    const onDescriptionChange = ({target}) => {
        setDescription(target.value);
    }

    const onTypeChange = ({target}) => {
        setType(target.value);
    }

    const onIconUrlChange = ({target}) => {
        setIconUrl(target.value);
    }

    const onAccountCreate = () => {
        //console.log('userId = ', userId);
        request (`/api/account/create`, 'POST',
                    {
                        description: description,
                        type: type,
                        iconUrl: iconUrl,
                        user: userId
                    }
                )
            .then(() => {onConfirm()})
            .then(() => onCancel() );
    }

    const onAccountSave = () => {
        request (`/api/account/${data._id}`,
                    'PATCH',
                    {
                        description: description,
                        type: type,
                        iconUrl: iconUrl
                    }
                )
            .then(() => onConfirm(description, accountTypeTransform(type), iconUrl))
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
                                placeholder="Счет..."
                                onInput = {onDescriptionChange}
                                />

                <select className = "type"
                                value = {type}
                                placeholder="Тип..."
                                onChange = {onTypeChange}>
                                {
                                    accountTypes.map( ({_id, description}) => (
                                              <option key={_id} value={_id}>{description}</option>
                                            )
                                        )
                                }
                </select>

                <Input className = "iconUrl"
                                value={iconUrl}
                                placeholder="URL иконки..."
                                onChange={onIconUrlChange}
                                />
            </div>
            <div className="buttons">
                <Button width="120px" onClick = {isCreation ? onAccountCreate : onAccountSave}>Да</Button>
                <Button width="120px" onClick = {onCancel}>Отмена</Button>
            </div>
        </div>
    </div>);
}

export const AccountModal = styled(AccountModalContainer)`
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

    & .type {
        width: 100% height:40px;
        margin: 0 0 10px;
        padding: 10px;
        border: 1px solid #000;
        font-size: 18px;
    }
`
