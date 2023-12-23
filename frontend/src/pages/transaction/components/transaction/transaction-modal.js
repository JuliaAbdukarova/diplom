import styled from "styled-components"
import { Button, Input } from "../../../../components";
import { useSelector } from "react-redux";
import { selectTransactionModalIsOpen,
         selectTransactionModalIsCreation,
         selectTransactionModalText,
         selectTransactionModalOnConfirm,
         selectTransactionModalOnCancel }  from '../../../../selectors'
import { request } from "../../../../utils/request";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/format-date";


const TransactionModalContainer = ({className, transaction, accounts, categories }) => {
    const isOpen = useSelector(selectTransactionModalIsOpen)
    const isCreation = useSelector(selectTransactionModalIsCreation)
    const text = useSelector(selectTransactionModalText) ;
    const onCancel = useSelector(selectTransactionModalOnCancel);
    const onConfirm = useSelector(selectTransactionModalOnConfirm);

    const [account, setAccount] = useState(null)
    const [category, setCategory] = useState(null)
    const [amount, setAmount] = useState(0)
    const [transdate, setTransDate] = useState('')
    const [comment, setComment] = useState('')

    useEffect(() => {

        if (isOpen && !isCreation) {
            setAccount(transaction?.data?.transaction?.account?._id)
            setCategory(transaction?.data?.transaction?.category?._id)
            setAmount(transaction.data.transaction.amount)
            setTransDate(formatDate(transaction.data.transaction.transdate))
            setComment(transaction.data.transaction.comment)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [transaction]
    );

    const onAccountChange = ({target}) => {
        setAccount(target.value);
    }

    const onCategoryChange = ({target}) => {
        setCategory(target.value);
    }

    const onAmountChange = ({target}) => {
        setAmount(target.value);
    }

    const onTransDateChange = ({target}) => {
        setTransDate(target.value);
    }

    const onCommentChange = ({target}) => {
        setComment(target.value);
    }

    const onTransactionCreate = () => {
        request (`/api/transaction/create`,
                'POST',
                {
                    account: account,
                    category: category,
                    amount: amount,
                    transdate: transdate,
                    comment: comment
                }
            )
            .then(() => onConfirm(account, category, amount, transdate, comment))
            .then(() => onCancel() );
    }

    const onTransactionSave = () => {
        request (`/api/transaction/${transaction?.data?.transaction._id}`,
                'PATCH',
                {
                    account: account,
                    category: category,
                    amount: amount,
                    transdate: transdate,
                    comment: comment,
                }
            )
            .then(() => onConfirm(account, category, amount, transdate, comment))
            .then(() => onCancel() );
    }

    if (!isOpen) {
        return null;
    }

    return (<div className = {className}>
        <div className = "overlay"> </div>
        <div className = "box">
            <h3>{text}</h3>
            <div className = "inputs">
            <select className = "select"
                value = {account?account:''}
                placeholder="Счет..."
                onChange = {onAccountChange}>
                {
                    accounts.map( ({_id, description}) => (
                                <option key={_id} value={_id}>{description}</option>
                            )
                        )
                }
            </select>

            <select className = "select"
                value = {category?category:''}
                placeholder="Категория..."
                onChange = {onCategoryChange}>
                {
                    categories.map( ({_id, description}) => (
                                <option key={_id} value={_id}>{description}</option>
                            )
                        )
                }
            </select>

            <Input className = "amount"
                value={amount?amount:''}
                placeholder="Сумма..."
                onChange={onAmountChange}
                />

            <Input className = "transdate"
                value={transdate ? transdate:''}
                placeholder="Дата..."
                onChange={onTransDateChange}
                />
            <Input className = "comment"
                value={comment?comment:''}
                placeholder="Комментарий..."
                onChange={onCommentChange}
                />

            </div>
            <div className="buttons">
                <Button width="120px" onClick = {isCreation ? onTransactionCreate : onTransactionSave}>Да</Button>
                <Button width="120px" onClick = {onCancel}>Отмена</Button>
            </div>
        </div>
    </div>);
}

export const TransactionModal = styled(TransactionModalContainer)`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 20;

    & .overlay {
        position: absolute;
        background-color: rgba(0,0,0,0.7);
        width: 100%;
        height: 100%;
    }

    & .box {
        position: relative;
        width: 400px;
        margin: 0 auto;
        padding: 0 20px 20px;
        text-align: center;
        background-color: #fff;
        border: 2px solid #000;
        top: 35%;
        transform: translate(0,-50%)
        z-index: 30;
    }

    & .buttons {
        display: flex;
        justify-content: center;
    }

    & .buttons button {
        margin: 0 5px;
    }

    & .inputs {
        display: flex;
        flex-direction: column;
    }

    & .select {
        width: 100% height:40px;
        margin: 0 0 10px;
        padding: 10px;
        border: 1px solid #000;
        font-size: 18px;
    }
`
/*
<DatePicker className = "transdate"
                selected={new Date("2015-11-10T11:33:41.075Z")}
                onChange={(date) => onTransDateChange(date)} />

*/
