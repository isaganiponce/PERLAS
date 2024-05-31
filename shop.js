function setPopUpImage(buttonElement) {
    var imgElement = buttonElement.previousElementSibling.previousElementSibling;
    var h2Element = buttonElement.previousElementSibling;

    document.getElementById("popUpImg").src = imgElement.src;
    document.getElementById("prodName").textContent = h2Element.textContent;
}

function popUp() {
    document.getElementById("popUps").style.display = "flex";
}
    
function closePopUp() {
    document.getElementById("popUps").style.display = "none";
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}