import { request } from '../utils/request';
import { removeComment } from './remove-comment';
//import {setPostData} from './set-post-data';

export const removeCommentAsync = (/*requestServer,*/ postId,  id) => (dispatch) => {
    request(`/posts/${postId}/comments/${id}`, 'DELETE').then(()=>{
        dispatch(removeComment(id))
    });
}
