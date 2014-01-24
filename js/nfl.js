$(function() {
    "use strict";

    $("#assign").click(function() {
        "use strict";

        assignSquares();
    });
});

function assignSquares() {
    var employees = $("#employees").val().trim().split("\n");
    
    var top = [0,1,2,3,4,5,6,7,8,9];
    var left = [0,1,2,3,4,5,6,7,8,9];
    
    top = randomize(top);
    left = randomize(left);
    
    for(var i = 0; i < 10; i++) {
        $("#top" + i).html(top[i]);
    }
    
    for(var i = 0; i < 10; i++) {
        $("#left" + i).html(left[i]);
    }
}

function randomize(list) {
    for(var s = 0; s < 10000; s++) {
        var rand1 = Math.floor(Math.random() * list.length);
        var rand2 = Math.floor(Math.random() * list.length);
        
        var temp = list[rand1];
        list[rand1] = list[rand2];
        list[rand2] = temp;
    }
    
    return list;
}