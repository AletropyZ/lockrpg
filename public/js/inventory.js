const socket = io();

var inventory = []
var currentItem = null;

function renderItems()
{
    let invDisplay = document.getElementById("InvContainer");
    invDisplay.innerHTML = '<h2>Inventário</h2>';

    for(i = 0; i < inventory.length; i++)
    {
        let item = inventory[i];
        let node = document.createElement("div");
        node.className = "item"
        node.setAttribute("itemId", i);
        node.innerHTML = `
        <p id="itemCountDisplay">${item.count}x</p>
        <p id="itemNameDisplay">${item.name}</p>
        <p id="itemDescDisplay" class="itemDesc">${item.description}</p>
        <i onclick="removeItem(${i})" class="fas fa-trash-alt redBtnHover"></i>
        <i onclick="sRollDice(${i})" class="fas fa-dice-d20"></i>
        <i onclick="viewItem(${i})" class="fas fa-eye"></i>`;

        invDisplay.appendChild(node);
    }
}

function sRollDice(index)
{
    itemDice = inventory[index].dice;

    rollDice(itemDice);
}

function viewItem(index)
{
    var itemName = document.getElementById("itemName");
    var itemDescription = document.getElementById("itemDesc");
    var itemCount = document.getElementById("itemCount");
    var itemValue = document.getElementById("itemValue");
    var itemDice = document.getElementById("itemDice");

    document.getElementById("saveBtn").innerHTML = "Salvar";
    document.getElementById("removeBtn").style.display = "block";
    document.getElementById("itemContainer").style.left = "1%";
    document.getElementById("InvContainer").style.left = "66%";
    document.getElementById("newBtn").style.left = "95%";

    let item = inventory[index];
    currentItem = index;

    itemName.value = item.name;
    itemDescription.value = item.description;
    itemCount.value = item.count;
    itemValue.value = item.price;
    itemDice.value = item.dice;
}

function saveItem(index)
{
    var itemName = document.getElementById("itemName");
    var itemDescription = document.getElementById("itemDesc");
    var itemCount = document.getElementById("itemCount");
    var itemValue = document.getElementById("itemValue");
    var itemDice = document.getElementById("itemDice");
    if(currentItem == null) return createItem();

    let item = inventory[index];
    
    item.name = itemName.value;
    item.count = itemCount.value;
    item.price = itemValue.value;
    item.dice = itemDice.value;

    saveUserInventory();
    renderItems();
    document.getElementById("InvContainer").style.left = "50%";
    document.getElementById("newBtn").style.left = "80%";
    document.getElementById("itemContainer").style.left = "-450px";
}

function createItem()
{
    var itemName = document.getElementById("itemName");
    var itemDescription = document.getElementById("itemDesc");
    var itemCount = document.getElementById("itemCount");
    var itemValue = document.getElementById("itemValue");
    var itemDice = document.getElementById("itemDice");

    let item = {
        name: itemName.value,
        description: itemDescription.value,
        count: itemCount.value,
        price: itemValue.value,
        dice: itemDice.value
    };

    inventory.push(item);
    saveUserInventory();
    renderItems();

    document.getElementById("InvContainer").style.left = "50%";
    document.getElementById("newBtn").style.left = "80%";
    document.getElementById("itemContainer").style.left = "-450px";

    document.getElementById("saveBtn").innerHTML = "Salvar";
    document.getElementById("removeBtn").style.display = "block";
}

function newItem()
{
    var itemName = document.getElementById("itemName");
    var itemDescription = document.getElementById("itemDesc");
    var itemCount = document.getElementById("itemCount");
    var itemValue = document.getElementById("itemValue");
    var itemDice = document.getElementById("itemDice");

    itemName.value = "";
    itemDescription.value = "";
    itemCount.value = "";
    itemValue.value = "";
    itemDice.value = "";

    document.getElementById("saveBtn").innerHTML = "Adicionar";
    document.getElementById("removeBtn").style.display = "none";
    currentItem = null;

    document.getElementById("itemContainer").style.left = "1%";
    document.getElementById("newBtn").style.left = "95%";
    document.getElementById("InvContainer").style.left = "66%";
}

function removeItem(index)
{
    inventory.splice(index, 1);
    document.getElementById("InvContainer").style.left = "50%";
    document.getElementById("newBtn").style.left = "80%";
    document.getElementById("itemContainer").style.left = "-450px";

    saveUserInventory();
    renderItems();
}

function getUserInventory()
{
    socket.emit("getUserInventory");

}

function saveUserInventory()
{
    socket.emit("saveUserInventory", inventory);
}

//Socket listeners

socket.on("listenUserInventory", inv => {
    inventory = inv;
    renderItems();
});

window.onload = () => {
    getUserInventory();
}