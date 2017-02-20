import React, {PropTypes} from 'react';
import CommentInfo from './CommentInfo';
import '../styles/comment.scss';


const Comment = ({by, time, text}) => {
    return (
        <div className="Comment">
            <div className="Comment-content">
                <CommentInfo time={time} by={by} />
                <div className="Comment-text" dangerouslySetInnerHTML={{__html: text}}/>
            </div>
        </div>
    );
};

Comment.propTypes = {
    by: PropTypes.string,
    time: PropTypes.number,
    text: PropTypes.string
};

export default Comment;
