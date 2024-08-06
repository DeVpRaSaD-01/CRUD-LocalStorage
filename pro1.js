function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if (name === "") {
        alert("Name is required");
        return false;
    }

    if (age === "") {
        alert("Age is required");
        return false;
    } else if (isNaN(age) || age < 1) {
        alert("Age should be a valid number greater than zero");
        return false;
    }

    if (address === "") {
        alert("Address is required");
        return false;
    }

    if (email === "") {
        alert("Email is required");
        return false;
    } else if (!email.includes("@") || !email.includes(".")) {
        alert("Invalid email address");
        return false;
    }

    return true;
}

function showData() {
    var peoplelist;
    if (localStorage.getItem("peoplelist") == null) {
        peoplelist = [];
    } else {
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    var html = "";
    peoplelist.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deletedata(' + index + ')" class="btn btn-danger">Delete</button><button onclick="prepareUpdate(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showData;

function Adddata() {
    if (validateForm()) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var peoplelist;
        if (localStorage.getItem("peoplelist") == null) {
            peoplelist = [];
        } else {
            peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
        }

        peoplelist.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

function deletedata(index) {
    var peoplelist;
    if (localStorage.getItem("peoplelist") == null) {
        peoplelist = [];
    } else {
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }
    peoplelist.splice(index, 1);
    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    showData();
}

function prepareUpdate(index) {
    var peoplelist = JSON.parse(localStorage.getItem("peoplelist"));

    document.getElementById("name").value = peoplelist[index].name;
    document.getElementById("age").value = peoplelist[index].age;
    document.getElementById("address").value = peoplelist[index].address;
    document.getElementById("email").value = peoplelist[index].email;

    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
    document.getElementById("update").onclick = function () {
        updatedata(index);
    };
}

function updatedata(index) {
    if (validateForm()) {
        var peoplelist = JSON.parse(localStorage.getItem("peoplelist"));

        peoplelist[index].name = document.getElementById("name").value;
        peoplelist[index].age = document.getElementById("age").value;
        peoplelist[index].address = document.getElementById("address").value;
        peoplelist[index].email = document.getElementById("email").value;

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";

        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
    }
}

function deletedata(index) {
    var peoplelist = JSON.parse(localStorage.getItem("peoplelist")) || [];
    var trash = JSON.parse(localStorage.getItem("trash")) || [];

    var deletedItem = peoplelist.splice(index, 1)[0];
    trash.push(deletedItem);

    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    localStorage.setItem("trash", JSON.stringify(trash));

    showData();
    showTrash();
}

function restoreData(index) {
    var trash = JSON.parse(localStorage.getItem("trash")) || [];
    var peoplelist = JSON.parse(localStorage.getItem("peoplelist")) || [];

    var restoredItem = trash.splice(index, 1)[0];
    peoplelist.push(restoredItem);

    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    localStorage.setItem("trash", JSON.stringify(trash));

    showData();
    showTrash();
}

function permanentlyDelete(index) {
    var trash = JSON.parse(localStorage.getItem("trash")) || [];
    trash.splice(index, 1);

    localStorage.setItem("trash", JSON.stringify(trash));
    showTrash();
}

function showTrash() {
    var trash = JSON.parse(localStorage.getItem("trash")) || [];

    var html = "";
    trash.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="restoreData(' + index + ')" class="btn btn-success">Restore</button>';
        html += '<button onclick="permanentlyDelete(' + index + ')" class="btn btn-danger m-2">Delete Permanently</button></td>';
        html += "</tr>";
    });

    document.querySelector("#trashTable tbody").innerHTML = html;
}

window.onload = function() {
    showData();
    showTrash();
};


