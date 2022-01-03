var currentTimeout;

function rollDice(exp)
{
    if(exp == null) return "Por favor expecifique um dado!"
    let additions;
    let dice;
    let diceResult
    let result;

    if(exp.includes("+")) 
    {

        dice = exp.substring(exp.indexOf("d")+1,exp.indexOf("+"));
        additions = exp.substring(exp.indexOf("+")+1);
        diceResult = Math.floor(Math.random() * dice + 1);
        result = diceResult + eval(additions);

        showDiceResult({
            dice: dice,
            additions: additions,
            diceResult: diceResult,
            result: result
        });
    } 
    else 
    {
        dice = exp.substring(exp.indexOf("d")+1);
        diceResult = Math.floor(Math.random() * dice + 1);
        result = diceResult;

        showDiceResult({
            dice: dice,
            diceResult: diceResult,
            result: result
        });
    }
}

function showDiceResult(display) 
{
    let diceDisplay = document.getElementById("diceDisplay");
    let diceDisplay1 = document.getElementById("diceDisplay-1");
    let diceBox = document.getElementById("diceBox");

    clearTimeout(currentTimeout);

    diceDisplay.innerHTML = `Você rolou um D${display.dice}`;
    diceBox.style.top = "25px";
    if(display.additions)
    {
        diceDisplay1.innerHTML = `[${display.diceResult}] + (${display.additions}) = ${display.result}`;
    }
    else
    {
        diceDisplay1.innerHTML = `D${display.dice} = ${display.result}`;
    }

    currentTimeout = setTimeout(() => {
        diceBox.style.top = "-120px";
    }, 1500);
    
}