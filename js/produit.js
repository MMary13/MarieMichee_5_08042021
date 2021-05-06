document.addEventListener('DOMContentLoaded', function(){ 
    let popUp = document.getElementById("myPopUp");
    popUp.style.display = "none";
    getNumberOfArticlesInCart();
    //Request GET by ID on the API to display product data----------------------
    const id = getIdFromUrl();
    getDataFromApiById(id);
    //Increase the number of articles-----------------------------
    increaseArticleNumberOnClick();
    //Decrease the number of articles-----------------------------
    decreaseArticleNumberOnClick();
    //Add product in localStorage 'on click'----------------------
    addProductToCartOnClick(id,popUp);
});


//Functions----------------------------------
//--------------------------------------------
//GET data from API by ID---------------------
function getDataFromApiById(id) {
    fetch(urlApi+id)
        .then(response => {
            if (response.ok) {
                response.json().then (data => {
                    displayProductData(data.name,data.imageUrl,data.description,data.price,data.lenses);
                });
            } else {
                alert("HTTP-Error: " + error.status + error);
            }

        })
        .catch(error => alert("Un problème est survenu :" + error));
}

//Display the data of a product on the product page
function displayProductData(productName,productUrl,productDescription,productPrice,productOptions) {
    let imageCamera = createImageElement("img-fluid",productName,productUrl);
    document.getElementById("image-container").appendChild(imageCamera);
    let titleElement = document.querySelector("#camera-informations h1");
    titleElement.innerHTML = productName;
    titleElement.setAttribute("value", productName);
    document.getElementById("description-camera").innerHTML = productDescription;
    let priceElement = document.getElementById("prix-camera");
    priceElement.innerHTML = "Prix : "+ productPrice +"€";
    priceElement.setAttribute("value",productPrice);
    let lensesSelector = document.getElementById("lenses");
    let lensesType = productOptions;
    createSelectOptions(lensesSelector,lensesType);
}

//Create the list of options of a "select" element
function createSelectOptions(selectElement, selectOptions) {
    for (const option of selectOptions) {
        let optionElement = createElementWithValue("option","",option);
        optionElement.setAttribute("value",option);
        selectElement.appendChild(optionElement);
    }
}

//Increase the number of articles----------------
function increaseArticleNumberOnClick() {
    document.querySelector("#moreButton").addEventListener('click', function(event) {
        event.preventDefault();
        let quantityElement = document.getElementById("quantity");
        let quantityValue = quantityElement.value;
        quantityValue++;
        quantityElement.value = quantityValue;
        quantityElement.setAttribute("placeholder", quantityValue);
    });
}

//Decrease the number of articles-------------------
function decreaseArticleNumberOnClick() {
    document.querySelector("#minusButton").addEventListener('click', function(event) {
        event.preventDefault();
        let quantityElement = document.getElementById("quantity");
        let quantityValue = quantityElement.value;
        if(quantityValue>1) {
            quantityValue--;
            quantityElement.value = quantityValue;
            quantityElement.setAttribute("placeholder", quantityValue);
        }      
    });
}

//Add product to cart OnClick-----------------------
function addProductToCartOnClick(id, popUp) {
    document.getElementById("addToCart").addEventListener('click', function(event) {
        event.preventDefault();
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
        popUp.style.display = "block";
    });
}

//Get the value of a "select" element
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
