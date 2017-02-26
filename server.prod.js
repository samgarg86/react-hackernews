var express = require('express');
var path =  require('path');
var open = require('open');
// import compression from 'compression';
// import favicon from 'serve-favicon';

/*eslint-disable no-console */

var port = process.env.PORT || 3000;
var app = express();

// app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.all('*', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html');
});

// app.get('/:newsId', function (req, res) {
//     res.send(req.params);
// });

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});