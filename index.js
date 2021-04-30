document.addEventListener('DOMContentLoaded', function(){ 
    let cardRow = document.querySelector("main .row");
    getNumberOfArticlesInCart();

 
// GET all cameras --------------------------------
fetch(urlApi)
    .then(response => {
        if (response.ok) {
            response.json().then (data => {
                for (let i = 0; i < data.length; i++) {
                     let cardElement = createCardElement(data[i]._id,data[i].name,data[i].imageUrl,data[i].description);
                    cardRow.appendChild(cardElement);
                }
            });
        } else {
            alert("HTTP-Error: " + error.status + error);
        }
    })
    .catch(error => alert("Un problème est survenu :" + error));

});


//Functions----------------------------------
//-------------------------------------------
//Create a card element with all informations-----------------------
function createCardElement(id,name,imageUrl,description) {
    let colonneCard = createHtmlElement("div","col-12 col-lg-4 mb-4"); 
    let card = createHtmlElement("div","card h-100 text-center px-auto border-primary shadow");
    colonneCard.appendChild(card);
    let imageCard = createImageElement("card-img-top",name,imageUrl);
    card.appendChild(imageCard);
    let bodyCard = createHtmlElement("div","card-body");
    card.appendChild(bodyCard);
    let cardTitle = createElementWithValue("h5","card-title",name);
    bodyCard.appendChild(cardTitle);
    let cardText = createElementWithValue("p","card-text",description);
    bodyCard.appendChild(cardText);
    let buttonHref = "produit.html?id="+id;
    let cardButton = createLinkElement("btn btn-primary stretched-link","button",buttonHref,"Détails du produit");
    bodyCard.appendChild(cardButton);
    return colonneCard;
}
