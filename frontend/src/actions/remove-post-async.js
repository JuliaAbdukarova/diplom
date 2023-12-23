import { request } from "../utils/request";

export const removePostAsync = (/*requestServer,*/ id) => () =>
    request(`/posts/${id}`, 'DELETE', {id});

