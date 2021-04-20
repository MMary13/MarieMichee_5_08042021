document.addEventListener('DOMContentLoaded', function(){ 


//Get the id from URL------------
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
//HTTP GET/id Request on the API to display camera informations----------------------
let urlApi = "http://localhost:3000/api/cameras/"+id;
fetch(urlApi)
    .then(response => {
        if (response.ok) {
            response.json().then (data => {
                let imageCamera = document.getElementById("img-camera");
                imageCamera.setAttribute("alt",data.name);
                imageCamera.setAttribute("src",data.imageUrl);
                document.querySelector("#camera-informations h1").innerHTML = data.name;
                document.getElementById("description-camera").innerHTML = data.description;
                document.getElementById("prix-camera").innerHTML = "Prix : "+ data.price +"€";
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

    //Add product in localStorage 'on click'----------------------
    let addToCard = document.getElementById("addToCart");
    addToCard.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    //Get the data
    const productName = document.querySelector("#camera-informations h1");
    const productPrice = document.getElementById("prix-camera");
    const lenses = document.getElementById("lenses");
    const productOption = lenses.options[lenses.selectedIndex].value;
    const quantity = document.getElementById("article-number");
    const numberOfProduct = quantity.options[quantity.selectedIndex].value;
    const product = new CartItem(id,productName,productPrice,numberOfProduct,productOption);
    //Add to localStorage
    const productKey = (localStorage.length +1).toString();
    localStorage.setItem(productKey,product);
    console.log("Product add to the shopping cart");
    //Display PopUp to see the shopping cart
    });

});
//Functions----------------------------------
function getSelectValue(selectId)
{
	/**On récupère l'élement html <select>*/
	var selectElmt = document.getElementById(selectId);
	/**
	selectElmt.options correspond au tableau des balises <option> du select
	selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
	*/
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
