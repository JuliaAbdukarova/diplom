import styled from 'styled-components'
import { CategoryRow } from '../category-row/category-row'
import { TableRow, Search } from '../../../../components'

const CategoryListContainer = ({className,
    searchPhrase,
    onSearch,
    categories,
    onCategoryRemove
 }) => {

    return (
        <div className={className}>

            <div className="category-and-search">
                <div className="caption">КАТЕГОРИИ</div>
                <Search searchPhrase={searchPhrase} onChange={onSearch}/>
                {
                categories?.length > 0 ?
                    <div>
                        <TableRow>
                            <div className = "description-column" >Название</div>
                            <div className = "direction-column" >Тип</div>
                            <div className = "iconurl-column">URL иконки</div>
                        </TableRow>
                            {categories.map(({_id, description, direction, iconUrl})=>(
                                <CategoryRow
                                    key={_id}
                                    id={_id}
                                    description={description}
                                    direction={direction}
                                    iconUrl={iconUrl}
                                    onCategoryRemove={()=> onCategoryRemove(_id)}
                                />
                            ))}
                    </div>
                :
                    <div className="no-categories-found">
                        Категории не найдены.
                    </div>
                }
            </div>
        </div>
    );
}

export const CategoryList = styled (CategoryListContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .caption {
        text-align: center;
    }

    & .categories-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-categories-found {
        font-size: 18px;
        text-align: center;
    }

    &  .description-column {
        width: 250;
    }

    &  .direction-column {
        width: 120px;
    }

    &  .iconurl-column {
        width: auto;
    }
}
`
