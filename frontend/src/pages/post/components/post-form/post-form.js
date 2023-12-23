import { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
//import { useServerRequest } from '../../../../hooks';

const PostFormContainer = ({className,
        post: {id, title, imageUrl, content, publishedAt}}) => {

    const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
    const [titleValue, setTitleValue] = useState(title);

    const contentRef = useRef(null);

    useLayoutEffect(()=>{
        setImageUrlValue(imageUrl);
        setTitleValue(title);
    },[imageUrl, title])


    const dispatch = useDispatch()
    const navigate = useNavigate();
   // const requestServer = useServerRequest();

    const onSave = () => {
        //console.log('imageUrlValue=', imageUrlValue);
        //console.log('titleValue=', titleValue);
        //console.log('contentRef.current.innerHTML=', contentRef.current.innerHTML);

        const newContent = sanizeContent(contentRef.current.innerHTML);

        //console.log('newContent=', newContent);

        dispatch(savePostAsync(id, /*requestServer, */{
                //id,
                image: imageUrlValue,
                title: titleValue,
                content: newContent}))
            .then(({id}) => {navigate(`/post/${id}`)});

        //console.log(newImageUrl, newTitle, newContent);
    }

    const onImageChange = ({target}) => setImageUrlValue(target.value);
    const onTitleChange = ({target}) => setTitleValue(target.value);

    return (
        <div className={className}>
            <Input
                value={imageUrlValue}
                placeholder="Изображение..."
                onChange={onImageChange}/>
            <Input
                value={titleValue}
                placeholder="Заголовок..."
                onChange={onTitleChange}/>
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                margin="20px 0"
                editButton = {
                    <Icon
                        icon_id="fa-floppy-o"
                        size="21px"
                        margin="0 10px 0 0"
                        onClick={onSave}/>
                }/>
            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-text">{content}</div>
        </div>
    )
}

export const PostForm = styled(PostFormContainer)`
    & img {
        float: left;
        margin: 0 20px 10px 0;
    }

    & .post-text {
        min-height: 80px;
        border: 1px solid #000;
        font-size: 18px;
        white-space: pre-line;
    }
`
