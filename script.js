function createItem(name, location, type, stock, cost) {
    return {
        name: name,
        location: location,
        type: type,
        stock: stock,
        cost: cost,
    };    
}

let items = [
    createItem("Milk", "Fridge", "Dairy", 2, 8),
    createItem("Garlic", "Pantry", "Vegetable", 4, 2),
    createItem("Chicken 1kg", "Freezer", "Meat", 1, 17.80),
    createItem("Coca Cola", "Fridge", "Drinks", 2, 10),
    createItem("Jasmine Rice 5kg", "Fridge", "Grains", 1, 20),
    createItem("Maggi Mee", "Pantry", "Noodles", 1, 8.90),
    createItem("Sos Cili", "Pantry", "Sauces", 1, 8.90),            
];

const grid = document.getElementById("itemGrid");

function renderItems() {
    grid.innerHTML = "";

    items.forEach(function (item) {
        const box = document.createElement("div");
        box.classList.add("itemCard");
        box.textContent = item.name + "x" + item.stock;
        grid.appendChild(box);
    });
}

renderItems();

