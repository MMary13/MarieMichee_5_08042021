document.addEventListener('DOMContentLoaded', function() { 
    let contactForm = document.getElementById('contact-form');
    //Hide alerts-----------
    let formAlerts = document.getElementsByClassName("feedback");
    for (const alert of formAlerts) {
        alert.style.display = "none";
    }
    //Hide main content if cart is empty--------------
    displayCorrectContent();
    //Update number of articles and total amount--------
    globalCartValuesUpdate();
    //Display informations in the table--------------
    let tableBody = document.querySelector("main table tbody");
    displayDataInCartTable(tableBody);
    //Delete an item from cart when click on the trash icon
    deleteProductFromCartOnClick(tableBody);
    //Increase article number when click on more Button----------------------
    increaseArticleQuantityOnClick();
    //Decrease article number when click on minus Button--------------------
    decreaseArticleQuantityOnClick();
    //Display error message for each input 'OnChange'
    displayFormErrorOnChange(contactForm);
    //Validation of the order when click on the Button validation--------
    orderValidationOnClick(contactForm);
});


//Functions ------------------------------------------------------------------
//----------------------------------------------------------------------------
//Hide main content if cart is empty--------------
function displayCorrectContent() {
    if (localStorage.length<1) {
        document.getElementById("main-content").style.display = "none";
        document.getElementById("empty-cart").style.display = "block";
    }else {
        document.getElementById("empty-cart").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    } 
}

//Get total order amount-------------
function getTotalOrder() {
    let totalAmount = 0;
    for (let index = 0; index < localStorage.length; index++) {
        let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
        totalAmount = totalAmount +objectItem.totalPrice;
    }
    document.getElementById("total").innerHTML = "Total de la commande : "+ totalAmount + "€";
    
}

//Update values of the cart page-----------
function globalCartValuesUpdate() {
    getNumberOfArticlesInCart();
    getTotalOrder();
}

//Display data in cart table-------------------
function displayDataInCartTable(tableBody) {
    for (let index = 0; index < localStorage.length; index++) {
        let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let row = createCartTableRow(localStorage.key(index),objectItem.itemName,objectItem.numberOfItem,objectItem.itemPrice,objectItem.totalPrice);
        tableBody.appendChild(row);
    }
}

//Delete product from cart----------------------------------
function deleteProductFromCartOnClick(tableBody) {
    let trashIcons = document.getElementsByClassName("trash-link");
    for (const trashIcon of trashIcons) {
        trashIcon.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem(trashIcon.getAttribute("value"));
            let row = trashIcon.parentElement.parentElement;
            tableBody.removeChild(row);
            globalCartValuesUpdate();
            displayCorrectContent();
        });
    }
}

//Increase number of article in cart----------------
function increaseArticleQuantityOnClick() {
    let moreButtons = document.getElementsByClassName("fa-plus-square");
    for (const moreButton of moreButtons) {
        moreButton.addEventListener('click', function(event) {
            event.preventDefault();
            let quantityElement = moreButton.parentElement.nextElementSibling;
            let quantityValue = quantityElement.getAttribute("value");
            quantityValue++;
            quantityElement.setAttribute("value",quantityValue);
            quantityElement.innerHTML = quantityValue;
            let key = moreButton.parentElement.getAttribute("value");
            quantityItemUpdate(key,quantityValue);
            globalCartValuesUpdate()
        });
    }
}

//Decrease number of article in cart--------------
function decreaseArticleQuantityOnClick() {
    let minusButtons = document.getElementsByClassName("fa-minus-square");
    for (const minusButton of minusButtons) {
        minusButton.addEventListener('click', function(event) {
            event.preventDefault();
            let quantityElement = minusButton.parentElement.previousElementSibling;
            let quantityValue = quantityElement.getAttribute("value");
            if(quantityValue>1) {
                quantityValue--;
                quantityElement.setAttribute("value", quantityValue);
                quantityElement.innerHTML = quantityValue;
                let key = minusButton.parentElement.getAttribute("value");
                quantityItemUpdate(key,quantityValue);
                globalCartValuesUpdate()
            }
        });
    }
}

//Update the quantity of an item in localStorage-----------
function quantityItemUpdate(key,quantity) {
    let item = JSON.parse(localStorage.getItem(key));
    item.numberOfItem = quantity;
    item.totalPrice = item.numberOfItem*item.itemPrice;
    localStorage.setItem(key, JSON.stringify(item));
}

//Display error message for each input 'OnChange'
function displayFormErrorOnChange(contactForm) {
    let formInputs = contactForm.querySelectorAll(("input"));
    for (const input of formInputs) {
        input.addEventListener("change", function() {
            inputValidation(this);
        });
    }
}

//Form validation-------------------------------
function formValidation(form) {
    let formInputs = form.querySelectorAll(("input"));
    let valid;
    for (const input of formInputs) {
        valid = inputValidation(input);
    }
    return valid;
}

//Input validation---------------------------
function inputValidation(input){
    let valid;
    switch(input.type) {
        case 'email':
            valid = validEmailInput(input);
        break;
        case 'checkbox':
            valid = validCheckboxInput(input);
        break;
        default:
            valid = validRequiredInput(input);
    }
    return valid;
}

//Required input validation--------------------
function validRequiredInput(input) {
    if (input.value == "") {
        input.nextElementSibling.style.display = "block";
        return false;
    } else {
        input.nextElementSibling.style.display = "none";
        return true;
    }
}

//Email input validation-------------------------
function validEmailInput(input) {    
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(regex)) {
        input.nextElementSibling.style.display = "none";
        return true;
    } else {
        input.nextElementSibling.style.display = "block";
        return false;
    }
}

//Checkbox input validation----------------------
function validCheckboxInput(input) {
    if (input.checked) {
        input.nextElementSibling.nextElementSibling.style.display = "none";
        return true;
    } else {
        input.nextElementSibling.nextElementSibling.style.display = "block";
        return false;
    }
}

//GET contact informations from the form----------
function getContactInfo() {
    const firstName = document.getElementById("firstNameInput").value;
    const lastName = document.getElementById("lastNameInput").value;
    const address = document.getElementById("addressInput").value;
    const city = document.getElementById("cityInput").value;
    const email = document.getElementById("emailInput").value;
    let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        }
    return contact;
}

//GET the list of products for the order-----------------
function getListOfProducts() {
    let products = [];
        for (let index = 0; index < localStorage.length; index++) {
            let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
            products.push(objectItem.itemId);
        }
    return products;
}

//POST request on the API to valid the order------------
function postOrderToApi(contact,products) {
    //Build the message
    let orderMessage = {
        contact : contact,
        products : products
    }
    let data = JSON.stringify(orderMessage);
    //Build the data (headers + body)-----------
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let fetchData = {
        method: 'POST',
        body: data,
        headers: myHeaders
    }
    //POST Request on the API-----------
    fetch(urlApi+"order/",fetchData)
        .then(response => {
            if (response.ok) {
            response.json().then (data => {
                const orderId = data.orderId;
                //Redirection to the order confirmation page
                window.location.href ="commande.html?id="+orderId;
            });
        } else {
            alert("HTTP-Error: " + error.status)
        }
        })
        .catch(error => alert("Un problème est survenu :" + error));
}

//Order validation OnClick-----------------
function orderValidationOnClick(contactForm) {
    document.getElementById("valider").addEventListener('click', function(event) {
        event.preventDefault();
        //Form validation-----------------
        if(formValidation(contactForm)) {
        //Get contact informations---------
        let contact = getContactInfo();
        //Get the list of products---------
        let products = getListOfProducts();
        //POST the order to API------------
        postOrderToApi(contact,products);
        }
    });
}