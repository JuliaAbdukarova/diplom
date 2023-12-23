import styled from "styled-components";
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
//import { useServerRequest } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";

const SpecialPanelContainer = ({className, id, publishedAt, editButton}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userRole = useSelector(selectUserRole);

    const onPostRemove = (id) => {
        dispatch(openModal({
            text: "Удалить статью?",
            onConfirm: () => {
                    dispatch(removePostAsync(id))
                        .then(()=> {navigate('/')})
                    dispatch(CLOSE_MODAL);
                },
            onCancel: ()=> dispatch(CLOSE_MODAL),

        }));
    }

    const isAdmin = checkAccess([ROLE.ADMIN], userRole);

    return (<div className={className}>
                    <div className="published-at">
                        {publishedAt && <Icon
                            inactive={true}
                            icon_id="fa-calendar-o"
                            margin="0 6px 0 0"
                            size="18px"
                        />}
                        {publishedAt}
                    </div>
                    {isAdmin && <div className="buttons">
                        {editButton}
                        {publishedAt && <Icon icon_id="fa-trash-o"  margin="0 0 0 6px" size="21px" onClick={()=>onPostRemove(id)}/>}
                    </div> }
                </div>);
}



export const SpecialPanel = styled (SpecialPanelContainer)`
    display: flex;
    justify-content: space-between;
    margin: ${({margin})=>margin};

    & .buttons {
        display: flex;
    }

    & i {
        top: -1px;
        posision: relative;
    }

    & .published-at{
        display: flex;
        font-size: 18px;
    }

`
