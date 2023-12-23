import { request } from "../../utils/request";

export const getTransactionAsync = (id) => () =>
    request(`/api/transaction/${id}`);

