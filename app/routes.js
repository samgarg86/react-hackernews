import React from 'react';
import { Route } from 'react-router';
import HackerNewsContainer from './containers/HackerNewsContainer';

export default (
	<Route path="/" component={HackerNewsContainer}>
		<Route path="/:newsId" component={HackerNewsContainer} />
	</Route>
);
