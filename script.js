
const leftValue=document.getElementById("leftValue")
const RightValue=document.getElementById("RightValue")

async function getCurerencies(){
    const url="https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    const respone = await fetch(url)
    const data = await respone.json()

    const nameVulute=data.map(function(obj) {
        return obj.cc
    });

    nameVulute.forEach((element,index) => {
        if (index===0){
            leftValue.insertAdjacentHTML('beforeend',`<option value="${index}" selected>${element}</option>`)
            RightValue.insertAdjacentHTML('beforeend',`<option value="${index}">${element}</option>`)
        }
        else if (index===1){
            leftValue.insertAdjacentHTML('beforeend',`<option value="${index}">${element}</option>`)
            RightValue.insertAdjacentHTML('beforeend',`<option value="${index}" selected>${element}</option>`)
        }
        else{
            leftValue.insertAdjacentHTML('beforeend',`<option value="${index}">${element}</option>`)
            RightValue.insertAdjacentHTML('beforeend',`<option value="${index}">${element}</option>`)
        }
    });

    const cinaVulute = data.map(function(obj) {
        return obj.rate
    });

    const leftNumber = document.createElement("input");
    leftNumber.type = "number";
    leftNumber.value=1;
    const conteinerValutuLeft = document.querySelector("div.conteinerValutuLeft");
    conteinerValutuLeft.appendChild(leftNumber);
    
    const RightNumber = document.createElement("input");
    RightNumber.type = "number";
    RightNumber.value=(cinaVulute[leftValue.value]/cinaVulute[RightValue.value]*leftNumber.value).toFixed(4);
    const conteinerValutuRight = document.querySelector("div.conteinerValutuRight");
    conteinerValutuRight.appendChild(RightNumber);

    leftValue.addEventListener("change", function() {
        RightNumber.value=(cinaVulute[leftValue.value]/cinaVulute[RightValue.value]*leftNumber.value).toFixed(4);
    });
    
    RightValue.addEventListener("change", function() {
        RightNumber.value=(cinaVulute[leftValue.value]/cinaVulute[RightValue.value]*leftNumber.value).toFixed(4);
    });

    leftNumber.addEventListener("input", function() {
        RightNumber.value=(cinaVulute[leftValue.value]/cinaVulute[RightValue.value]*leftNumber.value).toFixed(4);
    });
    
    RightNumber.addEventListener("input", function() {
        leftNumber.value=(cinaVulute[RightValue.value]/cinaVulute[leftValue.value]*RightNumber.value).toFixed(4);
    });
    
}

getCurerencies()




