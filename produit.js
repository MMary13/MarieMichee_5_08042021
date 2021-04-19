document.addEventListener('DOMContentLoaded', function(){ 
  
function getCameraById (id) {
    let url = "http://localhost:3000/api/cameras/"+id;
    fetch(url)
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
} 

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
getCameraById(id);
});
