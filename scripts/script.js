const SERVER_URL = "http://localhost:8080";
const PAGE_SIZE = 3;

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

function getUsers(pageNo) {  
    var xhr = new XMLHttpRequest();
    var url = SERVER_URL + "/customer?pageNo=" + pageNo;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var totalCount = xhr.getResponseHeader("X-Count");
            console.log(totalCount);
            var json = JSON.parse(xhr.responseText);
            
            handleUsersPagination(totalCount, pageNo);
            
            var tableBody = document.getElementById("user-list-table-body");
            tableBody.innerHTML = "";
            
            json.forEach(function(element) {
                var trElement = document.createElement("tr");
                
                var idElement = document.createElement("td");     
                var hrefElement = document.createElement("a");
                hrefElement.innerHTML = element.id;
                hrefElement.href = "user-detail.html?userId=" + element.id;
                idElement.appendChild(hrefElement);
                
                trElement.appendChild(idElement);       
                var nameElement = document.createElement("td");
                nameElement.innerHTML = element.name;
                trElement.appendChild(nameElement);           
                var cityElement = document.createElement("td");
                cityElement.innerHTML = element.city;
                trElement.appendChild(cityElement);            
                var gradeElement = document.createElement("td");
                gradeElement.innerHTML = element.grade;
                trElement.appendChild(gradeElement); 
                
                tableBody.appendChild(trElement);      
            
                console.log(element);            
            });
            
        }
    };
    xhr.send();
}

function handleUsersPagination(totalCount, currentPageNo) {
    var paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";
    
    var numberOfPages = Math.ceil(totalCount / PAGE_SIZE);
    for (var pageNo = 1; pageNo <= numberOfPages; pageNo++) {
        var buttonElement = document.createElement("input");
        buttonElement.setAttribute("type", "button");
        buttonElement.setAttribute("value", pageNo);
        buttonElement.setAttribute("onclick", "getUsers(" + pageNo + ");");
        if (pageNo == currentPageNo) {
            buttonElement.setAttribute("disabled", "disabled");
        }
        
        paginationElement.appendChild(buttonElement);    
    }
    
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

function editUser() {
    document.getElementById("form-name").disabled = false;
    document.getElementById("form-city").disabled = false;
    document.getElementById("form-grade").disabled = false;
    
    
    var submitElement = document.createElement("input");
    submitElement.setAttribute("type", "button");
    submitElement.setAttribute("value", "Uložit");
    submitElement.setAttribute("onclick", "performUserEdit();");
    
    document.getElementById("edit-user-form").appendChild(submitElement);
    document.getElementById("form-edit").disabled = true;
}

function performUserEdit() {
    var xhr = new XMLHttpRequest();
    var url = SERVER_URL + "/customer/" + getInputValue("form-user-id");
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
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