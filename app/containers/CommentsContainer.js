import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CommentThread from '../components/CommentThread';
import {fetchChildComments} from '../actions';
import '../styles/commentsContainer.scss';

const CommentsContainer = ({commentThreads, isLoading, onThreadExpand}) => {
    let iThread = [];

    for (let [key, value] of commentThreads) {
        iThread = [...iThread, (
            <div key={key} className={`Comment-threadContainer ${value.expanded ? 'is-expanded' : 'is-collapsed'}`}>
                <button className="Comment-btn-expand" onClick={() => onThreadExpand(value)}>
                    {value.kids ? (value.expanded ? '-': '+') : ''}
                </button>

                <CommentThread key={key} comment={value}/>
            </div>
        )];
    }

    return (
        <div className="Comments-container">
            {isLoading ? <div>Comments Loading...</div> : ''}
            {iThread}
        </div>
    );
};

CommentsContainer.propTypes = {
    commentThreads: PropTypes.object,
    isLoading: PropTypes.bool,
    onThreadExpand: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        onThreadExpand: comment => dispatch(fetchChildComments(comment))
    };
};

const mapStateToProps = (state) => {
    return {
        commentThreads: state.comments.commentThreads || new Map(),
        isLoading: state.comments.isLoading === true
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsContainer);
