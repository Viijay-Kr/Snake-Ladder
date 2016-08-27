(function($) {
    $.fn.snakeladder = function(options) {
        options = $.extend({
            width: 600,
            height: 500,
            margin: "0px auto"
        }, options);
        var ele = this;
        $(ele).css({
            "width": options.width,
            "height": options.height,
            "margin": options.margin
        });
        var grid = {};
        var dice = [1, 2, 3, 4, 5, 6];
        var P1, P2;
        var INITp1 = false,
            INITp2 = false;
        var SL = {
            init: function() {

                grid = {
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    10: 10,
                    11: 11,
                    12: 12,
                    13: 13,
                    14: 14,
                    15: 15,
                    16: 16,
                    17: 17,
                    18: 18,
                    19: 19,
                    20: 20,
                    21: 21,
                    22: 22,
                    23: 23,
                    24: 24,
                    25: 25,
                    26: 26,
                    27: 27,
                    28: 28,
                    29: 29,
                    30: 30
                }
                color_code = ["red", "green", "yellow", "blue", "violet", "orange"];
                p1 = p2 = 0;
                var float;
                var count = 31;
                for (var row = 0; row < 5; row++) {
                    if (count % 6 == 0 && float == "left") {
                        count++;
                        float = "right";
                        count--;
                    } else {
                        if (count % 6 == 0 && float == "right") {
                            count++;
                            float = "left";
                            count--;
                        }
                    }
                    if (!float) {
                        float = "right";
                        count--;
                    }
                    var text = count;
                    for (var col = 0; col < 6; col++) {
                        var cc = color_code[col];
                        var divs = document.createElement("DIV");
                        $(divs).css({
                            "width": options.width / 6,
                            "height": options.height / 5 - 40,
                            "display": "inline-block",
                            "float": float,
                            "background-color": cc,
                            "border-bottom": "1px solid black",
                            "padding-top": "40px",
                            "text-align": "center",
                            "font-size": "30px"
                        });
                        $(divs).html(text - col)
                        $(ele).append(divs);
                        count = $(divs).text() - 1;
                        if (count == 5) {
                            $(divs).html("L->8");
                            $(divs).css({
                                "background-color": "grey",
                                "color": "#fff"
                            });
                            grid[count + 1] = 8;
                        } else if (count == 9) {
                            $(divs).html("L->20");
                            $(divs).css({
                                "background-color": "grey",
                                "color": "#fff"
                            });
                            grid[count + 1] = 20;
                        } else if (count == 14) {
                            $(divs).html("L->25");
                            $(divs).css({
                                "background-color": "grey",
                                "color": "#fff"
                            });
                            grid[count + 1] = 25;
                        } else if (count == 20) {
                            $(divs).html("L->27");
                            $(divs).css({
                                "background-color": "grey",
                                "color": "#fff"
                            });
                            grid[count + 1] = 27;
                        } else if (count == 27) {
                            $(divs).html("S->1");
                            $(divs).css({
                                "background-color": "black",
                                "color": "white"
                            });
                            grid[count + 1] = 1;

                        } else if (count == 23) {
                            $(divs).html("S->14");
                            $(divs).css({
                                "background-color": "black",
                                "color": "white"
                            });
                            grid[count + 1] = 14;
                        } else if (count == 15) {
                            $(divs).html("S->2");
                            $(divs).css({
                                "background-color": "black",
                                "color": "white"
                            });
                            grid[count + 1] = 2;
                        }



                    }
                }
                console.log(grid);
            },
            moveplaces: function(Player, placestomove, data) {
                this.updateGrid(grid, Player, placestomove);
                $(".player").text('DICE');
                $("span").html(data.who ? data.who + " rolled " + data.num + ".Wait for " + data.opp + "'s turn" : data.player + " rolled " + data.num)
                $(".player[data-user=" + data.opp + "]").length ? $(".player[data-user=" + data.opp + "]").removeAttr('disabled') : '';
            },
            updateGrid: function(grid, playr, places) {
                if (!INITp1 && playr == P1) {
                    if (grid[places + 1] == P2) {
                        alert("Sorry You cant move");
                        return;
                    }
                    INITp1 = true;
                    this.updateChart(0, 1, playr);
                    grid[places + 1] = playr;

                    return;
                }
                if (!INITp2 && playr == P2) {

                    if (grid[places + 1] == P1) {
                        alert("Sorry You cant move");
                        return;
                    }
                    INITp2 = true;
                    grid[places + 1] = playr;
                    this.updateChart(0, 1, playr);
                    return;
                }
                for (var i in grid) {
                    i = parseInt(i);
                    if (grid[i] == playr) {
                        if (i == 30 && places != 1) return;
                        if (i / 6 > 4 && i + places > 31) return;
                        if (i / 6 > 4 && i + places == 31) {
                            alert(playr + "Won the game");
                            location.reload();
                            return;
                        }
                        if (grid[i + places] == P1 || grid[i + places] == P2) {
                            alert("Sorry You cant be moved");
                            return;
                        }
                        if (grid[i + places] < i + places || grid[i + places] > i + places) {
                            this.updateChart(i, grid[i + places], playr);
                            grid[grid[i + places]] = playr;
                            grid[i] = i;
                            return;
                        } else {
                            this.updateChart(i, grid[i + places], playr);
                            grid[i + places] = playr;
                            grid[i] = i;
                            console.log(grid);
                            return;

                        }
                    }
                }
            },
            updateChart: function(prev, current, player) {
                $("body").find("div").each(function() {
                    if ($(this).text() == player) {
                        $(this).html(prev);
                    }
                    if ($(this).text() == current) {
                        $(this).html("<div class='pawn'>" + player + "</div>");
                    }
                })
            }

        };

        //Private Method to set player buttons 
        var setButtons = function(username, disable, player) {
            // var player1 = document.createElement("BUTTON");
            // player1.innerHTML = "Player1";
            // var player2 = document.createElement("BUTTON");
            // player2.innerHTML = "Player2";
            var reset = document.createElement("BUTTON");
            reset.innerHTML = "DICE";
            // player1.setAttribute("class", "player");
            // player2.setAttribute("class", "player");
            reset.setAttribute("class", "player");
            reset.setAttribute("data-user", $("#username").val());
            // $(ele).append(player1);
            $(ele).append(reset);
            disable ? reset.setAttribute('disabled', true) : '';

            // (ele).append(player2);
            $(".player").each(function() {
                $(this).css({
                    "margin": "0px",
                    "height": "50px",
                    "width": "100px",
                    "font-size": "16px"
                });
            });
            var span = document.createElement("SPAN");
            var string = disable && player ? "Its " + player + "'s turn" : "CLICK THE BUTTON TO ROLL OVER A DICE";
            $(span).css({
                "margin": "0px 10px"
            });
            $(ele).append($(span).html(string));

            //Event Wrappers 
            $(".player").click(function(e) {
                rollDice($("#username").val(), e);
            });
        };
        //Get Username
        function getUsername() {
            $(ele).append("<br><form action='' id='joinform'><input type='text' style='width:300px;margin-top:10px' required='required' id='username' placeholder='Enter a username' /><br><input type='submit' value='Join' style='margin-top:10px' id='join' /></form>")
            var username;
            $("#joinform").submit(function(evt) {
                evt.preventDefault();
                username = $("#username").val();
                //Emit joingame to server
                socket.emit('joingame', {
                    'user': username,
                    status: 'waiting'
                })
                $("#join").val("waiting for player").attr("disabled", true)

            })

        }
        //Main function to handle all calls
        function main() {
            SL.init();
            getUsername();
            setSocketListeners();
            // setButtons();
        }
        //Roll dice function
        function rolldice(target) {
            if ($(target).text() == "Player1") {
                var num;
                $(target).text("Rolling")
                $("body").find("button").each(function() {
                    var text = $(this).text();
                    text = parseInt(text);
                    if (typeof text === "number" && !isNaN(text)) $(this).text("Player2");
                })
                var timer = function() {
                    if (timing) clearInterval(timing)
                    num = dice[Math.floor(Math.random() * dice.length)];
                    $(target).text(num);
                    if (!P1 && num == 1) {
                        SL.moveplaces("P1", 0);
                        return;
                    }
                    if (P1) SL.moveplaces("P1", num);

                };
                var timing = setInterval(function() {
                    timer();
                }, 1000);
            }
            if ($(target).text() == "Player2") {
                $(target).text("Rolling")
                $("body").find("button").each(function() {
                    var text = $(this).text();
                    text = parseInt(text);
                    if (typeof text === "number" && !isNaN(text)) $(this).text("Player1");
                });
                var timer = function() {
                    if (timing) clearInterval(timing)
                    num = dice[Math.floor(Math.random() * dice.length)];
                    $(target).text(num);
                    if (!P2 && num == 1) {
                        SL.moveplaces("P2", 0);
                        return;
                    }
                    if (P2) SL.moveplaces("P2", num);
                };
                var timing = setInterval(function() {
                    timer();
                }, 1000);
            }
            if ($(target).text() == "New Game") location.reload();
        }
        //rollDice()
        function rollDice(username, evt) {
            if ($(evt.target).text() == 'DICE') {
                var num;
                $(evt.target).text("Rolling")
                var timer = function() {
                    num = dice[Math.floor(Math.random() * dice.length)];
                    $(evt.target).attr('disabled', true);
                    socket.emit('rolldice', {
                        num: num,
                        roller: username,
                        P1: P1,
                        P2: P2
                    })

                };
                // var timing = setInterval(function() {
                timer();
                // }, 600);
            }
        }
        //Socket Listeners
        function setSocketListeners() {

        }
        socket.on('joinedgame', function(data) {
            $("#join").val('Connected with ' + data.P2).attr("disabled", true);
            P1 = data.P1;
            P2 = data.P2
            setButtons(username)
        })
        socket.on('joinedwith', function(data) {
            $("#join").val('Connected with ' + data.P1).attr("disabled", true);
            P1 = data.P1;
            P2 = data.P2
            setButtons(username, true, data.P1)
        })
        socket.on('dicerolled', function(data) {
            $(".player").text(data.num);
            if (data.player == P1) {
                if (data.num == 1 && !INITp1) {
                    SL.moveplaces(P1, 0, data);
                    return
                }
                if (INITp1)
                    SL.moveplaces(P1, data.num, data)
            }
            if (data.player == P2) {
                if (data.num == 1 && !INITp2) {
                    SL.moveplaces(P2, 0, data);
                    return
                }
                if (INITp2)
                    SL.moveplaces(P2, data.num, data)
            }
            $(".player").text('DICE');
            $(".player[data-user=" + data.opp + "]").length ? $(".player[data-user=" + data.opp + "]").removeAttr('disabled') : '';
            $("span").html(data.who ? data.who + " rolled " + data.num + ".Wait for " + data.opp + "'s turn" : data.player + " rolled " + data.num)
        })
        socket.on('left',function(data){
             var search=confirm(data.opp+" disconnected.Click Ok to search for new players")
             if(search){
              socket.emit('joingame', {
                    'user': username,
                    status: 'waiting'
              })
              $("#join").val("waiting for player").attr("disabled", true)
              $(".player,span").remove(); 
             } 
        })
        main();
        return ele;
    };
    // window.onbeforeunload=function(){
    //   socket.emit("disconnect",{user:$("#username").val()})
    // }
}(jQuery));