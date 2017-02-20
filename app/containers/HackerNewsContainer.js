import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import HackerNews from '../components/HackerNews';
import CommentsContainer from '../containers/CommentsContainer';
import {fetchNews} from '../actions';
import '../styles/reset.scss';

class HackerNewsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchNews(this.props.params.newsId || '3410773'));
    }

    render() {
        const {newsItem, isLoading} = this.props;
        return (
            <div className="hackerNews-Container">
                <HackerNews newsItem={newsItem} isLoading={isLoading}/>
                <CommentsContainer />
            </div>
        );
    }
}

HackerNewsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    newsItem: PropTypes.object,
    isLoading: PropTypes.bool,
    params: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        newsItem: state.news.newsItem || {},
        isLoading: state.news.newsLoading === true
    };
};


export default connect(
    mapStateToProps
)(HackerNewsContainer);
