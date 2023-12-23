import { request } from '../utils/request';
import { addComment } from './add-comment';
//import {setPostData} from './set-post-data';

//const test = "HIHOHI"
export const addCommentAsync = (/*requestServer, userId,*/ postId, content) => (dispatch )=> {
    request(`/posts/${postId}/comments`, 'POST',  {content}).then((comment)=>{
        dispatch(addComment(comment.data))
    });
}
