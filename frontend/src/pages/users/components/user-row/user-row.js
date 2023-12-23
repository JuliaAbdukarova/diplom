import {useState} from 'react';
import styled from 'styled-components'
import {Icon} from '../../../../components';
import {TableRow}  from  '../table-row/table-row'
import { request } from '../../../../utils/request';

const UserRowContainer = ({
    className,
    id,
    login,
    registeredAt,
    roleId:userRoleId,
    roles,
    onUserRemove,
}) =>  {

    const [initialRoleId, setInitialRoleId] = useState(userRoleId)
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

    const onRoleChange = ({target}) => {
        setSelectedRoleId(Number(target.value));
    }

    const onRoleSave = (userId, newUserRoleId) => {
        request(`/users/${userId}`, 'PATCH', {roleId: newUserRoleId}).then(()=> {
            setInitialRoleId(newUserRoleId);
        });
    }

    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    return (
            <div className = {className}>
                <TableRow border = {true}>
                    <div className = "user-data">
                        <div className = "login-column">{login}</div>
                        <div className = "registered-at-column">{registeredAt}</div>
                        <div className = "role-column">
                            <select value={selectedRoleId} onChange={onRoleChange}>
                                {roles.map(({id: roleId, name:roleName})=>(
                                    <option key={roleId} value={roleId}>{roleName}</option>
                                ))}
                            </select>
                                <Icon className = "user-data"
                                    icon_id="fa-floppy-o"
                                    margin="0 0 0 10px"
                                    disabled={isSaveButtonDisabled}
                                    onClick={()=>onRoleSave(id, selectedRoleId)}/>
                        </div>
                    </div>
                </TableRow>
                    <Icon className = "user-data"
                        icon_id="fa-trash-o"
                        margin="0 0 0 10px"
                        onClick={onUserRemove}/>
                </div>)
}

export const UserRow = styled(UserRowContainer)`
    display: flex;
    margin-top: 10px;

    & select {
        font-size: 16px;
        padding: 0 5px;
    }
`
