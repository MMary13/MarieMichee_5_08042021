document.addEventListener('DOMContentLoaded', function() { 
    let tableBody = document.querySelector("main table tbody");
    let totalAmount = 0;
    for (let index = 0; index < localStorage.length; index++) {
        let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let row = createTableRow(objectItem.itemId,objectItem.itemName,objectItem.numberOfItem,objectItem.itemPrice,objectItem.totalPrice);
        tableBody.appendChild(row);
        totalAmount = totalAmount +objectItem.totalPrice;
    }
    document.getElementById("total").innerHTML = "Total de la commande : "+ totalAmount + "€";
    
    let submitButton = document.getElementById("valider");
    submitButton.addEventListener('click', function(event) {
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
            .then(function(response) {
                console.log(response);
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

//Créer une ligne du tableau du panier
function createTableRow(id,name,numberOfArticle,price,totalAmount){
    let row = document.createElement("tr");
    row.appendChild(createTrashRowElement(id));
    row.appendChild(createtRowElement(name));
    row.appendChild(createtRowElement(numberOfArticle));
    row.appendChild(createtRowElement(price +"€"));
    row.appendChild(createtRowElement(totalAmount+"€"));
    return row
}

//Créer l'élément pour supprimer une ligne
function createTrashRowElement(id) {
    let trashRowElement = document.createElement("th");
    trashRowElement.setAttribute("scope","row");
    trashRowElement.setAttribute("value", id);
    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fas fa-trash-alt");
    trashRowElement.appendChild(trashIcon);
    return trashRowElement
}

//Créer un élément d'une ligne
function createtRowElement(value) {
    let rowElement = document.createElement("td");
    rowElement.innerHTML = value;
    return rowElement
}

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