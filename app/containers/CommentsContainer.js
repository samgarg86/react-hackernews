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
                <CommentThread key={key} comment={value}/>
                {value.kids &&
                <button className="Comment-btn-expand" onClick={() => onThreadExpand(value)}>
                    <svg className="icon-expand" viewBox="0 0 443.307 443.306">
                        <path d="M415.934,212.799L36.788,2.097C32.411-0.377,28.65-0.661,25.51,1.242c-3.14,1.902-4.708,5.328-4.708,10.276V431.78
		c0,4.952,1.569,8.381,4.708,10.284c3.14,1.902,6.901,1.622,11.278-0.855l379.146-210.703c4.381-2.478,6.571-5.434,6.571-8.856
		C422.505,218.224,420.314,215.274,415.934,212.799z"/>
                    </svg>
                </button>
                }
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
