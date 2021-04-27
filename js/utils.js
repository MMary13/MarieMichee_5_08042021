//Variables-------------------------------------------------
let urlApi = "http://localhost:3000/api/cameras/";

//Functions-------------------------------------------------
//Afficher le nombre d'articles dans le panier
function getNumberOfArticlesInCart() { 
    let panierLink = document.querySelector(".nav-link");
    let numberOfArticles = 0;
    for (let index = 0; index < localStorage.length; index++) {
        let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
        numberOfArticles = numberOfArticles + parseInt(objectItem.numberOfItem);
    }
    panierLink.innerHTML = "Panier (" + numberOfArticles +")";
}

//Get the id from URL------------
function getIdFromUrl() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get("id");
}

//Créer une ligne du tableau du panier
function createTableRow(key,name,numberOfArticle,price,totalAmount){
    let row = document.createElement("tr");
    row.appendChild(createTrashRowElement(key));
    row.appendChild(createtRowElement(name));
    row.appendChild(createtRowElement(numberOfArticle));
    row.appendChild(createtRowElement(price +"€"));
    row.appendChild(createtRowElement(totalAmount+"€"));
    return row
}

function createTableRowSummary(name,numberOfArticle,price,totalAmount){
    let row = document.createElement("tr");
    row.appendChild(createtRowElement(name));
    row.appendChild(createtRowElement(numberOfArticle));
    row.appendChild(createtRowElement(price +"€"));
    row.appendChild(createtRowElement(totalAmount+"€"));
    return row
}

//Créer l'élément pour supprimer une ligne
function createTrashRowElement(key) {
    let trashRowElement = document.createElement("th");
    trashRowElement.setAttribute("scope","row");
    let trashLink = document.createElement("a");
    trashLink.setAttribute("class", "trash-link");
    trashLink.setAttribute("value", key);
    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fas fa-trash-alt");
    trashLink.appendChild(trashIcon);
    trashRowElement.appendChild(trashLink);
    return trashRowElement
}

//Créer un élément d'une ligne
function createtRowElement(value) {
    let rowElement = document.createElement("td");
    rowElement.innerHTML = value;
    return rowElement
}