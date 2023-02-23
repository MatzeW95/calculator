var input = 0;                          //current user input value
var inputPointSet = false;              //checks if the user input number already contains a point
var inputOneNegative = true;            //if true activates the possibility to set a negative first number
var inputTwoNegative = false;           //if true activates the possibility to set a negative second number 
var oneNegative = false;                //if true -> first number negative
var twoNegative = false;                //if true -> second number negative
var setArithmetic = false;              //if true -> allows the possibility to set the arithmetic
var ans = 0;                            //saves the last end result
var numberOne, numberTwo;               //defines the numbers for the calculation
var arithmetic = 0;                     //sets arithmetic selection on 0 for neutral
var oneSetAns = false;                  //if true -> number one is the last answer
var twoSetAns = false;                  //if true -> number two is the last answer


document.getElementById("backspace").addEventListener("click", userInputToCalculation("Backspace"));
document.getElementById("delete").addEventListener("click", userInputToCalculation("c"));
document.getElementById("division").addEventListener("click", userInputToCalculation("/"));
document.getElementById("multiplication").addEventListener("click", userInputToCalculation("*"));
document.getElementById("subtraction").addEventListener("click", userInputToCalculation("-"));
document.getElementById("addition").addEventListener("click", userInputToCalculation("+"));
document.getElementById("enter").addEventListener("click", userInputToCalculation("Enter"));
document.getElementById("point").addEventListener("click", userInputToCalculation("."));
document.getElementById("ans").addEventListener("click", userInputToCalculation("a"));

document.getElementById("number0").addEventListener("click", userInputToCalculation("0"));
document.getElementById("number1").addEventListener("click", userInputToCalculation("1"));
document.getElementById("number2").addEventListener("click", userInputToCalculation("2"));
document.getElementById("number3").addEventListener("click", userInputToCalculation("3"));
document.getElementById("number4").addEventListener("click", userInputToCalculation("4"));
document.getElementById("number5").addEventListener("click", userInputToCalculation("5"));
document.getElementById("number6").addEventListener("click", userInputToCalculation("6"));
document.getElementById("number7").addEventListener("click", userInputToCalculation("7"));
document.getElementById("number8").addEventListener("click", userInputToCalculation("8"));
document.getElementById("number9").addEventListener("click", userInputToCalculation("9"));



//Gets user input based on keyboard input
window.addEventListener("keydown", function(event) {

    userInputToCalculation(event.key);
});

//checks the user input and decides based on the input what to do next
function userInputToCalculation(userInput) {

    if (inputOneNegative == true && userInput == "-") {
        oneNegative = true;
        inputOneNegative = false;
        updateTextNew("-");
    }
    else if (inputTwoNegative == true && userInput == "-") {
        twoNegative = true;
        inputTwoNegative = false;
        updateTextNew("-");
    }
    else if (userInput >= 0 && userInput <= 9 || userInput == ".") {

        inputOneNegative = false;
        inputTwoNegative = false;
        addToInput(userInput);
    }
    else if(setArithmetic == false && (userInput == "/" || userInput == "*" || userInput == "-" || userInput == "+")) {
        setArithmetic = true;
        selectArithmetic(userInput);
        inputTwoNegative = true;
    }
    else if(userInput == "=" || userInput == "Enter") {
        getResult();
    }
    else if(userInput == "c" || userInput == "C") {
        resetAll();
        updateTextNew(input); 
        updateTextLast(null ,null, null);
    }
    else if (userInput == "Backspace") {
        removeFromInput();
    }
    else if (userInput == "a" || userInput == "A") {
        inputEqualsAns();
        updateTextNew(ans);
    }
}

//adds numbers into a string and checks that there is maximal one point inside the number
function addToInput(inputNumber) {

    if(inputPointSet == true && inputNumber == ".") {
        
    }
    else if(inputPointSet == false && inputNumber == ".") {
        inputPointSet = true;
        input += inputNumber;
    }
    else {
        input += inputNumber;
    }

    updateTextNew(Number(input));

    if(arithmetic == 0) {
        updateTextLast(Number(input), null, null);
    }
    else {
        updateTextLast(Number(numberOne), arithmetic, Number(input));
    }
}

/*
- removes the last user input
- if input length = 1 -> reset all negative selection from user
- checks arithmetic if set or not to identify if it is number one or two
*/
function removeFromInput() {

    if (input.toString().length > 1) {
        input = input.toString().slice(0, -1); 
    }

    if(input.toString().length == 1 && arithmetic == 0) {
        inputOneNegative = true;
        oneNegative = false;
    }
    else if (input.toString().length == 1 && arithmetic != 0) {
        inputTwoNegative = true;
        twoNegative = false;
    }

    updateTextNew(Number(input));
    
    if(arithmetic == 0) {
        updateTextLast(Number(input), null, null);
    }
    else {
        updateTextLast(Number(numberOne), arithmetic, Number(input));
    }
}

//resets the variables for the addToInput function
function resetAddToInput() {

    numberOne = input;
    input = 0;
    inputPointSet = false;

    updateTextNew(Number(input));
}

//sets the arithmetic based on the user input
function selectArithmetic(ari) {

    if (ari == "+") {
        arithmetic = 1;
    }
    else if (ari == "-") {
        arithmetic = 2;
    }
    else if (ari == "*") {
        arithmetic = 3;
    }
    else if (ari == "/") {
        arithmetic = 4;
    }

    resetAddToInput();
    updateTextLast(Number(numberOne), arithmetic, null);
}

/*
- converts strings into numbers
- checks if any number needs to be negative
- calculates based on the user input arithmetic
- saves the result in the "ans" variable
- resets all variables for a new calculation (only "ans" is saved)
 */
function getResult() {

    numberTwo = input;

    numberOne = Number(numberOne);
    numberTwo = Number(numberTwo);

    if (oneSetAns == true) {
        numberOne = ans;
    }

    if (twoSetAns == true) {
        numberTwo = ans;
    }

    if (oneNegative == true) {
        numberOne = numberOne * (-1);
    }

    if (twoNegative == true) {
        numberTwo = numberTwo * (-1);
    }

    switch (arithmetic) {
        case 1:
            ans = numberOne + numberTwo;
            break;
        case 2:
            ans = numberOne - numberTwo; 
            break;
        case 3:
            ans = numberOne * numberTwo;
            break;
        case 4:
            ans = numberOne / numberTwo;
            break;
    }

    if (Number.isInteger(ans) == false) {
        updateTextNew(ans.toFixed(3));
    }
    else {
        updateTextNew(ans);
    }

    oneNegative = false;
    twoNegative = false;

    updateTextLast(numberOne, arithmetic, numberTwo);

    resetAll();
}

//resets all varibales that are needed for a new calculation
function resetAll() {
    input = 0;
    inputPointSet = false;
    numberOne = 0;
    numberTwo = 0;
    arithmetic = 0;
    setArithmetic = false;
    inputOneNegative = true;
    inputTwoNegative = false;
    oneNegative = false;
    twoNegative = false;
    oneSetAns = false;
    twoSetAns = false;
}

//sets the first or the second number as the last answer
function inputEqualsAns() {

    if (arithmetic == 0) {
        oneSetAns = true;
    }
    else if(arithmetic != 0) {
        twoSetAns = true;
    }
}

//updates the text output from the "outputTextLast" element
function updateTextLast(nrOne, ari, nrTwo) {

    let textOutput;

    if (nrOne == null && ari == null && nrTwo == null) {
        
        textOutput = 0;
    }
    else {
        if(nrOne == null) {
            nrOne = "";
        }
        
        if (ari == null) {
            ari = "";
        }
        else if (ari == 1) {
            ari = "+";
        }
        else if (ari == 2) {
            ari = "-"; 
        }
        else if (ari == 3) {
            ari = "*"; 
        }
        else if (ari == 4) {
            ari = "/"; 
        }
        
        if(nrTwo == null) {
            nrTwo = "";
        }

        if (oneNegative == true && twoNegative == false) {
            textOutput = "-" + nrOne + " " + ari + " " + nrTwo;
        }
        else if(oneNegative == false && twoNegative == true) {
            textOutput = nrOne + " " + ari + " " + "-" + nrTwo;
        }
        else if(oneNegative == true && twoNegative == true) {
            textOutput = "-" + nrOne + " " + ari + " " + "-" + nrTwo;
        }
        else {
            textOutput = nrOne + " " + ari + " " + nrTwo;
        }
    }

    document.getElementById("outputTextLast").innerHTML = textOutput;
}

//updates the text output from the "outputTextNew" element 
function updateTextNew(output) {

    if (arithmetic == 0 && oneNegative == true || arithmetic != 0 && twoNegative == true) {

        if (output == "-" || output < 0) {
            document.getElementById("outputTextNew").innerHTML = output;
        }
        else {
            document.getElementById("outputTextNew").innerHTML = "-" + output.toString();
        }
    }
    else {
        document.getElementById("outputTextNew").innerHTML = output;
    }
}