import { request } from '../utils/request';
import {setPostData} from './set-post-data';

export const savePostAsync = (/*requestServer,*/ id,  newPostData) => (dispatch) => {
    const saveRequest = id ?
        request(`/posts/${id}`, 'PATCH', {newPostData}) :
        request('/posts', 'POST', {newPostData})

    return saveRequest.then((updatedPost)=>{
        dispatch(setPostData(updatedPost.data));
        //console.log(updatedPost);
        return updatedPost.data;
    })


}
