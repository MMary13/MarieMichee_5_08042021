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
    row.appendChild(createNumberOfArticlesElement(key,numberOfArticle));
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

//Créer l'élément + ou - d'articles
function createNumberOfArticlesElement(key,quantity) {
    let numberElement = document.createElement("td");
    numberElement.setAttribute("class","d-flex justify-content-center")
    //Create the + button
    let moreLink = document.createElement("a");
    moreLink.setAttribute("class", "text-secondary");
    moreLink.setAttribute("value", key);
    let moreIcon = document.createElement("i");
    moreIcon.setAttribute("class", "fas fa-plus-square fa-lg");
    moreLink.appendChild(moreIcon);
    //Create the - button
    let minusLink = document.createElement("a");
    minusLink.setAttribute("class", "text-secondary");
    minusLink.setAttribute("value", key);
    let minusIcon = document.createElement("i");
    minusIcon.setAttribute("class", "fas fa-minus-square fa-lg");
    minusLink.appendChild(minusIcon);
    //Create the input number
    let inputNumber = document.createElement("div");
    inputNumber.setAttribute("class","quantity mx-2");
    inputNumber.setAttribute("value",quantity);
    inputNumber.innerHTML = quantity;
    //Ajouter les différents éléments au rowElement
    numberElement.appendChild(moreLink);
    numberElement.appendChild(inputNumber);
    numberElement.appendChild(minusLink);
    return numberElement
}