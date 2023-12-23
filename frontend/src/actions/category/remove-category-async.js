import { request } from "../../utils/request";

export const removeCategoryAsync = (id) => () =>
    request(`/api/category/${id}`, 'DELETE', {id});

