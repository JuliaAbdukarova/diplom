import styled from 'styled-components'
import { AccountTypeRow } from '../account-type-row/account-type-row'
import { TableRow, Search } from '../../../../components'

const AccountTypeListContainer = ({className,
    searchPhrase,
    onSearch,
    accountTypes,
    onAccountTypeRemove
 }) => {

    return (
        <div className={className}>

            <div className="category-and-search">
                <div className="caption">Тип счета</div>
                <Search searchPhrase={searchPhrase} onChange={onSearch}/>
                {
                accountTypes?.length > 0 ?
                    <div>
                        <TableRow>
                            <div className = "description-column" >Тип счета</div>

                        </TableRow>
                            {accountTypes.map(({_id, description})=>(
                                <AccountTypeRow
                                    key={_id}
                                    id={_id}
                                    description={description}
                                    onAccountTypeRemove={()=> onAccountTypeRemove(_id)}
                                />
                            ))}
                    </div>
                :
                    <div className="no-account-types-found">
                        Типы счета не найдены.
                    </div>
                }
            </div>
        </div>
    );
}

export const AccountTypeList = styled (AccountTypeListContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .caption {
        text-align: center;
    }

    & .account-types-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-account-types-found {
        font-size: 18px;
        text-align: center;
    }

    &  .description-column {
        width: 250;
    }
}
`
