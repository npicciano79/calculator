let buttons=document.querySelectorAll('button');

function displayNumber(button){
    document.getElementById("calculator_screen").innerHTML=button.value;
    
}

buttons.forEach(button =>{
    button.addEventListener("click",()=>{
        displayNumber(button)
    });
});