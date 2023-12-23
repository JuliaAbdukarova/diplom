import { useEffect, useMemo, useState } from "react";
import styled from "styled-components"
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from '../../utils'
import { request } from "../../utils/request";
import { useDispatch } from "react-redux";
import { CLOSE_CATEGORY_MODAL,
         CLOSE_MODAL,
         openCreateCategoryModal,
         openModal,
         removeCategoryAsync } from "../../actions";
import { CategoryList, CategoryModal } from "./components";
import { Icon, Pagination, useParentComponent } from "../../components";
import { useParams } from 'react-router-dom';
import { Loader } from "../../components";

const CategoryContainer = ({className}) => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [shouldUpdateCategoryList, setShouldUpdateCategoryList] = useState(false);
    const { loaderRef, decrementLoadingCount, setLoadingCount} = useParentComponent();

    const dispatch = useDispatch()

    const { direction } = useParams();

    //console.log("ВАЖНО direction = ", direction);

    useEffect(()=>{
        setLoadingCount(1)
        request(`/api/category?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&direction=${direction}`)
        .then(({data: {categories, lastPage}})=>{
            setCategories(categories);
            setLastPage(lastPage);
            decrementLoadingCount();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, shouldSearch, shouldUpdateCategoryList]);

    const startDelayedSearch = useMemo (()=>debounce(setShouldSearch, 2000),[])

    const onSearch = ({target}) => {
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
    }

    const onCreate = () => {
        dispatch(openCreateCategoryModal({
            text: "Создание категории",
            onConfirm: () => { setShouldUpdateCategoryList(!shouldUpdateCategoryList) } ,
            onCancel: () => dispatch(CLOSE_CATEGORY_MODAL)}));
    }

    const onCategoryRemoveOld = (categoryId) => {
        //if (!checkAccess([ROLE.ADMIN], userRole )) {
        //    return;
        //}
        //console.log(categoryId)
        request(`/api/category/${categoryId}`, 'DELETE').then(()=> {
            setShouldUpdateCategoryList(!shouldUpdateCategoryList);
        });
    }

    const onCategoryRemove = (id) => {
        dispatch(openModal({
            text: "Удалить категорию?",
            onConfirm: () => {
                    dispatch(removeCategoryAsync(id))
                        .then(setShouldUpdateCategoryList(!shouldUpdateCategoryList))
                    dispatch(CLOSE_MODAL);
                },
            onCancel: ()=> dispatch(CLOSE_MODAL),
        }));
    }

    return (
        <>
            { <Loader count={1} ref={loaderRef} /> }
            <Icon icon_id="fa-plus-square-o" margin="0 0 0 10px" onClick={() => onCreate() }/>

            <CategoryList   searchPhrase = {searchPhrase}
                            onSearch = {onSearch}
                            categories = {categories}
                            onCategoryRemove = {onCategoryRemove} />

            <CategoryModal/>
            {lastPage > 1 && categories.length > 0 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
        </>
    );
}

export const Category = styled(CategoryContainer)`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;

    & .categories-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-categories-found {
        font-size: 18px;
        text-align: center;
    }
}
`
