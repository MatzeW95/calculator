var input = 0;                          //current user input value
var inputPointSet = false;              //checks if the user input number already contains a point
var inputOneNegative = true;            //if true activates the possibility to set a negative first number
var inputTwoNegative = false;           //if true activates the possibility to set a negative second number 
var oneNegative = false;                //if true -> first number nagative
var twoNegative = false;                //if true -> second number nagative
var setArithmetic = false;              //if true -> allows the possibility to set the arithmetic
var ans = 0;                            //saves the last end result
var numberOne, numberTwo, arithmetic;   //defines the numbers and arithmetic for the calculation


//checks the user input and decides based on the input what to do next
window.addEventListener("keydown", function(event) {

    if (inputOneNegative == true && event.key == "-") {
        oneNegative = true;
        inputOneNegative = false;
    }
    else if (inputTwoNegative == true && event.key == "-") {
        twoNegative = true;
        inputTwoNegative = false;
    }
    else if (event.key >= 0 && event.key <= 9 || event.key == ".") {
        inputOneNegative = false;
        inputTwoNegative = false;
        addToInput(event.key);
    }
    else if(setArithmetic == false && (event.key == "/" || event.key == "*" || event.key == "-" || event.key == "+")) {
        setArithmetic = true;
        selectArithmetic(event.key);
        inputTwoNegative = true;
    }
    else if(event.key == "=" || event.key == "Enter") {
        getResult();
    }
});

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

    console.log("New number: " + Number(input));
}

//resets the variables for the addToInput function
function resetAddToInput() {

    numberOne = input;
    input = 0;
    inputPointSet = false;
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

    console.log(ans);
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
}