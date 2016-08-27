var express = require("express"),
    http = require("http");
var app = express();
var server = http.createServer(app, function() {
    console.log("Server started at localhost:8000")
});
app.use(express.static("Game/"));
server.listen(process.env.PORT || 8000, app.get('ip'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})
var serverSocket = require("socket.io")({
    transports: ["websocket"]
}).listen(server);
var players = [];
serverSocket.on("connection", function(socket) {
    socket.on('joingame', function(data) {
        function findExistingPlayers(users){
        	if(users.user==data.username){
        		users.opp="";
        		users.status="waiting"
        		return true;
        	}	
        }
        if (!players.find(findExistingPlayers)) {
            var currentPlayer = {};
            currentPlayer['user'] = data.user;
            currentPlayer['socket'] = socket;
            currentPlayer['status'] = data.status;
            currentPlayer['opp'] = "";
        }
        if (players.length) {
            for (var i = 0; i < players.length; i++) {
                if (players[i].status == 'waiting' && players[i].user!=data.username) {
                    players[i].status = 'joined';
                    currentPlayer['status'] = 'joined';
                    currentPlayer['opp'] = players[i].user;
                    players[i]['opp'] = currentPlayer.user;
                    players[i]['socket'].emit('joinedgame', {
                        P1: players[i]['user'],
                        P2: currentPlayer['user']
                    });
                    currentPlayer['socket'].emit('joinedwith', {
                        P1: players[i]['user'],
                        P2: currentPlayer['user']
                    });
                    break;
                }
            }
            players.push(currentPlayer)
        } else
            players.push(currentPlayer)
    });

    socket.on('rolldice', function(data) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].user == data.roller) {
                players[i].socket.emit('dicerolled', {
                    num: data.num,
                    player: data.roller,
                    opp: players[i]['opp'],
                    who: 'You'
                })
            }
            if (players[i]['opp'] == data.roller) {
                players[i].socket.emit('dicerolled', {
                    num: data.num,
                    player: data.roller,
                    opp: players[i].user
                })
            }
        }
    }) 
    socket.on('disconnect', function(data) {
        var disconnected = false;
        index = 0;var opponent;
        for (var i = 0; i < players.length; i++) {
            if (players[i].socket == socket) {
                opponent = findOpponents(players[i]);
                disconnected = true
                index = i;
                break
            }
        }
        console.log(disconnected);
        if (disconnected){
        	if (opponent)
                    opponent['socket'].emit('left', {
                        opp: opponent.user
                    });
            players.splice(index, 1);
        }
    })
})
function findOpponents(player) {
    for (var i = 0; i < players.length; i++) {
        if (players[i]['opp'] == player['user'])
            return players[i];
    }
    return false
}