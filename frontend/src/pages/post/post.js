import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Comments, PostContent, PostForm } from './components'
import styled from 'styled-components';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors'
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({className}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const isCreating = !!useMatch('/post');
    const isEditing = !!useMatch('/post/:id/edit');
    const post = useSelector(selectPost);

    useLayoutEffect(()=>{
       dispatch(RESET_POST_DATA);
    },[dispatch, isCreating])

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false);
            return;
        }

        dispatch(loadPostAsync( params.id)).then((postData)=> {
            //if (postData.error) {
                setError(postData.error);
                setIsLoading(false);
            //}
        })
    }, [dispatch, /* requestServer, */ params.id, isCreating])

    if (isLoading) {
        return null;
    }

    const specificPostPage = isCreating || isEditing ?
                (   <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
                        <div className = {className}>
                            <PostForm post={post}/>
                        </div>
                    </PrivateContent>
                )
                :
                (
                    <div className = {className}>
                        <PostContent post = { post}/>
                        <Comments comments = {post.comments} postId={post.id}/>
                    </div>
                )
    return (
        error
        ? <Error error={error}/>
        : specificPostPage
    );
};

export const Post = styled(PostContainer)`
    margin: 40px;
    padding: 0 80px;
`
