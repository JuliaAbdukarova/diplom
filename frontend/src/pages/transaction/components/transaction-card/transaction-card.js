import {  useState } from 'react';
import styled from 'styled-components'
import { formatDate } from '../../../../utils/format-date';
import { Icon } from '../../../../components';
//import { getTransactionAsync } from "../../../../actions/transaction/get-transaction-async";
//import { useDispatch } from "react-redux";
import { request } from '../../../../utils';
//import { setTransaction, openEditTransactionModal, CLOSE_TRANSACTION_MODAL } from "../../../../actions";
//import { request } from '../../../../utils';
//import { TransactionModal } from '../transaction/transaction-modal';

const TransactionCardContainer = ({
    className,
    id,
    account,
    category,
    amount,
    transdate,
    comment,
    onTransactionRemove,
    setTransactionModalParm
}) =>  {

    const [stateAccount, setStateAccount] = useState(account?.description)
    const [stateCategory, setStateCategory] = useState(category?.description)
    const [stateAmount, setStateAmount] = useState(amount)
    const [stateTransdate, setStateTransdate] = useState(transdate)
    const [stateComment, setStateComment] = useState(comment)

    const refresh = async () => {
        //console.log("#######################");

        const { data: {transaction}} = await request(`/api/transaction/${id}`)

        setStateAccount(transaction.account?.description);
        setStateCategory(transaction.category?.description);
        setStateAmount(transaction.amount);
        setStateTransdate(transaction.transdate);
        setStateComment(transaction.comment);
    }

    const onTransactionEdit = (id, refresh ) => {
        setTransactionModalParm(id, refresh)
    }

    return (
        <div className = {className}>
            <div className = "card">
                <div className = "first" >
                    <div className='first-left-column'>
                        <div className = "pair">
                            <div>Счет</div>
                            <div className = "field account-column">{stateAccount}</div>
                        </div>
                        <div className = "pair">
                            <div>Категория</div>
                            <div className = "field category-column">{stateCategory}</div>
                        </div>
                    </div>
                    <div className = 'first-right-column'>
                        <div className = "pair">
                            <div>Сумма</div>
                            <div className = "field amount-column">{stateAmount}</div>
                        </div>
                        <div className = "pair">
                            <div>Дата</div>
                            <div className = "field transdate-column">{formatDate( stateTransdate)}</div>
                    </div>
                    </div>
                </div>
                <div className = "pair">
                    <div>Комментарий</div>
                    <div className = "field comment-column">{stateComment}</div>
                </div>
            </div>
            <Icon
                icon_id="fa-pencil-square-o"
                margin="0 0 0 10px"
                onClick={() => onTransactionEdit(id, refresh)}/>
            <Icon
                icon_id="fa-trash-o"
                margin="0 0 0 10px"
                onClick={onTransactionRemove}/>
        </div> )
}

export const TransactionCard = styled(TransactionCardContainer)`
    display: flex;
    margin-top: 10px;
    width: auto;

    & .card {
        display: flex;
        flex-direction: column;
        border: 1px solid #000;

        margin: 0 auto;
        padding: 2px;
        width: 100%;
    }

    & .first {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    & .first-left-column {
        width: 80%;
    }

    & .first-right-column {
        width: 100%;
    }

    & .pair {
        display: flex;
        margin: 2px;
        align-items: center;
        font-size: 12px;
    }

    & .field {
        height:20px;
        margin: 0 0 0px 5px;
        padding: 0 0 0 5px;
        border: 1px solid #000;
        font-size: 12px;
    }

    &  .account-column {
        width: 100%;
    }

    &  .category-column {
        width: 100%;
    }

    &  .user-column {
        width: 10%;
    }

    &  .amount-column {
        width: 50%;
    }

    &  .transdate-column {
        width: 50%;
    }

    &  .comment-column {
        width: 100%;
        height: 30px;
    }

    &  .iconurl-column {
        display: flex;
        flex-direction: row;
        width: auto;
    }
`
