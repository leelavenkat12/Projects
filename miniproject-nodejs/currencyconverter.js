import https from "https"
import readline from "readline"
import chalk from "chalk"
const r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})


const apikey = '2e593634dee34059d7da2f07';
const url = `https://v6.exchangerate-api.com/v6/2e593634dee34059d7da2f07/latest/USD`;
const convertCurrency = (amount,rate)=>{
    return (amount*rate).toFixed(3);
}
// api sends the data one by one so data will add to chunks one by one
https.get(url,(responce)=>{
   let  data = "";
responce.on('data',(chunk)=>{
data+=chunk; //this data responce will do as server give the data 
})

// as u are doing with api as we cant read the data direclty    we need to convert 
responce.on('end',()=>{
    
const rates = JSON.parse(data).conversion_rates;
r1.question("Enter the Amount in USD: ",(amount)=>{
    r1.question("Enter the Target Currency (e.g INR, NPR,EUR: ",(currency)=>{
        const rate = rates[currency.toUpperCase()]; //this will calcuate in usd one usd 
        if(rate){
            console.log(chalk.blue.bgRed.bold(`${amount} USD is approximately ${convertCurrency(amount,rate)} ${currency}`));
            
        }
        else{
            console.log("Invalid curency code");
            
        }
        r1.close()
    } )
})
})
})