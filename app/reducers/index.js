import * as actions from '../actions';
import { routerReducer  } from 'react-router-redux';
import { combineReducers } from 'redux';

const update = (state, mutations = {}) =>
    Object.assign({}, state, mutations);


const newsReducer  = (state = {}, action) => {
    switch (action.type) {
        case actions.REQUEST_NEWSITEM: {
            return { newsItem: {}, newsLoading: true };
        }
        case actions.RECEIVE_NEWSITEM: {
            return { newsItem: action.newsItem, newsLoading: false };
        }
        default:
            return state;
    }
};

const assignCommentsRecursive = (existingComments, newComments, parentId) => {
    if(existingComments.has(parentId)) {
        existingComments.get(parentId).childr =  newComments;
    } else {
        for (const [value] of existingComments) {
            value.childr && value.childr.size > 0 && assignCommentsRecursive(value.childr, newComments, parentId);
        }
    }
};

const commentsReducer = (state = {commentThreads: new Map(), isLoading: false}, action) => {
    switch (action.type) {
        case actions.REQUEST_COMMENTTHREADS: {
            return update(state, { isLoading: true});
        }
        case actions.RECEIVE_COMMENTTHREADS: {
            // First level comments
            if(action.parentId === 0) {
                return update(state, {commentThreads: action.comments, isLoading: false});
            }

            // Second level comments
            const mutatedComments = new Map(state.commentThreads);
            assignCommentsRecursive(mutatedComments, action.comments, action.parentId);
            return update(state, {commentThreads: mutatedComments});
        }
        case actions.TOGGLE_COMMENTTHREAD: {
            const mutatedComments = new Map(state.commentThreads);
            const commentToExpand = mutatedComments.get(action.commentId);
            commentToExpand.expanded = commentToExpand.expanded ? !commentToExpand.expanded : true;
            return update(state, {commentThreads: mutatedComments});
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    news: newsReducer,
    routing: routerReducer,
    comments: commentsReducer
});

export default rootReducer;
