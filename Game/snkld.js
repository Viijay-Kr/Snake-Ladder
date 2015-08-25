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
    var INITp1 = 0,
      INITp2 = 0;
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
      moveplaces: function(Player, placestomove) {
        this.updateGrid(grid, Player, placestomove);
      },
      updateGrid: function(grid, playr, places) {
        if (INITp1 == 0 && playr == "P1") {
          if (grid[places + 1] == "P2") {
            alert("Sorry You cant move");
            INITp1 == 0;
            return;
          }
          P1 = 1;
          INITp1 = 1;
          this.updateChart(0, 1, playr);
          grid[places + 1] = playr;

          return;
        }
        if (INITp2 == 0 && playr == "P2") {

          if (grid[places + 1] == "P1") {
            alert("Sorry You cant move");
            INITp2 = 0;
            return;
          }
          P2 = 1;
          INITp2 = 1;
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
            if (grid[i + places] == "P1" || grid[i + places] == "P2") {alert("Sorry You cant be moved");return;}
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
            $(this).text(prev);
          }
          if ($(this).text() == current) {
            $(this).text(player);
          }
        })
      }

    };

    //Private Method to set player buttons 
    var setButtons = function() {
      var player1 = document.createElement("BUTTON");
      player1.innerHTML = "Player1";
      var player2 = document.createElement("BUTTON");
      player2.innerHTML = "Player2";
      var reset = document.createElement("BUTTON");
      reset.innerHTML = "New Game";
      player1.setAttribute("class", "player");
      player2.setAttribute("class", "player");
      reset.setAttribute("class", "player");
      $(ele).append(player1);
      (ele).append(reset);
      (ele).append(player2);
      $(".player").each(function() {
        $(this).css({
          "margin": "35px 50px 30px 50px",
          "height": "50px",
          "width": "100px",
          "font-size": "16px"
        });
      });
      var span = document.createElement("SPAN");
      var string = "CLICK PLAYER BUTTONS TO ROLL OVER A DICE";
      $(span).css({
        "margin": "0px 100px"
      });
      $(ele).append($(span).html(string));
      //Event Wrappers 
      $(".player").click(function(e) {
        rolldice(e.target);
      });
    };
    //Main function to handle all calls
    function main() {
      SL.init();
      setButtons();
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
    main();
    return ele;
  };
}(jQuery));