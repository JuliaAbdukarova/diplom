// External dependencies
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// Internal dependencies
import { Icon, Button } from '../../../../components';
import { ROLE } from '../../../../constants';
import { selectUserRole, selectUserLogin } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
`

const StyledBackIcon = styled.div`
    &:hover {
        cursor: pointer;
    }
`

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`

const ControlPanelContainer = ({className}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);

    const onLogout = () => {
        dispatch(logout())
        sessionStorage.removeItem('userData');
        navigate('/login')
    }

    const isAdmin = checkAccess([ROLE.ADMIN], roleId)

    return (

        <div className={className}>
            { (roleId === undefined || roleId === ROLE.GUEST)  ?
                        (   <Button> <Link to="/login">Войти</Link> </Button> )
                        :
                        (
                            <RightAligned>
                                <UserName> {login} </UserName>
                                    <Icon
                                        icon_id="fa-sign-out"
                                        margin="0 0 0 10px"
                                        onClick={ onLogout}
                                    />
                            </RightAligned>
                        ) }
            <RightAligned>
                <Icon icon_id="fa-backward" margin="10px 0 0 0"  onClick={()=>navigate(-1)} />
                <Link to="/account"><Icon icon_id="fa fa-credit-card-alt" margin="10px 0 0 16px" /></Link>
                <Link to="/accounttype"><Icon icon_id="fa fa-indent" margin="10px 0 0 16px" /></Link>
                <Link to="/category"><Icon icon_id="fa fa-align-justify" margin="10px 0 0 16px"/></Link>
                <Link to="/transaction"><Icon icon_id="fa fa-money" margin="10px 0 0 16px" /></Link>
                {isAdmin && (
                    <>
                        <Link to="/users"><Icon icon_id="fa-users" margin="10px 0 0 16px"/></Link>
                    </>
                )}
            </RightAligned>
        </div>
    );
}

export const ControlPanel = styled(ControlPanelContainer)``;
