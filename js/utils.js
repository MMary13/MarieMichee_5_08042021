let urlApi = "http://localhost:3000/api/cameras/";
//Afficher le nombre d'articles dans le panier
document.addEventListener('DOMContentLoaded', function(){ 
let panierLink = document.querySelector(".nav-link");
panierLink.innerHTML = "Panier (" +localStorage.length +")";
});