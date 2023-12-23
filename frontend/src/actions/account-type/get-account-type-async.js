import { request } from "../../utils/request";

export const getAccountTypeAsync = (id) => () =>
    request(`/api/accounttype/${id}`);

