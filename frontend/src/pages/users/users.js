import {PrivateContent, H2} from '../../components';
import {useEffect, useState} from 'react';
import {UserRow, TableRow} from './components';
import {styled} from 'styled-components';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils'
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { request } from '../../utils/request';

const UsersContainer = ({className}) => {
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [shouldUpdateuserList, setShouldUpdateuserList] = useState(false);

    //const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole);

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole )) {
            return;
        }

        Promise.all([
            request('/users', 'GET'),
            request('/users/roles', 'GET'),
        ]).then(([usersRes, rolesRes])=>{
            if(usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            }

            setUsers(usersRes.data);
            setRoles(rolesRes.data);
        });

    },[/*requestServer,*/ shouldUpdateuserList, userRole])

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole )) {
            return;
        }

        request(`/users/${userId}`, 'DELETE').then(()=> {
            setShouldUpdateuserList(!shouldUpdateuserList);
        });
    }

    return (
        <PrivateContent access={[ROLE.ADMIN]} serverError = {errorMessage}>
            <div className = {className}>
                <H2>Пользователи</H2>
                <div>
                    <TableRow>
                        <div className = "login-column" >Логин</div>
                        <div className = "registered-at-column" >Дата регистрации</div>
                        <div className = "role-column">Роль</div>
                    </TableRow>
                        {users.map(({id, login, registeredAt, roleId})=>(
                            <UserRow
                                key={id}
                                id={id}
                                login={login}
                                registeredAt={registeredAt}
                                roleId={roleId}
                                roles={roles.filter(({id: roleId})=> roleId !== ROLE.GUEST)}
                                onUserRemove={()=>onUserRemove(id)}
                            />
                        ))}
                </div>
            </div>
        </PrivateContent>
    );
}

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;
`
