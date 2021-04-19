document.addEventListener('DOMContentLoaded', function(){ 
    let cards = document.getElementsByClassName("card");
    let cardRow = document.querySelector("main .row");


 
// GET all cameras --------------------------------
fetch("http://localhost:3000/api/cameras/")
    .then(response => {
        if (response.ok) {
            response.json().then (data => {
                for (let i = 0; i < data.length; i++) {
                    let colonneCard = document.createElement("div");
                    colonneCard.setAttribute("class","col-12 col-lg-4 mb-4");
                    cardRow.appendChild(colonneCard);
                    let card = document.createElement("div");
                    card.setAttribute("class","card h-100 text-center px-auto border-primary shadow");
                    colonneCard.appendChild(card);
                    let imageCard = document.createElement("img");
                    imageCard.setAttribute("class","card-img-top");
                    imageCard.setAttribute("alt",data[i].name);
                    imageCard.setAttribute("src",data[i].imageUrl);
                    card.appendChild(imageCard);
                    let bodyCard = document.createElement("div");
                    bodyCard.setAttribute("class","card-body");
                    card.appendChild(bodyCard);
                    let cardTitle = document.createElement("h5");
                    cardTitle.setAttribute("class","card-title");
                    cardTitle.innerHTML = data[i].name;
                    bodyCard.appendChild(cardTitle);
                    let cardText = document.createElement("p");
                    cardText.setAttribute("class","card-text");
                    cardText.innerHTML = data[i].description;
                    bodyCard.appendChild(cardText);
                    let cardButton = document.createElement("a");
                    cardButton.setAttribute("class","btn btn-primary stretched-link");
                    cardButton.setAttribute("role","button");
                    cardButton.setAttribute("href","produit.html?id="+data[i]._id);
                    cardButton.innerHTML = "Détails du produit";
                    bodyCard.appendChild(cardButton);
                    
                }
            });
        } else {
            alert("HTTP-Error: " + error.status)
        }
    })
    .catch(error => alert("Un problème est survenu :" + error));

});



