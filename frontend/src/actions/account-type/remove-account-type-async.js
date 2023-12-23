import { request } from "../../utils/request";

export const removeAccountTypeAsync = (id) => () =>
    request(`/api/accounttype/${id}`, 'DELETE', {id});

