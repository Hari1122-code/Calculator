let runningTotal = 0;
let buffer = "0";
let previousOperator;
let view_text = "";
const ans = document.querySelector(".ans");

function buttonClick(value) {
    if (isNaN(value) && value!=".") {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    ans.innerText = buffer;
}

function handleNumber(numberString) {
    view_text += numberString;
    document.querySelector(".view").innerHTML = view_text;
    // if(previousOperator != null){

    // }
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            view_text = ""
            document.querySelector(".view").innerHTML = "";
            break;
        case "=":
            if (previousOperator === null) {
                return
            }
            console.log(previousOperator)
            if (previousOperator === "sq") {
                previousOperator = null;
                buffer = runningTotal;
                console.log(runningTotal)
            }
            else{
                if (isNaN(view_text.slice(-1)) || buffer === "0") {
                    return
                }
                console.log(buffer)
                flushOperation(parseFloat(buffer));
                previousOperator = null;
                buffer = runningTotal;
            }
            if (runningTotal != 0) {
                view_text = "(" + view_text + ")";
                document.querySelector(".view").innerHTML = view_text;
            }
            else {
                document.querySelector(".view").innerHTML = "";
            }
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            let letter = view_text.slice(-1);
            if (letter != "+" && letter != "−" && letter != "×" && letter != "÷") {
                view_text = view_text.substring(0, view_text.length - 1);
                document.querySelector(".view").innerHTML = view_text;
            }
            break;
        case "sq":
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }
    const intBuffer = parseFloat(buffer);
    // console.log(intBuffer)
    if (symbol === "sq") {
        view_text += "*" + intBuffer;
        document.querySelector(".view").innerHTML = view_text;
        previousOperator = symbol;
        buffer = "0"
        runningTotal = intBuffer;
    }
    else {
        view_text += symbol;
        document.querySelector(".view").innerHTML = view_text;
        previousOperator = symbol;
        buffer = "0"
    }
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    }
    else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    }
    else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
    else if (previousOperator === "sq") {
        runningTotal *= runningTotal;
    }
}

document.querySelector(".cal-buttons").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
})

var input = document.querySelectorAll(".cal-button");
input.forEach(ele => {
    ele.addEventListener("keypress", function (event) {
        console.log(event.key)
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".eq").click();
        }
        else if (event.key === "0") {
            event.preventDefault();
            document.querySelector(".zero").click();
        }
        else if (event.key === "1") {
            event.preventDefault();
            document.querySelector(".one").click();
        }
        else if (event.key === "2") {
            event.preventDefault();
            document.querySelector(".two").click();
        }
        else if (event.key === "3") {
            event.preventDefault();
            document.querySelector(".three").click();
        }
        else if (event.key === "4") {
            event.preventDefault();
            document.querySelector(".four").click();
        }
        else if (event.key === "5") {
            event.preventDefault();
            document.querySelector(".five").click();
        }
        else if (event.key === "6") {
            event.preventDefault();
            document.querySelector(".six").click();
        }
        else if (event.key === "7") {
            event.preventDefault();
            document.querySelector(".seven").click();
        }
        else if (event.key === "8") {
            event.preventDefault();
            document.querySelector(".eight").click();
        }
        else if (event.key === "9") {
            event.preventDefault();
            document.querySelector(".nine").click();
        }
        else if (event.key === "+") {
            event.preventDefault();
            document.querySelector(".add").click();
        }
        else if (event.key === "-") {
            event.preventDefault();
            document.querySelector(".sub").click();
        }
        else if (event.key === "*") {
            event.preventDefault();
            document.querySelector(".mul").click();
        }
        else if (event.key === "/") {
            event.preventDefault();
            document.querySelector(".div").click();
        }
        else if (event.key.code === 8) {
            event.preventDefault();
            document.querySelector(".backspace").click();
        }

    });
})
