import { request } from "../../utils/request";

export const getAccountAsync = (id) => () =>
    request(`/api/account/${id}`);

