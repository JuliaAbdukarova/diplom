import { useEffect, useMemo, useState } from "react";
import styled from "styled-components"
import { PAGINATION_LIMIT } from "../../constants";
import { debounce, request } from '../../utils'
import { useDispatch } from "react-redux";
import { CLOSE_ACCOUNT_TYPE_MODAL, CLOSE_MODAL, openCreateAccountTypeModal, openModal, removeAccountTypeAsync }
            from "../../actions";
import { AccountTypeList } from "./components";
import { Loader, Pagination, useParentComponent } from "../../components";

import { AccountTypeModal } from "./components";
import { Icon } from "../../components";

const AccountTypeContainer = ({className}) => {
    const [accountTypes, setAccountTypes] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [shouldUpdateAccountTypeList, setShouldUpdateAccountTypeList] = useState(false);
    const { loaderRef, decrementLoadingCount, setLoadingCount} = useParentComponent();
    const dispatch = useDispatch()

    useEffect(()=>{
        setLoadingCount(1)
        request(`/api/accounttype?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`)
        .then(({data: {accountTypes, lastPage}})=>{
            setAccountTypes(accountTypes);
            setLastPage(lastPage);
            decrementLoadingCount();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, shouldSearch, shouldUpdateAccountTypeList]);

    const startDelayedSearch = useMemo (()=>debounce(setShouldSearch, 2000),[])

    const onSearch = ({target}) => {
        setLoadingCount(1)
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
        decrementLoadingCount();
    }

    const onCreate = () => {
        dispatch(openCreateAccountTypeModal({
            text: "Создание типа счета",
            onConfirm: () => { setShouldUpdateAccountTypeList(!shouldUpdateAccountTypeList) } ,
            onCancel: () => dispatch(CLOSE_ACCOUNT_TYPE_MODAL)}));
    }

    const onAccountTypeRemove = (id) => {
        dispatch(openModal({
            text: "Удалить тип счета?",
            onConfirm: () => {
                    dispatch(removeAccountTypeAsync(id))
                        .then(setShouldUpdateAccountTypeList(!shouldUpdateAccountTypeList))
                    dispatch(CLOSE_MODAL);
                },
            onCancel: ()=> dispatch(CLOSE_MODAL),
        }));
    }

    return (
        <>
            { <Loader count={1} ref={loaderRef} /> }
            <Icon icon_id="fa-plus-square-o" margin="0 0 0 10px" onClick={() => onCreate() }/>

            <AccountTypeList searchPhrase = {searchPhrase}
                             onSearch = {onSearch}
                             accountTypes = {accountTypes}
                             onAccountTypeRemove = {onAccountTypeRemove} />

            <AccountTypeModal/>
            {lastPage > 1
                && accountTypes.length > 0
                && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
        </>
    );
}

export const AccountType = styled (AccountTypeContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .account-types-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-accoun-types-found {
        font-size: 18px;
        text-align: center;
    }
}
`
