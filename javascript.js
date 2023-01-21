class Calculator{
    constructor(previousOpTextElement,currentOpTextElement){
        this.previousOpTextElement=previousOpTextElement
        this.currentOpTextElement=currentOpTextElement
        this.clear()
    }

    //clears previous current and operation 
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined


    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)


    }

    appendNumber(number){
        if (number==='.' && this.currentOperand.includes('.'))return        //adding a period if one exists, returns nothing and stops process
        this.currentOperand=this.currentOperand.toString()+number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand==='')return     //cannot select operation prior to selecting an number

        if (this.previousOperand !== ''){           //if previous operand is not empty, calls compute function 
            this.compute()              
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }

    compute(){
        let computation
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation=prev+current
                break
            case '-':
                computation=prev-current
                break
            case '*':
                computation=prev*current
                break
            case '/':
                computation=prev/current
                break
        }
        this.currentOperand=computation
        this.opperation=undefined
        this.previousOperand=''

    }

    getDisplayNumber(number){
        const stringNumber=number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay=''
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0})
        }
        if (decimalDigits!=null){
            return ` ${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }




        const floatNumber=parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')


        return number
    }

    updateDisplay(){
        this.currentOpTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if (this.operation!= null){
            this.previousOpTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`    
        }
        else{
            this.previousOpTextElement.innerText=''
        }
        


    }



}




const numberButton=document.querySelectorAll('[data-number]')
const operationButton=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const allClearButton=document.querySelector('[data-all-clear]')
const deleteButton=document.querySelector('[data-delete]')
const previousOpTextElement=document.querySelector('[data-previous-op]')
const currentOpTextElement=document.querySelector('[data-current-op]')


const calculator=new Calculator(previousOpTextElement,currentOpTextElement)

numberButton.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})


allClearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

operationButton.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    }
    )
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()

})
    
