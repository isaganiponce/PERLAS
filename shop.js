// Function to set the image and name in the popup
function setPopUpImage(buttonElement) {
    var imgElement = buttonElement.previousElementSibling.previousElementSibling;
    var h2Element = buttonElement.previousElementSibling;

    document.getElementById("popUpImg").src = imgElement.src;
    document.getElementById("prodName").textContent = h2Element.textContent;

    let btn = document.getElementById("btnBuy");
    let val = btn.value;
    document.getElementById("price").innerHTML = "₱" + val;
}

// Function to display the popup
function popUp() {
    document.getElementById("popUps").style.display = "flex";
}

// Function to close the popup
function closePopUp() {
    document.getElementById("popUps").style.display = "none";
}

// Function to open the form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

// Function to close the form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// Function to open the check-out form
function openCheckout() {
    document.getElementById("checkout").style.display = "flex";
}

//Funtion for opening the order placed sign
function placedorder(){
    var fullname = document.getElementById("fullname").value;
    var address = document.getElementById("address").value;


    if(fullname != ""){
        if(address != ""){
            document.getElementById("checkout").style.display = "none";
            return true;
            } else {
                document.getElementById("address").style.borderBlockColor = "red";
                document.getElementById("errorMessage").innerHTML = "Enter your Address";
                return false;
            }
        } else {
        document.getElementById("fullname").style.borderBlockColor = "red";
        document.getElementById("errorMessage").innerHTML = "Enter your Full Name";
        return false;
    }
} 

//Funtion for closing the check out menu
function closecheckout(){
    document.getElementById("checkout").style.display = "none";
}
let products = [];

// Function to add an item to the cart
function addtocart(event) {
    const button = event.target;
    const container = button.closest('.popUpContainer');
    const name = container.querySelector('.prodName').textContent;

    const existingItemIndex = products.findIndex(product => product.name === name);

    if (existingItemIndex > -1) {
        // Item already exists in the cart, update its quantity and price
        const cartItem = document.querySelector(`.items[data-name="${name}"]`);
        const quantityElement = cartItem.querySelector('.itemquantity');
        const priceElement = cartItem.querySelector('.itemprice');

        let quantity = parseInt(quantityElement.textContent);
        quantity += 1;
        quantityElement.textContent = quantity;

        const pricePerUnit = parseFloat(priceElement.getAttribute('data-price-per-unit'));
        const newPrice = pricePerUnit * quantity;
        priceElement.textContent = `₱${newPrice.toFixed(2)}`;
    } else {
        // Item does not exist in the cart, add it
        const image = container.querySelector('.popUpImg').src;
        const priceText = container.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));

        products.push({ name: name, price: price });

        const cartitem = document.createElement('div');
        cartitem.classList.add('items');
        cartitem.setAttribute('data-name', name); // Add a data attribute for easier querying

        const cartinfo = document.createElement('div');
        cartinfo.classList.add('info');

        const cartname = document.createElement('div');
        cartname.classList.add('itemname');
        cartname.textContent = name;

        const cartimage = document.createElement('div');
        cartimage.classList.add('tabimg');
        const img = document.createElement('img');
        img.src = image;
        cartimage.appendChild(img);

        const cartprice = document.createElement('div');
        cartprice.classList.add('itemprice');
        cartprice.textContent = `₱${price.toFixed(2)}`;
        cartprice.setAttribute('data-price-per-unit', price.toFixed(2));

        const cartquantity = document.createElement('div');
        cartquantity.classList.add('quantity');
        cartquantity.innerHTML = `
            <span><input type="button" value="-" class="quantitysubtract" onclick="decrement(event)"></span>
            <span class="itemquantity" id="${name}">1</span>
            <span><input type="button" value="+" class="quantityadd" id="${name}" onclick="increment(event)"></span>
            <span><input type="button" value="X" class="remove" id="${name}" onclick="removeitem(event)"></span>
        `;

        cartitem.appendChild(cartname);
        cartinfo.appendChild(cartimage);
        cartinfo.appendChild(cartprice);
        cartinfo.appendChild(cartquantity);

        const listTab = document.querySelector('.form-container .prodInfo');
        listTab.appendChild(cartitem);
        listTab.appendChild(cartinfo);
    }

    updateTotalPrice();
}
// Function to handle quantity decrement
function decrement(event) {
    const button = event.target;
    const quantityElement = button.closest('.quantity').querySelector('.itemquantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity -= 1;
        quantityElement.textContent = quantity;

        const itemElement = button.closest('.info');
        const priceElement = itemElement.querySelector('.itemprice');
        const pricePerUnit = parseFloat(priceElement.getAttribute('data-price-per-unit'));
        const newPrice = pricePerUnit * quantity;
        priceElement.textContent = `₱${newPrice.toFixed(2)}`;

        updateTotalPrice();
    }
}

// Function to handle quantity increment
function increment(event) {
    const button = event.target;
    const quantityElement = button.closest('.quantity').querySelector('.itemquantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;

    const itemElement = button.closest('.info');
    const priceElement = itemElement.querySelector('.itemprice');
    const pricePerUnit = parseFloat(priceElement.getAttribute('data-price-per-unit'));
    const newPrice = pricePerUnit * quantity;
    priceElement.textContent = `₱${newPrice.toFixed(2)}`;

    updateTotalPrice();
}

// Function to remove an item from the cart
function removeitem(event) {
    const button = event.target;
    const itemElement = button.closest('.info');
    const itemName = itemElement.querySelector('.itemname').textContent;

    // Remove the item from the products array
    const index = products.findIndex(product => product.name === itemName);
    if (index > -1) {
        products.splice(index, 1);
    }

    // Remove the item element from the DOM
    itemElement.remove();
    updateTotalPrice();
}

// Function to update the total price
function updateTotalPrice() {
    let total = 0;
    const cartItems = document.querySelectorAll('.info');
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.itemprice');
        // Strip non-numeric characters before parsing the price
        const price = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ""));
        total += price;
    });
    document.getElementById('totalPrice').textContent = `Total: ₱${total.toFixed(2)}`;
}
