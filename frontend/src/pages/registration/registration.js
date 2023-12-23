import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
//import {server} from '../../bff'
import {ROLE} from '../../constants'
import styled  from 'styled-components'
import { useState } from 'react'
import {AuthFormError, Button, H2, Input} from '../../components'
import { Navigate } from 'react-router-dom'
import { setUser } from '../../actions'
import { selectUserRole } from '../../selectors'
import {useResetForm} from '../../hooks'
import { request } from '../../utils/request'

const regFormSchema = yup.object().shape({
    login: yup
        .string()
        .required('Заполните логин')
        .matches(/^\w+/,'Неверно заполнен логин. Допускаются только буквы и цифры.')
        .min(3,'Неверно заполнен логин. Минимальное количество символов 3')
        .max(15,'Неверно заполнен логин. Максимальное количество символов 15')
    ,
    password: yup
        .string()
        .required('Заполните пароль')
        .matches(/^[\w#%]+/,'Неверно заполнен пароль. Допускаются только буквы и цифры и символы # %')
        .min(6,'Неверно заполнен пароль. Минимальное количество символов 6')
        .max(30,'Неверно заполнен пароль. Максимальное количество символов 30'),
    passcheck: yup
        .string()
        .required('Заполните повтор пароля')
        .oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает')
})

const RegistrationContainer = ({className}) => {

    const {
            register,
            reset,
            handleSubmit,
            formState: {errors},
            } = useForm({
                defaultValues: {
                    login: '',
                    password: '',
                    passcheck: '',
                },
                resolver: yupResolver(regFormSchema),
            });

    const [serverError, setServerError] = useState(null)
    const dispatch = useDispatch()

    const roleId = useSelector(selectUserRole)

    useResetForm(reset);

    const onSubmit = ({login, password }) => {
        request('/register', 'POST', {login, password}).then(({error, user})=>{
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            dispatch(setUser(user));
            sessionStorage.setItem('userData', JSON.stringify(user))
        })
    }

    const formError =  errors?.login?.message || errors?.password?.message || errors?.passcheck?.message
    const errorMessage = formError || serverError;

    //console.log('roleId=', roleId)
    if (roleId !== ROLE.GUEST /*&& roleId !== undefined*/ ) {
        return <Navigate to = "/" />;
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder='Логин...'
                {...register('login', {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder='Пароль...'
                {...register('password', {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder='Проверка пароля...'
                {...register('passcheck', {
                    onChange: () => setServerError(null),
                })}/>
                <Button type="submit" disabled={!!formError}>Зарегистрироваться</Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    )
}


export const Registration = styled(RegistrationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`
