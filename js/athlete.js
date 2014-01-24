$(function() {
    "use strict";

    $("#assign").click(function() {
        "use strict";

        var assigned = $("#assigned");
        assigned.html("");

        var athletes = $("#athletes").val().trim().split("\n");
        var employees = $("#employees").val().trim().split("\n");
        var per = $("#per").val();
        
        var max = athletes.length;
        var used = new Array(max);
        var order = [];

        // Fill the list in order
        for(var i = 0; i < max; i++) {
            order[i] = i;
        }
        
        // Randomly swap cells 10000 times
        for(var s = 0; s < 10000; s++) {
            var rand1 = Math.floor(Math.random() * max);
            var rand2 = Math.floor(Math.random() * max);
            
            var temp = order[rand1];
            order[rand1] = order[rand2];
            order[rand2] = temp;
        }
        
        addEmployeeSections(employees);
        assignAthletes(order, athletes, per, max);
    });
});

function addEmployeeSections(employees) {
    $(employees).each(function() {
        "use strict";

        if(this.trim() == "") {
            return;
        }

        var employee = templateLoad("athlete-employee.html");
        employee = templateReplace(employee, /\[employee\]/g, this);
        $(employee).appendTo(assigned);
    });
}

function assignAthletes(order, athletes, per, max) {
    var slot = 0;
    $(".employee").each(function() {
        var list = $("<ul>");
        for(var a = 0; a < per && slot < max; a++) {
            $("<li>" + athletes[order[slot++]] + "</li>").appendTo(list);
        }
        list.appendTo(this);
    });
}

function templateLoad(url) {
    "use strict";

    var template = "";
    $.ajax({
        url: url,
        async: false,
        success: function(result){
            template = result;
        }
    });

    return template;
}

function templateReplace(template, find, replace) {
    "use strict";

    return template.replace(find, replace);;
}