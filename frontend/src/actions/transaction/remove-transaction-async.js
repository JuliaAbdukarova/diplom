import { request } from "../../utils/request";

export const removeTransactionAsync = (id) => () =>
    request(`/api/transaction/${id}`, 'DELETE', {id});

