const socket = io();

var pInfo = {
    vida: {
        current: 1,
        max: 1,
    },
    chaos: {
        current: 1,
        max: 1,
    },
    re_points: 5,
    strength: 0,
    agility: 0,
    presence: 0,
    intelligence: 0
}
var Info = {
    name: "Nome Sobrenome",
    age: 1,
    height: 0.0,
    race: "Raça"
}
var currentEditInfo;


//Edita a informação que foi clicada
function editInfo(info)
{
    let edit_box = document.getElementById("edit_box");
    let edit_box_title = document.getElementById("edit_box_title");
    let edit_atual = document.getElementById("edit_atual");
    let edit_max = document.getElementById("edit_max");
    let edit_box1 = document.getElementById("edit_box1");
    let edit_box1_title = document.getElementById("edit_box1_title");
    let edit1_value = document.getElementById("edit1");
    currentEditInfo = info;
    closeEditBox();

    switch (info)
    {
        case 1:
            edit_box_title.innerHTML = "Vida"
            edit1_value.setAttribute("type", "text");
            edit_atual.value = pInfo.vida.current;
            edit_max.value = pInfo.vida.max;

            edit_box.style.left = 0;
            break;
        
        case 2:
            edit_box_title.innerHTML = "Chaos"
            edit1_value.setAttribute("type", "text");
            edit_atual.value = pInfo.chaos.current;
            edit_max.value = pInfo.chaos.max;

            edit_box.style.left = 0;
            break;

        case 3:
            edit_box1_title.innerHTML = "Nome";
            edit1_value.setAttribute("type", "text");
            edit1_value.value = Info.name;
            edit_box1.style.left = 0;
            break;
        case 4:
            edit_box1_title.innerHTML = "Idade";
            edit1_value.setAttribute("type", "number");
            edit1_value.value = Info.age;
            edit_box1.style.left = 0;
            break;
        case 5:
            edit_box1_title.innerHTML = "Altura";
            edit1_value.setAttribute("type", "number");
            edit1_value.value = Info.height;
            edit_box1.style.left = 0;
            break;
        case 6:
            edit_box1_title.innerHTML = "Raça";
            edit1_value.setAttribute("type", "text");
            edit1_value.value = Info.race;
            edit_box1.style.left = 0;
            break;
    }
}

//Aplica a edição feita
function applyEdit(info)
{
    switch (info)
    {
        case 1:
            pInfo.vida.current = document.getElementById("edit_atual").value;
            pInfo.vida.max = document.getElementById("edit_max").value;
            break;
    
        case 2:
            pInfo.chaos.current = document.getElementById("edit_atual").value;
            pInfo.chaos.max = document.getElementById("edit_max").value;
            break;
        case 3:
            Info.name = document.getElementById("edit1").value;
            break;
        case 4:
            Info.age = document.getElementById("edit1").value;
            break;
        case 5:
            Info.height = document.getElementById("edit1").value;
            break;
        case 6:
            Info.race = document.getElementById("edit1").value;
            break;
    }

    closeEditBox();
    saveAllUserInfo();
}

//Fecha a caixa de edição
function closeEditBox()
{
    document.getElementById("edit_box").style.left = "-250px";
    document.getElementById("edit_box1").style.left = "-250px";
    reloadDisplay();
}

//Mostra na tela os valores de todos os campos de informação
function reloadDisplay()
{
    document.getElementById("lifeDisplay").innerHTML = `Vida: ${pInfo.vida.current}/${pInfo.vida.max}`; //Display da vida
    document.getElementById("chaosDisplay").innerHTML = `Chaos: ${pInfo.chaos.current}/${pInfo.chaos.max}`; //Display do chaos
    document.getElementById("nameDisplay").innerHTML = `Nome: ${Info.name}`; // Nome
    document.getElementById("ageDisplay").innerHTML = `Idade: ${Info.age}`; // Idade
    document.getElementById("heightDisplay").innerHTML = `Altura: ${Info.height}m`; // Altura
    document.getElementById("raceDisplay").innerHTML = `Raça: ${Info.race}`; // Raça
    document.getElementById("re_points").innerHTML = `Pontos: ${pInfo.re_points}`; //Pontos

    document.getElementById("strength").innerHTML = `Força: ${pInfo.strength}`;
    document.getElementById("agility").innerHTML = `Agilidade: ${pInfo.agility}`;
    document.getElementById("presence").innerHTML = `Presença: ${pInfo.presence}`;
    document.getElementById("inteligence").innerHTML = `Inteligência: ${pInfo.intelligence}`;

}

//Adiciona uma perícia de acordo com seus pontos
function addPer(per)
{
    if(pInfo.re_points <= 0) return;
    switch (per)
    {
        case 0:
            pInfo.strength++;
            pInfo.re_points--;
            break;
        case 1:
            pInfo.agility++;
            pInfo.re_points--;
            break;
        case 2:
            pInfo.presence++;
            pInfo.re_points--;
            break;
        case 3:
            pInfo.intelligence++;
            pInfo.re_points--;
            break;
    }
    saveAllUserInfo();
    reloadDisplay();
}

function getAllUserInfo() {
    socket.emit("getAllUserInfo");
}

function saveAllUserInfo() {
    socket.emit("saveAllUserInfo", [Info, pInfo]);
}

//Sockets de recive

socket.on("listenAllUserInfo", user => {
    Info = user[0];
    pInfo = user[1];
    reloadDisplay();
});

//Função que é usada quando a página carrega
window.onload = () => {
    getAllUserInfo();
    reloadDisplay();
}