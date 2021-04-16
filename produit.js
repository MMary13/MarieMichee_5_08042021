document.addEventListener('DOMContentLoaded', function(){ 
    let cameraInfo = document.getElementById("camera-informations");

    
function getCameraById (id) {
    let url = "http://localhost:3000/api/cameras/"+id;
    fetch(url)
        .then(response => {
            if (response.ok) {
                response.json().then (data => {
                    cameraInfo.getElementsByTagName("h1")[0].innerHTML = data.name;
                    document.getElementById("description-camera").innerHTML = data.description;
                    document.getElementById("prix-camera").innerHTML = data.price;
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
