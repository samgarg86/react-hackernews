# React/Redux HackerNews Client
A working example of a HackerNews client built using React/Redux/Webpack

* Using the webpack-react-redux boilerplate 
* ES6 - 7 with Babel
* Redux dev tools to keep track of the app's state
* Routing
* Hot module replacement support to change modules or react components without having to reload the browser
* a webpack production config 
* SCSS
* eslint to keep your js readable
* Redux Thunk Middleware for async API fetches
* Recursive actions to fetch comment threads


## Run the app

0. ```npm install```
0. ```npm start```

Once running, if you want to hide the redux dev monitor: ```CTRL+H```

Yes, it takes a while to load the first time you open the app.

### Is the hot module replacement really working?

Yup! The app updates without the browser having to reload. You don't lose state!

## Build the app
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.
