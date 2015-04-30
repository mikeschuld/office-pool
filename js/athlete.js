$(function() {
    "use strict";

    $("#assign").click(function() {
        "use strict";

        var assigned = $("#assigned");
        assigned.html("");

        var athletes = $("#athletes").val().trim().split("\n");
        var employees = $("#employees").val().trim().split("\n");
        var per = $("#per").val();
        var ePerA = $("#ePerA").val();
        
        var athCount = athletes.length;
        var order = [];

        // Fill the order list
        for(var i = 0; i < athCount; i++) {
            order[i] = i;
        }
        
        // Add placeholders to the page
        addEmployeeSections(employees);
        
        // Randomly swap cells 10000 times
        for(var s = 0; s < 10000; s++) {
            var rand1 = Math.floor(Math.random() * athCount);
            var rand2 = Math.floor(Math.random() * athCount);
            
            var temp = order[rand1];
            order[rand1] = order[rand2];
            order[rand2] = temp;
        }
        
        assignAthletes(order, athletes, per, ePerA, athCount);
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

function assignAthletes(order, athletes, per, ePerA, max) {   
    var slot = 0;
    var used = new Array(order.length);
    for (var u = 0; u < used.length; u++) {
        used[u] = 0;
    }
    
    $(".employee").each(function() {
        var list = $("<ul>");
        var assigned = 0;
        
        while(assigned < per && !allUsed(used, ePerA)) {
            slot = slot % order.length;
            
            if(used[slot] < ePerA) {
                $("<li>" + athletes[order[slot]] + "</li>").appendTo(list);
                used[slot]++;
                assigned++;
                slot++;
            }
        }
        
        list.appendTo(this);
    });
}

function allUsed(used, max) {
    for (var i = 0; i < used.length; i++) {
        if (used[i] < max) {
            return false;
        }
    }
    
    return true;
};

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

    return template.replace(find, replace);
}