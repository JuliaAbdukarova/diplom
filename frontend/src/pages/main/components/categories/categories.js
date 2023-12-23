import { useEffect, useState } from "react";
import styled from "styled-components"
import { request } from '../../../../utils'
import { CATEGORY_DIRECTION }  from "../../../../constants";
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import { useParams } from 'react-router-dom';

const CategoriesContainer = ({className, direction, onLoad}) => {
    const [categories, setCategories] = useState([]);

    const { parmDirection } = useParams();

    if (direction === "") {
        direction = parmDirection
    }
    useEffect(()=>{
        request(`/api/category?noLimit=true&direction=${direction}`)
            .then(({data: {categories}})=>{
                setCategories(categories);
            });

        onLoad()
    },[direction]);

    return (
        <div className={className}>
            <div className = "right">
                <Link to={`/category/direction/${direction}`}>
                    <Icon icon_id="fa fa-pencil-square-o" margin="10px 0 0 16px"/>
                </Link>
            </div>
            <div className="caption">
                { direction === CATEGORY_DIRECTION.INCOME ?
                    <div>ДОХОД</div>
                :
                    <div>РАСХОД</div> }
            </div>

            <div>
               <ul>
                    {
                        categories.map(({_id, description, type, iconUrl})=>(
                            <li key={_id} id={_id}>
                                {description}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export const Categories = styled (CategoriesContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    font-size: 18px;
    width: 100%;


    & .right {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    & .caption {
        display: flex;
        height: 10px;
        margin: 10px 0 0 16px;
        font-weight: bold;
    }

    & .category-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-category-found {
        font-size: 18px;
        text-align: center;
    }
}
`
