import styled from "styled-components"
import { Button, Input } from "../../../../components";
import { useSelector } from "react-redux";
import { selectCategoryModaData,
         selectCategoryModalIsOpen,
         selectCategoryModalIsCreation,
         selectCategoryModalText,
         selectCategoryModalOnConfirm,
         selectCategoryModalOnCancel,
         selectUserId}  from '../../../../selectors'
import { request } from "../../../../utils/request";
import { useEffect, useState } from "react";

const CategoryModalContainer = ({className}) => {

    const userId = useSelector(selectUserId)

    const isOpen = useSelector(selectCategoryModalIsOpen)
    const isCreation = useSelector(selectCategoryModalIsCreation)

    const text = useSelector(selectCategoryModalText) ;

    const onCancel = useSelector(selectCategoryModalOnCancel);
    const onConfirm = useSelector(selectCategoryModalOnConfirm);

    const data = useSelector(selectCategoryModaData);

    const [description, setDescription] = useState("")
    const [direction, setDirection] = useState("")
    const [iconUrl, setIconUrl] = useState("")

    useEffect(() => {
        if (isCreation)
        {
            setDescription("")
            setDirection("ДОХОД")
            setIconUrl("")
        }
        else
        {
            setDescription(data.description)
            setDirection(data.direction)
            setIconUrl(data.iconUrl)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [data, isCreation]
    );

    const onDescriptionChange = ({target}) => {
        setDescription(target.value);
    }
    const onDirectionChange = ({target}) => {
        setDirection( target.value);
    }
    const onIconUrlChange = ({target}) => {
        setIconUrl(target.value);
    }

    const onCategoryCreate = () => {
        request (`/api/category/create`, 'POST',
                    {
                        description: description,
                        direction: direction,
                        user: userId,
                        iconUrl: iconUrl
                    }
                )
            .then(() => {onConfirm()})
            .then(() => onCancel() );
    }

    const onCategorySave = () => {
        request (`/api/category/${data._id}`,
                    'PATCH',
                    {
                        description: description,
                        direction: direction,
                        iconUrl: iconUrl
                    }
                )
            .then(() => onConfirm(description, direction, iconUrl))
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
                                placeholder="Категория..."
                                onInput = {onDescriptionChange}
                                />

                <select className = "direction"
                                value = {direction}
                                placeholder="Тип..."
                                onChange = {onDirectionChange}>
                        <option key='РАСХОД' value='РАСХОД'> РАСХОД </option>
                        <option key='ДОХОД' value='ДОХОД'> ДОХОД </option>

                </select>

                <Input className = "iconUrl"
                                value={iconUrl}
                                placeholder="URL иконки..."
                                onChange={onIconUrlChange}
                                />

            </div>
            <div className="buttons">
                <Button width="120px" onClick = {isCreation ? onCategoryCreate : onCategorySave}>Да</Button>
                <Button width="120px" onClick = {onCancel}>Отмена</Button>
            </div>
        </div>
    </div>);
}

export const CategoryModal = styled(CategoryModalContainer)`
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
