import * as firebase from '../services/api.firebase';

export const REQUEST_NEWSITEM = 'REQUEST_NEWSITEM';
function requestNewsItem() {
    return {
        type: REQUEST_NEWSITEM, // must have type
        text: 'Requesting News Item'
    };
}

export const RECEIVE_NEWSITEM = 'RECEIVE_NEWSITEM';
function receiveNewsItem( json ) {
    return {
        type: RECEIVE_NEWSITEM,
        text: 'Received News Item',
        newsItem: json
    };
}

export const REQUEST_COMMENTTHREADS = 'REQUEST_COMMENTTHREADS';
function requestCommentThreads() {
    return {
        type: REQUEST_COMMENTTHREADS,
        text: 'Requesting comments for NewsItem'
    };
}

export const RECEIVE_COMMENTTHREADS = 'RECEIVE_COMMENTTHREADS';
function receiveCommentThreads(comments, parentId) {
    return {
        type: RECEIVE_COMMENTTHREADS,
        text: 'Received comments',
        comments,
        parentId
    };
}

export const TOGGLE_COMMENTTHREAD = 'TOGGLE_COMMENTTHREAD';
function toggleCommentThread(commentId) {
    return {
        type: TOGGLE_COMMENTTHREAD,
        text: 'Toggle comment thread',
        commentId
    };
}

const requestCommentsRecursive = (parentComment, dispatch) => {
    if (!parentComment.childr && parentComment.kids && parentComment.kids.length > 0) {
        firebase.getItems(parentComment.kids, comments => {
            dispatch(receiveCommentThreads(comments, parentComment.id));
            for (const [value] of comments) {
                requestCommentsRecursive(value, dispatch);
            }
        });
    }
};

export function fetchNews(id) {
    return (dispatch) => {
        // Fetch News
        dispatch(requestNewsItem());
        firebase.getItem(id, newsItem => {
            dispatch(receiveNewsItem(newsItem));

            // Fetch 1st Level Comments
            if (newsItem.kids && newsItem.kids.length > 0) {
                dispatch(requestCommentThreads());

                firebase.getItems(newsItem.kids, comments => {
                    // Remove comment if deleted
                    for (const [key, value] of comments) {
                        if (value.deleted) comments.delete(key);
                    }
                    dispatch(receiveCommentThreads(comments, 0));
                });
            }
        });
    };
}

export function fetchChildComments(comment) {
    return (dispatch) => {
        dispatch(toggleCommentThread(comment.id));
        if (!comment.childr) {
            requestCommentsRecursive(comment, dispatch);
        }
    };
}
