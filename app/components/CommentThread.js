import React, { PropTypes } from 'react';
import Comment from './Comment';
import '../styles/commentThread.scss';

const CommentThread = ({comment}) => {
    let iThread = [];

    // Render child comments recursively
    if(comment.childr) {
        for (let [key, value] of comment.childr) {
            iThread = [...iThread, (
                <CommentThread key={key} comment={value}/>
            )];
        }
    }

    return (
        <div key={comment.id} className="Comment-thread">
            <Comment by={comment.by} text={comment.text} time={comment.time}/>
            <div className="Comment-childr">
                {iThread}
            </div>
        </div>
    );
};

CommentThread.propTypes = {
    comment: PropTypes.object
};

export default CommentThread;
