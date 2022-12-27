// CLASS AND FICTIVE FUNCTIONS

class Calculator {
    constructor(textPreviousEntry, textCurrentEntry) {
        this.textPreviousEntry = textPreviousEntry
        this.textCurrentEntry = textCurrentEntry
        this.clearAll()
    }

    clearAll() {
        this.previousEntry = ""
        this.currentEntry = ""
        this.calculation = undefined
    }

    delete() {
        this.currentEntry = this.currentEntry.toString().slice(0, -1)
    }

    addNumber(number) {
        if (number === "." && this.currentEntry.includes(".")) return
        this.currentEntry = this.currentEntry.toString() + number.toString()
        console.log(this.currentEntry);
    }

    executeCalcul(calculation) {
        if (this.currentEntry === "") return
        if (this.previousEntry !== "") {
            this.compute()
        }
        this.calculation = calculation
        this.previousEntry = this.currentEntry
        this.currentEntry = ""
    }

    compute() {
        let computation
        const previousNb = parseFloat(this.previousEntry)
        const currentNb = parseFloat(this.currentEntry) 

        if(isNaN(previousNb) || isNaN(currentNb)) return
        switch (this.calculation) {
           case '+': 
            computation = previousNb + currentNb
            break
          case '-':
            computation = previousNb - currentNb
            break
          case '*':
            computation = previousNb * currentNb
            break
          case '÷':
            computation = previousNb / currentNb
            break
          default:
            return 
        }
        this.currentEntry = computation
        console.log(this.currentEntry);
        console.log(this.previousEntry);

        this.calculation = undefined
        this.previousEntry = ""
    }

    displayedNumber(number) {
        const stringifiedNumber = number.toString()

        //splitting the number into two: the integer part and the decimal part.
        const integer = parseFloat(stringifiedNumber.split(".")[0])
        const decimal = stringifiedNumber.split(".")[1]

        let displayedInteger
        //condition for the integer part
        if (isNaN(integer)) {
            displayedInteger = ""
        }else{
            displayedInteger = integer.toLocaleString("en", { maximumFractionDigits : 0 })
        }

        //condition for the decimal part
        if (decimal != null) {
            return `${integer}.${decimal}`
        }else {
            return displayedInteger
        }
    }

    updateDisplayedNumber() {
        this.textCurrentEntry.innerText = 
          this.displayedNumber(this.currentEntry)
          console.log(this.textCurrentEntry);
        if (this.calculation != null) {
            this.textPreviousEntry.innerText =
             `${this.displayedNumber(this.previousEntry)} ${this.calculation}`
            console.log(this.textPreviousEntry);
        } else {
            this.textPreviousEntry.innerText = ""
            console.log(this.textPreviousEntry);
        }
        
    }
}

// **************************************************************************************************
// EVENTS AND FUNCTION CALLBACKS :

const numberButtons = document.querySelectorAll('.number-data')
const calculationButtons = document.querySelectorAll('.calculation-data')
const equalButton = document.getElementById('equal-data')
const deleteButton = document.getElementById('delete-data')
const allClearButton = document.getElementById('clear-all-data')
const textPreviousEntry = document.getElementById('previous-entry-data')
const textCurrentEntry = document.getElementById('current-entry-data')
// console.log(calculationButtons);
// console.log(numberButtons);


const calculator = new Calculator(textPreviousEntry, textCurrentEntry)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.innerText)
        calculator.updateDisplayedNumber()
    })
})


calculationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.executeCalcul(button.innerText)
        calculator.updateDisplayedNumber()
    })
})


    equalButton.addEventListener("click", () => {
        calculator.compute()
        calculator.updateDisplayedNumber()
    })

    allClearButton.addEventListener("click", () => {
        calculator.clearAll()
        calculator.updateDisplayedNumber()
    })

    deleteButton.addEventListener("click", () => {
        calculator.delete()
        calculator.updateDisplayedNumber()
    })

   
