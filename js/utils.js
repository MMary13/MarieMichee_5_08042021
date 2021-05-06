//Variables-------------------------------------------------
let urlApi = "http://localhost:3000/api/cameras/";

//Functions-------------------------------------------------
//Display the number of articles present in the cart
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

//Create DOM element--------------------------------------------------------------
//Create an element image---------------------------------------------
function createImageElement(elementClass,altText,elementSource) {
    let imageCard = createHtmlElement("img",elementClass);
    imageCard.setAttribute("alt",altText);
    imageCard.setAttribute("src",elementSource);
    return imageCard;
}

//Create an element link---------------------------------------------
function createLinkElement(elementClass,elementRole,elementHref,value) {
    let linkElement = createElementWithValue("a",elementClass,value);
    linkElement.setAttribute("role",elementRole);
    linkElement.setAttribute("href",elementHref);
    return linkElement;
}

//Create an element with value---------------------------------------------
function createElementWithValue(elementTagName,elementClass,value) {
    let element = createHtmlElement(elementTagName,elementClass);
    element.innerHTML = value;
    return element;
}

//Create an element ---------------------------------------------
function createHtmlElement(elementTagName,elementClass) {
    let element = document.createElement(elementTagName);
    element.setAttribute("class",elementClass);
    return element;
}

//Create table's row for the cart
function createCartTableRow(key,name,numberOfArticle,price,totalAmount){
    let row = document.createElement("tr");
    row.appendChild(createTrashRowElement(key));
    row.appendChild(createRowElement(name));
    row.appendChild(createNumberOfArticlesElement(key,numberOfArticle));
    row.appendChild(createRowElement(price +"€"));
    row.appendChild(createRowElement(totalAmount+"€"));
    return row;
}

//Create table's row for order summary
function createSummaryTableRow(name,numberOfArticle,price,totalAmount){
    let row = document.createElement("tr");
    row.appendChild(createRowElement(name));
    row.appendChild(createRowElement(numberOfArticle));
    row.appendChild(createRowElement(price +"€"));
    row.appendChild(createRowElement(totalAmount+"€"));
    return row;
}

//Créer un élément d'une ligne
function createRowElement(value) {
    let rowElement = document.createElement("td");
    rowElement.innerHTML = value;
    return rowElement;
}

//Create trash element for a row
function createTrashRowElement(key) {
    let trashRowElement = document.createElement("th");
    trashRowElement.setAttribute("scope","row");
    let trashLink = createHtmlElement("a","trash-link");
    trashLink.setAttribute("value", key);
    let trashIcon = createHtmlElement("i","fas fa-trash-alt");
    trashLink.appendChild(trashIcon);
    trashRowElement.appendChild(trashLink);
    return trashRowElement;
}

//Create element more/minus of a row
function createNumberOfArticlesElement(key,quantity) {
    let numberElement = createHtmlElement("td","d-flex justify-content-center");
    //Create the + button
    let moreLink = createHtmlElement("a","text-secondary");
    moreLink.setAttribute("value", key);
    let moreIcon = createHtmlElement("i","fas fa-plus-square fa-lg");
    moreLink.appendChild(moreIcon);
    //Create the - button
    let minusLink = createHtmlElement("a","text-secondary");
    minusLink.setAttribute("value", key);
    let minusIcon = createHtmlElement("i","fas fa-minus-square fa-lg");
    minusLink.appendChild(minusIcon);
    //Create the input number
    let inputNumber = createElementWithValue("div","quantity mx-2",quantity);
    inputNumber.setAttribute("value",quantity);
    //Add the different elements to the rowElement
    numberElement.appendChild(moreLink);
    numberElement.appendChild(inputNumber);
    numberElement.appendChild(minusLink);
    return numberElement;
}