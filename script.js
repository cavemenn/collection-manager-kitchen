// this function is so that its easy to add items in the future
function createItem(name, location, type, stock, cost, image, rating) {
    return {
        name: name,
        location: location,
        type: type,
        stock: stock,
        cost: cost,
        image: image || null,
        rating: rating || 0,
    };    
};

// setting up the initial items
let items = [
    createItem("Milk", "Fridge", "Dairy", 2, 8, "images/milk.png",5),
    createItem("Garlic", "Pantry", "Vegetable", 4, 2, "images/garlic.jpeg", 5),
    createItem("Chicken 1kg", "Freezer", "Meat", 1, 17.80, "images/chicken.jpeg", 5),
    createItem("Coca Cola", "Fridge", "Drinks", 2, 10, "images/cola.jpeg", 2),
    createItem("Jasmine Rice 5kg", "Fridge", "Grains", 1, 20, "images/rice.jpeg", 5),
    createItem("Maggi Mee", "Pantry", "Noodles", 1, 8.90, "images/maggi.jpeg", 3),
    createItem("Sos Cili", "Pantry", "Sauces", 1, 8.90, "images/chilli.jpeg", 4),            
];

const itemGrid = document.getElementById("itemGrid");

let currentLocation = "All"; //location set when load into page
let currentType = "All"; //type set when load into page

function renderItems() {
    itemGrid.innerHTML = ""; // empties the grid so wont give duplicates

    const visibleItems = items.filter(function(item){
        return (currentLocation === "All" || item.location === currentLocation) &&
        (currentType === "All" || item.type === currentType);
    })

    visibleItems.forEach(function (item) {
        const box = document.createElement("div"); //creates a div
        box.classList.add("itemCard"); //creates a class that i can edit later in styles.css
        
        // const info = document.createElement("span");
        // info.textContent = item.name + "x" + item.stock;

        const nameInCard = document.createElement("h3");
        nameInCard.textContent = item.name;

        const tags = document.createElement("div");
        tags.classList.add("cardTags");

        const locationInCard = document.createElement("span");
        locationInCard.classList.add("tag","tag" + item.location);
        locationInCard.textContent = item.location;

        const typeInCard = document.createElement("span");
        typeInCard.classList.add("tag","tagType");
        typeInCard.textContent = item.type;

        tags.appendChild(locationInCard);
        tags.appendChild(typeInCard);

        const meta = document.createElement("div");
        meta.classList.add("cardMeta");

        const stockInCard = document.createElement("span");
        stockInCard.textContent = "Quantity: " + item.stock;

        const costInCard = document.createElement("span");
        costInCard.classList.add("cardPrice");
        costInCard.textContent = "RM"+ item.cost.toFixed(2) +" each";

        meta.appendChild(stockInCard);
        meta.appendChild(costInCard);

        if (item.image) {
            const pic = document.createElement("img");
            pic.src = item.image;
            pic.alt = item.name;
            pic.classList.add("cardImage");
            box.appendChild(pic);
        } else {
            const placeholder = document.createElement("div");
            placeholder.classList.add("cardPlaceholder");
            placeholder.textContent = "No photo";
            box.appendChild(placeholder);
        }

        const ratingInCard = document.createElement("div");
        ratingInCard.classList.add("cardRating");
        ratingInCard.textContent = "Wife Approval: " + "★".repeat(item.rating) + "☆".repeat(5-item.rating);

        const removeButton = document.createElement("button");
        removeButton.classList.add("btnRemove");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            const realIndex = items.indexOf(item);
            items.splice(realIndex,1);
            renderItems();
        });

        // box.appendChild(info);
        box.appendChild(nameInCard);
        box.appendChild(tags);
        box.appendChild(meta);
        box.appendChild(ratingInCard);
              
        box.appendChild(removeButton);
        itemGrid.appendChild(box); //pushes the box created into the page within itemGrid
    });
};

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
    const rating = Number(document.getElementById("itemRating").value);
    const file = document.getElementById("itemImage").files[0];
    const addMessage = document.getElementById("addMessage");

    function addItem(image) {
        items.push(createItem(name, location, type, stock, price, image, rating));
        renderItems();
        addItemForm.reset();

        addMessage.textContent = name + " has been successfully added!";
        setTimeout(function () {
        addMessage.textContent = "";
        }, 3000);
    }

    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            addItem(reader.result); 
        });
        reader.readAsDataURL(file);
    } else {
        addItem(null);
    }
    
});

// filterting tabs make visible on html
const tabs = document.getElementById("tabs");
const locationNames = ["All", "Fridge", "Freezer", "Pantry"];

locationNames.forEach(function (name) {
    const tabButton = document.createElement("button");
    tabButton.textContent = name;

    if (name === currentLocation) {
        tabButton.classList.add("active")
    }

    tabButton.addEventListener("click", function () {
        currentLocation = name;
        renderItems();

        tabs.querySelectorAll("button").forEach(function(btn) {
            btn.classList.remove("active")
        });

        tabButton.classList.add("active");
    });

    tabs.appendChild(tabButton);
});

// type tabs make visible on html
const filter = document.getElementById("filter");
const typeNames = ["All", "Dairy", "Meat", "Fish", "Beer", "Drinks", "Vegetable", "Noodles", "Grains", "Sauces", "Others"];

const typeSelect = document.createElement("select");

typeNames.forEach(function (typeName) {
    const option = document.createElement("option");
    option.textContent = typeName;
    typeSelect.appendChild(option);
});

typeSelect.addEventListener("change", function () {
    currentType = typeSelect.value;
    renderItems();
});

filter.appendChild(typeSelect);

// thinking meme button
const thinkImages = [
  "images/think1.jpeg",
  "images/think2.jpg",
  "images/think3.jpg",
  "images/think4.jpeg",
  "images/think5.jpeg",
];

const thinkImg = document.getElementById("thinkImg");
const thinkBtn = document.getElementById("thinkBtn");

// preload so there's no flicker when swapping
thinkImages.forEach(src => { new Image().src = src; });

let lastThinkIndex = 0; // matches the starting src in index.html (think1.png)

thinkBtn.addEventListener("click", () => {
  let next;
  do {
    next = Math.floor(Math.random() * thinkImages.length);
  } while (next === lastThinkIndex);

  lastThinkIndex = next;
  thinkImg.src = thinkImages[next];
});
