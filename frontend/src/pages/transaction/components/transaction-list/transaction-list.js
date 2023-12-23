import styled from 'styled-components'
import { TransactionCard } from '../transaction-card/transaction-card'
import { Search } from '../../../../components'

const TransactionListContainer = ({className,
    searchPhrase,
    onSearch,
    transactions,
    onTransactionRemove,
    setTransactionModalParm
 }) => {

    return (
        <div className={className}>

            <div className="search">
                <div className="caption">ТРАНЗАКЦИЯ</div>
                <Search searchPhrase={searchPhrase} onChange={onSearch}/>
            </div>

            {
                transactions?.length > 0 ?
                    <div>
                            {transactions.map(({_id, account, category, amount, transdate, comment })=>(
                                <TransactionCard
                                    key={_id}
                                    id={_id}
                                    account={account}
                                    category={category}
                                    amount={amount}
                                    transdate={transdate}
                                    comment={comment}
                                    onTransactionRemove={() => onTransactionRemove(_id)}
                                    setTransactionModalParm= {setTransactionModalParm}
                                    //setTransactionModalParm= {() => setTransactionModalParm(_id)}
                                />
                            ))}
                    </div>
                    :
                    <div className="no-transactions-found">
                        Типы счета не найдены.
                    </div>
            }
        </div>
    );
}

export const TransactionList = styled (TransactionListContainer)`
    align-items: center;
    margin: 0 auto;
    width: 900px;
    font-size: 18px;

    & .search {
        display: flex;
        align-items: center;
        margin: 0 auto;
        width: 900px;
        font-size: 18px;
    }

    & .caption {
        text-align: center;
    }

    & .transactions-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-transactions-found {
        font-size: 18px;
        text-align: center;
    }

    &  .description-column {
        width: 250px;
    }

    &  .type-column {
        width: 140px;
    }

    &  .iconurl-column {
        width: auto;
    }
}
`
