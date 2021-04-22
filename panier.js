document.addEventListener('DOMContentLoaded', function(){ 
    let tableBody = document.querySelector("main table tbody");
    let totalAmount = 0;
    for (let index = 0; index < localStorage.length; index++) {
        let item = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let objectItem = JSON.parse(item);
        let row = createTableRow(objectItem.itemId,objectItem.itemName,objectItem.numberOfItem,objectItem.itemPrice,objectItem.totalPrice);
        tableBody.appendChild(row);
        totalAmount = totalAmount +objectItem.totalPrice;
    }
    document.getElementById("total").innerHTML = "Total de la commande : "+ totalAmount + "€";
    



});


//Functions ------------------------------------------------------------------
function createTableRow(id,name,numberOfArticle,price,totalAmount){
    let row = document.createElement("tr");
    row.appendChild(createTrashRowElement(id));
    row.appendChild(createtRowElement(name));
    row.appendChild(createtRowElement(numberOfArticle));
    row.appendChild(createtRowElement(price +"€"));
    row.appendChild(createtRowElement(totalAmount+"€"));
    return row
}

function createTrashRowElement(id) {
    let trashRowElement = document.createElement("th");
    trashRowElement.setAttribute("scope","row");
    trashRowElement.setAttribute("value", id);
    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fas fa-trash-alt");
    trashRowElement.appendChild(trashIcon);
    return trashRowElement
}
function createtRowElement(value) {
    let rowElement = document.createElement("td");
    rowElement.innerHTML = value;
    return rowElement
}
