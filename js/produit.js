document.addEventListener('DOMContentLoaded', function(){ 
    let popUp = document.getElementById("myPopUp");
    popUp.style.display = "none";
    getNumberOfArticlesInCart();
    //Get the id from URL------------
    const id = getIdFromUrl();
    //HTTP GET/id Request on the API to display camera informations----------------------
    fetch(urlApi+id)
        .then(response => {
            if (response.ok) {
                response.json().then (data => {
                    let imageCamera = document.getElementById("img-camera");
                    imageCamera.setAttribute("alt",data.name);
                    imageCamera.setAttribute("src",data.imageUrl);
                    let titleElement = document.querySelector("#camera-informations h1");
                    titleElement.innerHTML = data.name;
                    titleElement.setAttribute("value", data.name);
                    document.getElementById("description-camera").innerHTML = data.description;
                    let priceElement = document.getElementById("prix-camera");
                    priceElement.innerHTML = "Prix : "+ data.price +"€";
                    priceElement.setAttribute("value",data.price);
                    let lensesSelector = document.getElementById("lenses");
                    let lensesType = data.lenses;
                    for (const lens of lensesType) {
                        let lensType = document.createElement("option");
                        lensType.setAttribute("value",lens);
                        lensType.innerHTML = lens;
                        lensesSelector.appendChild(lensType);
                    }
                });
            } else {
                alert("HTTP-Error: " + error.status)
            }

        })
        .catch(error => alert("Un problème est survenu :" + error));

        //Augmenter le nombre d'articles-----------------------------
        document.querySelector(".fa-plus-square").addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            let quantityElement = document.getElementById("quantity");
            let quantityValue = quantityElement.value;
            quantityValue++;
            quantityElement.value = quantityValue;
            quantityElement.setAttribute("placeholder", quantityValue);
        });

        //Diminuer le nombre d'articles-----------------------------
        document.querySelector(".fa-minus-square").addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            let quantityElement = document.getElementById("quantity");
            let quantityValue = quantityElement.value;
            if(quantityValue>1) {
                quantityValue--;
                quantityElement.value = quantityValue;
                quantityElement.setAttribute("placeholder", quantityValue);
            }
            
        });

        //Add product in localStorage 'on click'----------------------
        let addToCard = document.getElementById("addToCart");
        addToCard.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            //Get the data
            const productName = document.querySelector("#camera-informations h1").getAttribute("value");
            const productPrice = document.getElementById("prix-camera").getAttribute("value");
            const productOption = getSelectValue("lenses");
            const numberOfProduct = document.getElementById("quantity").value;
            const product = new CartItem(id,productName,productPrice,numberOfProduct,productOption);
            //Add to localStorage
            let key = (localStorage.length +1).toString();
            localStorage.setItem(key,JSON.stringify(product));
            getNumberOfArticlesInCart();
            //Display PopUp to see the shopping cart
            //window.open( page [,nom] [,options] )
            popUp.style.display = "block";
        });

});
//Functions----------------------------------
//On récupère l'élement html <select> puis on récupère la valeur selectionnée
function getSelectValue(selectId) {
	var selectElmt = document.getElementById(selectId);
	return selectElmt.options[selectElmt.selectedIndex].value;
}

//Classes------------------------------------ 
class CartItem {
    constructor(itemId,itemName, itemPrice,numberOfItem, itemOption) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.numberOfItem = numberOfItem;
        this.itemOption = itemOption;
        this.totalPrice = itemPrice*numberOfItem;
    }
}
