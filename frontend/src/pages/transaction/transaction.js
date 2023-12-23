import { useEffect, useMemo, useState } from "react";
import styled from "styled-components"
import { PAGINATION_LIMIT } from "../../constants";
import { debounce, request } from '../../utils'
import { useDispatch } from "react-redux";
import { CLOSE_TRANSACTION_MODAL, CLOSE_MODAL, openCreateTransactionModal, openModal, removeTransactionAsync, openEditTransactionModal }
            from "../../actions";
import { TransactionList } from "./components";
import { Loader, Pagination, useParentComponent } from "../../components";

import { TransactionModal } from "./components";
import { Icon } from "../../components";
//import { getTransactionAsync } from "../../actions/transaction/get-transaction-async";

const TransactionContainer = ({className}) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [shouldUpdateTransactionList, setShouldUpdateTransactionList] = useState(false);
    const { loaderRef, decrementLoadingCount, setLoadingCount} = useParentComponent();

    const [transaction, setTransaction] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [categories, setCategories] = useState(null);

    const dispatch = useDispatch()

    const  fetchData = async () => {

        if (!(accounts && categories) )
        {
            await request('/api/account?noLimit=true').then( ({data: {accounts}}) => setAccounts(accounts))
            await request('/api/category?noLimit=true').then(({data: {categories}}) => setCategories(categories))
        }

    }

    useEffect(()=>{
        setLoadingCount(1)
        fetchData();

        request(`/api/transaction?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`)
        .then(({data: {transactions, lastPage}})=>{
            setTransactions(transactions);
            setLastPage(lastPage);
            decrementLoadingCount();
        });


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, shouldSearch, shouldUpdateTransactionList]);

    const startDelayedSearch = useMemo (()=>debounce(setShouldSearch, 2000),[])

    const onSearch = ({target}) => {
        setLoadingCount(1)
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
        decrementLoadingCount();
    }

    const onCreate = () => {
        dispatch(openCreateTransactionModal({
            text: "Создание транзакции",
            onConfirm: () => { setShouldUpdateTransactionList(!shouldUpdateTransactionList) } ,
            onCancel: () => dispatch(CLOSE_TRANSACTION_MODAL)}));
    }

    const onTransactionRemove = (id) => {
        dispatch(openModal({
            text: "Удалить транзакцию?",
            onConfirm: () => {
                    dispatch(removeTransactionAsync(id))
                        .then(setShouldUpdateTransactionList(!shouldUpdateTransactionList))
                    dispatch(CLOSE_MODAL);
                },
            onCancel: ()=> dispatch(CLOSE_MODAL),
        }));
    }

    async function fetchDataAndOpenMopdalWindow(id, callbackRefresh) {
        try {
            await request(`/api/transaction/${id}`).then((transaction) => setTransaction(transaction))
            dispatch(openEditTransactionModal({
                    text: "Редактирование транзакции",
                    onConfirm: () => callbackRefresh(),
                    onCancel:  () => dispatch(CLOSE_TRANSACTION_MODAL) } ) ) ;
        } catch (error) {
            console.error(error);
        }
    }

    const  setTransactionModalParm = (id, callbackRefresh) => {
        //console.log("PARENT = ", callbackRefresh);
        fetchDataAndOpenMopdalWindow(id, callbackRefresh);
    }

    return (
        <>
            { <Loader count={1} ref={loaderRef} /> }
            <Icon icon_id="fa-plus-square-o" margin="0 0 0 10px" onClick={() => onCreate() }/>

            <TransactionList searchPhrase = {searchPhrase}
                        onSearch = {onSearch}
                        transactions = {transactions}
                        onTransactionRemove = {onTransactionRemove}
                        setTransactionModalParm = {setTransactionModalParm} />

            <TransactionModal
                transaction = {transaction}
                accounts = {accounts}
                categories = {categories}
            />

            {lastPage > 1
                && transactions.length > 0
                && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
        </>
    );
}

export const Transaction = styled (TransactionContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .transactions-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-transactions-found {
        font-size: 18px;
        text-align: center;
    }
}
`
