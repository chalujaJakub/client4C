const SERVER_URL = "http://localhost:8080";

function testovaciFunkce() {
    var elem = document.getElementById("to");
    
    elem.style.color = "#ff0000";
    elem.style.backgroundColor = "#0000ff";
    //elem.style = "color: red; background-color: green;";
    
}

function submitFormWithUser() {
    var xhr = new XMLHttpRequest();
    var url = SERVER_URL + "/customer";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            var json = JSON.parse(xhr.responseText);
            window.location.href = "user-detail.html?userId=" + json.id;
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

function retrieveUserById() {
    var userId = getUrlParameter("userId");
    
    var xhr = new XMLHttpRequest();
    var url = SERVER_URL + "/customer/" + userId;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            setInputValue("form-user-id", json.id);
            setInputValue("form-name", json.name);
            setInputValue("form-city", json.city);
            setInputValue("form-grade", json.grade);
        }
    };
    xhr.send();
    
}

function getUrlParameter(parameterName) {
    var url = new URL(document.URL);
    return url.searchParams.get(parameterName);
}

function getInputValue(inputId) {
    return document.getElementById(inputId).value;
}

function setInputValue(inputId, inputValue) {
    document.getElementById(inputId).value = inputValue;   
}