var input = 0;                          //current user input value
var inputPointSet = false;              //checks if the user input number already contains a point
var inputOneNegative = true;            //if true activates the possibility to set a negative first number
var inputTwoNegative = false;           //if true activates the possibility to set a negative second number 
var oneNegative = false;                //if true -> first number nagative
var twoNegative = false;                //if true -> second number nagative
var setArithmetic = false;              //if true -> allows the possibility to set the arithmetic
var ans = 0;                            //saves the last end result
var numberOne, numberTwo;               //defines the numbers for the calculation
var arithmetic = 0;                     //sets arithmetic selection on 0 for neutral
var oneSetAns = false;
var twoSetAns = false;


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

    updateTextNew(ans);

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

function inputEqualsAns() {

    if (arithmetic == 0) {
        oneSetAns = true;
    }
    else if(arithmetic != 0) {
        twoSetAns = true;
    }
}

function updateTextLast(output) {

    document.getElementById("outputTextLast").innerHTML = output;
}

function updateTextNew(output) {

    let lastOutput = document.getElementById("outputTextNew").innerHTML;

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