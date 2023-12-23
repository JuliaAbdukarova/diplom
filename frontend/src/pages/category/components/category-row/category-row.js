import { useState } from 'react';
import styled from 'styled-components'
import { Icon, Input, TableRow } from '../../../../components';
import { getCategoryAsync } from "../../../../actions/category/get-category-async";
import { useDispatch } from "react-redux";
import { setCategory, openEditCategoryModal, CLOSE_CATEGORY_MODAL } from "../../../../actions";

const CategoryRowContainer = ({
    className,
    id,
    description,
    direction,
    iconUrl,
    onCategoryRemove
}) =>  {
    const dispatch = useDispatch()
    const [stateDescription, setStateDescription] = useState(description)
    const [stateDirection, setStateDirection] = useState(direction)
    const [stateIconUrl, setStateIconUrl] = useState(iconUrl)

    const refresh = (newDescription, newDirection, newIconUrl) => {
        setStateDescription(newDescription)
        setStateDirection(newDirection)
        setStateIconUrl(newIconUrl)
    }

    const onCategoryEdit = (id) => {
        dispatch(getCategoryAsync(id))
            .then((category)=> dispatch(setCategory({data:
                                            {
                                              _id: category._id,
                                              description: category.description,
                                              direction: category.direction,
                                              iconUrl: category.iconUrl
                                            }
                                    }
                                )
                            )
                )
            .then(() => dispatch(openEditCategoryModal({
                            text: "Редактирование категории",
                            onConfirm: (newDescription, newDirection, newIconUrl ) =>
                                            refresh(newDescription, newDirection, newIconUrl) ,
                            onCancel: () => dispatch(CLOSE_CATEGORY_MODAL)})));
    }

    return (
            <div className = {className}>
                <TableRow border = {false}>
                    <div >
                        <Input className = "description-column"
                            value = {stateDescription}
                            onChange = {()=>{}}
                           />
                        <Input className = "direction-column"
                            value= {stateDirection}
                            onChange = {()=>{}}
                            />
                        <div className = "iconurl-column">
                            <Input
                                value={stateIconUrl}
                                onChange = {()=>{}} />
                            <Icon
                                icon_id="fa-pencil-square-o"
                                margin="0 0 0 10px"
                                onClick={() => onCategoryEdit(id)}/>
                            <Icon
                                icon_id="fa-trash-o"
                                margin="0 0 0 10px"
                                onClick={onCategoryRemove}/>
                        </div>
                    </div>
                </TableRow>

            </div>
           )
}

export const CategoryRow = styled(CategoryRowContainer)`
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
