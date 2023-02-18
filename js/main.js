var inputNumber = 0;
var firstNumber = 0;
var ans = 0;
var arithmetic = 0;
var sign = false;
var changeSign = false;
var secondNumber = false;


window.addEventListener("keydown", function(event) {

    var input = event.key;

    if (checkInput(input) == true) {
        
        if (input >= 0 && input <= 9) {
            addNumber(input);
        }
        else if (inputNumber == 0 && input == "-") {
            sign = true;
            addNumber(input);
        }
        else if (input == "/" || input == "*" || input == "-" || input == "+") {
            changeArithmetic(input);

            firstNumber = inputNumber;

            secondNumber = true;
        }
        else if(input == "=" || input == "Enter") {

            let value1 = Number(firstNumber);
            let value2 = Number(inputNumber);

            let textOutput = ""
            
            if (arithmetic == 1) {
                ans = value1 / value2;
                textOutput = value1 + " / " + value2;
            }
            else if (arithmetic == 2) {
                ans = value1 * value2;
                textOutput = value1 + " * " + value2;
            }
            else if (arithmetic == 3) {
                ans = value1 - value2;
                textOutput = value1 + " - " + value2;
            }
            else if (arithmetic == 4) {
                ans = value1 + value2;
                textOutput = value1 + " + " + value2;
            }

            document.getElementById("outputTextLast").innerHTML = textOutput;

            document.getElementById("outputTextNew").innerHTML = ans;
        }
    }
});

function checkInput(input) {

    let checkedInput = false

    if(
        (input >= 0 && input <= 9   //button 0 - 9
        || input == "c"             //button C
        || input == "C"             //button C
        || input == "Backspace"     //button <
        || input == "/"             //button /
        || input == "*"             //button *
        || input == "-"             //button -
        || input == "+"             //button +
        || input == "Enter"         //button Enter
        || input == "="             //button Enter
        || input == " "             //button Ans
        || input == "."             //button .
        || input == ",")            //button .
    ) {
        checkedInput = true;
    }

    return checkedInput;
}

function addNumber(number) {

    if (secondNumber == true) {
        
        secondNumber = false;
        inputNumber = 0;
    }

    if(inputNumber == 0 && sign == true) {
        inputNumber = 0;
        sign = false;
        changeSign = true;
    }
    else if (inputNumber == 0 && sign == false) {
        
        if (changeSign == true) {
            inputNumber = number * -1;
            changeSign = false;
        }
        else {
            inputNumber = number;
        }
    }
    else {   
        inputNumber = `${inputNumber}${number}`;
    }

    document.getElementById("outputTextNew").innerHTML = inputNumber;
}

function changeArithmetic(inputArithmetic) {

    if (inputArithmetic == "/") {
        arithmetic = 1;
        document.getElementById("outputTextLast").innerHTML = inputNumber + " /";
    }
    else if (inputArithmetic == "*") {
        arithmetic = 2;
        document.getElementById("outputTextLast").innerHTML = inputNumber + " *";
    }
    else if (inputArithmetic == "-") {
        arithmetic = 3;
        document.getElementById("outputTextLast").innerHTML = inputNumber + " -";
    }
    else if (inputArithmetic == "+") {
        arithmetic = 4;
        document.getElementById("outputTextLast").innerHTML = inputNumber + " +";
    }

    document.getElementById("outputTextNew").innerHTML = 0;
}