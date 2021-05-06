document.addEventListener('DOMContentLoaded', function() {
    displayValidatedOrder();
});

//Function----------------------------
//Display data of validated order----------
function displayValidatedOrder() {
    //GET order id from URL------------
    const orderId = getIdFromUrl();
    let orderValidationText = document.getElementById("order-validation");
    orderValidationText.innerHTML = "Vous avez passé la commande n° <strong>" + orderId + "</strong> a été validée et est en cours de préparation.</br>Retrouvez ci-dessous le récapitulatif de cette commande et les détails de livraison."
        
    //Display order summary -----------------------
    let tableBody = document.querySelector("main table tbody");
    let totalAmount = 0;
    for (let index = 0; index < localStorage.length; index++) {
        let objectItem = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let row = createSummaryTableRow(objectItem.itemName,objectItem.numberOfItem,objectItem.itemPrice,objectItem.totalPrice);
        tableBody.appendChild(row);
        totalAmount = totalAmount +objectItem.totalPrice;
    }
    document.getElementById("total").innerHTML = "Total de la commande : "+ totalAmount + "€";
    
    //Clear the localStorage----------------------
    localStorage.clear();
    getNumberOfArticlesInCart();
}