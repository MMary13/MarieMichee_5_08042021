document.addEventListener('DOMContentLoaded', function() { 
    getNumberOfArticlesInCart();
    let tableBody = document.querySelector("main table tbody");
    let totalAmount = 0;
    for (let index = 0; index < localStorage.length; index++) {
        let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let row = createTableRow(localStorage.key(index),objectItem.itemName,objectItem.numberOfItem,objectItem.itemPrice,objectItem.totalPrice);
        tableBody.appendChild(row);
        totalAmount = totalAmount +objectItem.totalPrice;
    }
    document.getElementById("total").innerHTML = "Total de la commande : "+ totalAmount + "€";
    
    //Supprimer un élément du panier 'onClick' de l'icon poubelle
    let trashIcons = document.getElementsByClassName("trash-link");
    for (const trashIcon of trashIcons) {
        trashIcon.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            localStorage.removeItem(trashIcon.getAttribute("value"));
            getNumberOfArticlesInCart();
            let row = trashIcon.parentElement.parentElement;
            tableBody.removeChild(row);
        });
    }
    

    //Déclencher la validation du panier lors d'un clic
    document.getElementById("valider").addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        //Valider le formulaire et récupérer les données
        var contactForm = document.getElementById('contact-form')
        if(formValidation(contactForm)) {
            console.log("Form validated");
        //Préparer le message
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
        //Récupérer les id des produits de la commande
        let products = [];
        for (let index = 0; index < localStorage.length; index++) {
            let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
            products.push(objectItem.itemId);
        }
        //Construire le message
        let orderMessage = {
            contact : contact,
            products : products
        }
        let data = JSON.stringify(orderMessage);
        //Requête POST
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let fetchData = {
            method: 'POST',
            body: data,
            headers: myHeaders
        }
        fetch(urlApi+"order/",fetchData)
            .then(response => {
                if (response.ok) {
                response.json().then (data => {
                    const orderId = data.orderId;
                    window.location.href ="commande.html?id="+orderId;
                });
            } else {
                alert("HTTP-Error: " + error.status)
            }
            })
            .catch(error => alert("Un problème est survenu :" + error));

        //Renvoyer à la page commande
        }else {
            console.error("Form not correct!");
        }
    });
});


//Functions ------------------------------------------------------------------
//----------------------------------------------------------------------------

//Valider un formulaire
function formValidation(form) {
    let formInputs = form.querySelectorAll(("input"));
    let valid;
    for (const input of formInputs) {
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
    }
    return valid;
}

//Valider un input obligatoire
function validRequiredInput(input) {
    if (input.value == "") {
        input.style.borderColor= '#B36F98';
        input.nextElementSibling.innerHTML = 'Vous devez compléter ce champ !';
        return false;
    } else {
        input.style.borderColor= '#ced4da';
        input.nextElementSibling.innerHTML = '';
        return true;
    }
}

//Valider un input de type email
function validEmailInput(input) {    
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(regex)) {
        input.style.borderColor= '#ced4da';
        input.nextElementSibling.innerHTML = '';
        return true;
    } else {
        input.style.borderColor= '#B36F98';
        input.nextElementSibling.innerHTML = 'Votre email doit être de la forme name@exemple'
        return false;
    }
}

//Valider un input de type checkbox
function validCheckboxInput(input) {
    if (input.checked) {
        input.nextElementSibling.nextElementSibling.innerHTML = '';
        return true;
    } else {
        input.nextElementSibling.nextElementSibling.innerHTML = 'Vous devez accepter avant de valider la commande.'
        return false;
    }
}