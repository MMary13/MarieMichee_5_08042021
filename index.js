document.addEventListener('DOMContentLoaded', function(){ 
    let cards = document.getElementsByClassName("card");

// GET all cameras --------------------------------
fetch("http://localhost:3000/api/cameras/")
    .then(response => {
        if (response.ok) {
            response.json().then (data => {
                for (let i = 0; i < data.length; i++) {
                    cards[i].getElementsByClassName("card-img-top")[0].setAttribute("src",data[i].imageUrl);
                    cards[i].getElementsByClassName("card-title")[0].innerHTML = data[i].name;
                    cards[i].getElementsByClassName("card-text")[0].innerHTML = data[i].description;
                    cards[i].getElementsByClassName("btn")[0].setAttribute("href","produit.html?id="+data[i]._id);
                }
            });
        } else {
            alert("HTTP-Error: " + error.status)
        }
    })
    .catch(error => alert("Un problème est survenu :" + error));

});

