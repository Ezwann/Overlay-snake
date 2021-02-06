const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser = require('body-parser');
var gameInfos = {
    score: 0,
    isDead: false
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
}).post('/update', (req, res) => {
    io.emit('update', req.body.direction, req.body.repeat);
    setTimeout(() => {
        console.log(gameInfos)
        if (gameInfos.isDead) {
            res.status(200).send(gameInfos.score.toString());
            gameInfos.isDead = false;
            gameInfos.score = 0
        } else {
            res.sendStatus(200);
        }
    }, 1000)
}).all(/.*/, (req, res) => {
    res.sendStatus(404);
});

io.on('connection', (socket) => {
    console.log("Connected");
    socket.on('dead', (score) => {
        gameInfos.score = score;
        gameInfos.isDead = true
    })
});

http.listen('8767', '0.0.0.0', () => {
    console.log(`[${new Date().toISOString()}] : Server up on 8767`);
})