import React from 'react';
import { PostList } from '../index';

const maxPosts = 3;

const PostRow = (props) => {
    const {
        noPostsText,
        postLinkType,
        postCategoryHeadingLevel,
        posts,
        postTitleHeadingLevel,
    } = props;

    return (
        <PostList
            noPostsText={noPostsText}
            postLinkType={postLinkType}
            postCategoryHeadingLevel={postCategoryHeadingLevel}
            posts={posts.slice(0, maxPosts)}
            postTitleHeadingLevel={postTitleHeadingLevel}
        />
    );
};

PostRow.displayName = 'PostRow';

export default PostRow;
