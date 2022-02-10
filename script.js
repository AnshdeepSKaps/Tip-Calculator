
localStorage.clear()
let input_bill = document.getElementById('input-bill')
let input_nop = document.getElementById('input-nop')

// BILL INPUT
input_bill.addEventListener('input', () =>{
    let bill = input_bill.value
    if(bill == null)   
        localStorage.setItem("bill", JSON.stringify(0))
    else   
        localStorage.setItem("bill", JSON.stringify(bill))
    calculate()
})

// NUMBER OF PEOPLE INPUT
input_nop.addEventListener('input', () =>{
    let error = document.getElementById('error')
    let nop = input_nop.value

    if(nop == 0){
        localStorage.setItem('nop', '')
        error.classList.remove('hidden')
        input_nop.classList.add('red')
    }   
    else{
        input_nop.classList.remove('red')
        localStorage.setItem("nop", JSON.stringify(nop))
        error.classList.add('hidden')
    }  
    calculate()
})

// PERCENTAGE SELECTION

button = {
    0: 5, 
    1: 10, 
    2: 15,
    3: 25,
    4: 50,
    5: 0,
}

let percentage = document.getElementsByClassName('per-btn')
for (let index = 0; index < 6 ; index++) {
   
    if(index == 5){     //custom percentage
        percentage[index].addEventListener('input', () => button_onclick(index))
        percentage[index].addEventListener('click', () => button_onclick(index))
    }
    else{
        percentage[index].addEventListener('click', () => button_onclick(index))
    }
}

function button_onclick(index){
    let local_per = localStorage.getItem("percentage")

    if(local_per == null){
        if(index == 5){
            let per = percentage[index].value;
            button[index] = per;      
        }
        if(index != 5)
            percentage[index].classList.toggle('selected')
        localStorage.setItem("percentage", JSON.stringify(button[index]))
    }
    else{
        let existing_per = localStorage.getItem("percentage")
        existing_per = parseInt(existing_per)
        
        // if same button is pressed twice
        if(existing_per == button[index] && index != 5){  
      
            percentage[index].classList.toggle('selected')
            localStorage.setItem("percentage", JSON.stringify('null'))
            return
        }
        
        if(index == 5){  
            let per = percentage[index].value;
            button[index] = parseInt(per);   
        }

        Array.from(percentage).forEach((element, i) => {
            if(button[i] == existing_per){
                if(i == 5){
                    element.value = null
                }
                else
                element.classList.toggle('selected')
            }
        })
        if(index != 5)
            percentage[index].classList.toggle('selected')
        localStorage.setItem("percentage", JSON.stringify(button[index]))
    }

    console.log(localStorage)
    calculate()
}

// RESET

let tip_amount = document.getElementById('tip-amount')
let total_amount = document.getElementById('total-amount')

let reset_button = document.getElementById("reset-button")
reset_button.addEventListener("click", () =>{
    let inputs = document.getElementsByTagName('input')
       

    Array.from(inputs).forEach((element) =>{  
        element.value = null
    })
    
    tip_amount.innerHTML = '$0.00';
    total_amount.innerHTML = '$0.00';

    let existing_per = localStorage.getItem("percentage")
    existing_per = parseInt(existing_per)
    Array.from(percentage).forEach((element, i) => {
        if(button[i] == existing_per){
            if(i == 5){
                element.value = null
            }
            else
            element.classList.toggle('selected')
        }
    })

    localStorage.clear() 
})

// CALCULATIONS

function calculate(){
    let bill = localStorage.getItem('bill')
    let nop = localStorage.getItem('nop')
    let per = localStorage.getItem('percentage')
    
    bill = JSON.parse(bill)
    bill = parseFloat(bill)

    nop = JSON.parse(nop)
    nop = parseInt(nop)
    
    per = JSON.parse(per)
    per = parseFloat(per)
    
    tip = bill * per / 100 / nop
    total = bill / nop + tip
    tip = tip.toFixed(2)
    tip = tip.toString()
    total = total.toFixed(2)
    total = total.toString()

    if(isNaN(tip)){
        tip_amount.innerHTML = '$0.00';
        total_amount.innerHTML = '$0.00';
    }
    else{    
        tip_amount.innerHTML = "$" + tip
        total_amount.innerHTML = "$" + total
    }
}









