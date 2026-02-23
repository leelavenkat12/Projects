import https from "https"
import chalk from "chalk";
const getJoke = ()=>{
    
       const url = 'https://official-joke-api.appspot.com/random_joke';
    https.get(url,(responce)=>{
        let data = ""
        responce.on("data",(chunk)=>{
            data+=chunk
        });
        responce.on("end",()=>{
            const joke = JSON.parse(data)
      
            console.log("here is a random joke");
            console.log(chalk.red(joke.setup));
            console.log(chalk.blue.bgRed.bold(joke.punchline))
            
            
        })
    })
}
getJoke()