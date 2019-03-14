function testovaciFunkce() {
    var elem = document.getElementById("to");
    
    elem.style.color = "#ff0000";
    elem.style.backgroundColor = "#0000ff";
    //elem.style = "color: red; background-color: green;";
    
}

function submitFormWithUser() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/customer";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    var data = JSON.stringify(
        {
            "name": getInputValue("form-name"), 
            "city": getInputValue("form-city"), 
            "grade": getInputValue("form-grade")
        });
    xhr.send(data);
}

function getInputValue(inputId) {
    return document.getElementById(inputId).value;
}