var freshdata = require('./js/freshdata');
var path = require('path/posix');
var express = require('express');
var jade = require('jade');
const bodyParser = require('body-parser');
var app = express();

app.set('views', './view');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use('/players', express.static('players'));

app.get('/', function (req, res) {
    console.log('主页GET请求');
    res.render('index');
})

app.get('/players', function (req, res) {
    console.log('players页面请求');
    res.render('players');
})

app.get('/players/:name', function (req, res) {
    let name = req.params.name;
    res.render('player', {name: name});
})

app.get('/404', function (req, res) {
    res.render('404');
})

var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`应用实例访问地址为 http://${host}:${port}`);
})