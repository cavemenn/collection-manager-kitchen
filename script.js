// this function is so that its easy to add items in the future
function createItem(name, location, type, stock, cost) {
    return {
        name: name,
        location: location,
        type: type,
        stock: stock,
        cost: cost,
    };    
}

// setting up the initial items
let items = [
    createItem("Milk", "Fridge", "Dairy", 2, 8),
    createItem("Garlic", "Pantry", "Vegetable", 4, 2),
    createItem("Chicken 1kg", "Freezer", "Meat", 1, 17.80),
    createItem("Coca Cola", "Fridge", "Drinks", 2, 10),
    createItem("Jasmine Rice 5kg", "Fridge", "Grains", 1, 20),
    createItem("Maggi Mee", "Pantry", "Noodles", 1, 8.90),
    createItem("Sos Cili", "Pantry", "Sauces", 1, 8.90),            
];

const itemGrid = document.getElementById("itemGrid");

function renderItems() {
    itemGrid.innerHTML = ""; // empties the grid so wont give duplicates

    items.forEach(function (item) {
        const box = document.createElement("div"); //creates a div
        box.classList.add("itemCard"); //creates a class that i can edit later in styles.css
        box.textContent = item.name + "x" + item.stock;
        itemGrid.appendChild(box); //pushes the box created into the page within itemGrid
    });
}

renderItems();

// to add new items into the initial items
const addItemForm = document.getElementById("addItemForm");

addItemForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("itemName").value;
    const stock = Number(document.getElementById("itemStock").value);
    const location = document.getElementById("itemLocation").value;
    const type = document.getElementById("itemType").value;
    const price = Number(document.getElementById("itemPrice").value);

    const newItem = createItem(name, location, type, stock, price);

    items.push(newItem);

    renderItems();
    
    addItemForm.reset();
    
})

