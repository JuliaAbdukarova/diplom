import { request } from "../../utils/request";

export const getCategoryAsync = (id) => () =>
    request(`/api/category/${id}`);

