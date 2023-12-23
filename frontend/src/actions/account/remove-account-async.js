import { request } from "../../utils/request";

export const removeAccountAsync = (id) => () =>
    request(`/api/account/${id}`, 'DELETE', {id});

