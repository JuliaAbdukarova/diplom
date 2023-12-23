import { useEffect, useMemo, useState } from "react";
import styled from "styled-components"
import { PAGINATION_LIMIT } from "../../constants";
import { debounce, request } from '../../utils'
import { useDispatch } from "react-redux";
import { CLOSE_ACCOUNT_MODAL, CLOSE_MODAL, openCreateAccountModal, openModal, removeAccountAsync }
            from "../../actions";
import { AccountList } from "./components";
import { Loader, Pagination, useParentComponent } from "../../components";

import { AccountModal } from "./components";
import { Icon } from "../../components";

const AccountContainer = ({className}) => {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [shouldUpdateAccountList, setShouldUpdateAccountList] = useState(false);
    const { loaderRef, decrementLoadingCount, setLoadingCount} = useParentComponent();

    const dispatch = useDispatch()

    useEffect(()=>{
        setLoadingCount(1)
        request(`/api/account?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`)
        .then(({data: {accounts, lastPage}})=>{
            setAccounts(accounts);
            setLastPage(lastPage);
            decrementLoadingCount();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, shouldSearch, shouldUpdateAccountList]);

    const startDelayedSearch = useMemo (()=>debounce(setShouldSearch, 2000),[])

    const onSearch = ({target}) => {
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
    }

    const onCreate = () => {
        dispatch(openCreateAccountModal({
            text: "Создание счета",
            onConfirm: () => { setShouldUpdateAccountList(!shouldUpdateAccountList) } ,
            onCancel: () => dispatch(CLOSE_ACCOUNT_MODAL)}));
    }

    const onAccountRemove = (id) => {
        dispatch(openModal({
            text: "Удалить счет?",
            onConfirm: () => {
                    dispatch(removeAccountAsync(id))
                        .then(setShouldUpdateAccountList(!shouldUpdateAccountList))
                    dispatch(CLOSE_MODAL);
                },
            onCancel: ()=> dispatch(CLOSE_MODAL),
        }));
    }

    return (
        <>
          { <Loader count={1} ref={loaderRef} /> }
            <Icon icon_id="fa-plus-square-o" margin="0 0 0 10px" onClick={() => onCreate() }/>

            <AccountList searchPhrase = {searchPhrase}
                        onSearch = {onSearch}
                        accounts = {accounts}
                        onAccountRemove = {onAccountRemove} />

            <AccountModal/>
            {lastPage > 1
                && accounts.length > 0
                && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
        </>
    );
}

export const Account = styled (AccountContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .accounts-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-accounts-found {
        font-size: 18px;
        text-align: center;
    }
}
`
