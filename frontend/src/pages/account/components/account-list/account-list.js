import styled from 'styled-components'
import { AccountRow } from '../account-row/account-row'
import { TableRow, Search } from '../../../../components'

const AccountListContainer = ({className,
    searchPhrase,
    onSearch,
    accounts,
    onAccountRemove
 }) => {

    return (
        <div className={className}>

            <div className="search">
                <div className="caption">Счет</div>
                <Search searchPhrase={searchPhrase} onChange={onSearch}/>
                {
                accounts?.length > 0 ?
                    <div>
                        <TableRow>
                            <div className = "description-column" >Название</div>
                            <div className = "type-column" >Тип счета</div>
                            <div className = "iconurl-column" >Иконка</div>
                        </TableRow>
                            {accounts.map(({_id, description, type, iconUrl})=>(
                                <AccountRow
                                    key={_id}
                                    id={_id}
                                    description={description}
                                    type={type}
                                    iconUrl={iconUrl}
                                    onAccountRemove={()=> onAccountRemove(_id)}
                                />
                            ))}
                    </div>
                :
                    <div className="no-account-s-found">
                        Cчета не найдены.
                    </div>
                }
            </div>
        </div>
    );
}

export const AccountList = styled (AccountListContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .caption {
        text-align: center;
    }

    & .accounts-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-accounts-found {
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
