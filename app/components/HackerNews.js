import React, {PropTypes} from 'react';
import NewsStats from './NewsStats';
import '../styles/hackerNews.scss';

const HackerNews = ({newsItem, isLoading}) => {
    return (
        <div className="News">
            {isLoading ?
                'News Loading...' :
                <header className="News-header">
                    <h1 className="News-title">{newsItem.title}</h1>

                    <NewsStats newsItem={newsItem}/>
                    <a className="News-url" href={newsItem.url} target="_blank">
                        <svg className="icon-open" viewBox="0 0 100 125">
                            <polygon
                                points="70,53.8 70,80.8 16,80.8 16,35.8 52,35.8 61,26.8 7,26.8 7,89.8 70,89.8 79,89.8 79,80.8 79,44.8 "/>
                            <polygon points="92.8,13 67.4,13 73.7,19.4 61,44.8 61,44.8 86.5,32.1 92.8,38.5 "/>
                        </svg>
                        <span className="News-url-text">{newsItem.url}</span>
                    </a>

                    <a className="News-url" href={'https://news.ycombinator.com/item?id=' + newsItem.id} target="_blank">
                        <svg className="icon-open" viewBox="0 0 100 125">
                            <polygon
                                points="70,53.8 70,80.8 16,80.8 16,35.8 52,35.8 61,26.8 7,26.8 7,89.8 70,89.8 79,89.8 79,80.8 79,44.8 "/>
                            <polygon points="92.8,13 67.4,13 73.7,19.4 61,44.8 61,44.8 86.5,32.1 92.8,38.5 "/>
                        </svg>
                        <span className="News-url-text">{'https://news.ycombinator.com/item?id=' + newsItem.id}</span>
                    </a>
                </header>
            }
        </div>
    );
};

HackerNews.propTypes = {
    newsItem: PropTypes.object,
    isLoading: PropTypes.bool
};

export default HackerNews;
