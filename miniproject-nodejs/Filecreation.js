import readline from "readline"
import fs from "fs";

const r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

const Filecreation=()=>{
r1.question('Enter the file name:',(filename)=>{
    r1.question("Enter the content for your file:",(content)=>{
        fs.writeFile(`${filename}.txt`,content,(err)=>{
            if(err){
                console.error("Error while writing the file",err.message);
                
            
            }
            else{
                console.log(`File ${filename}.txt Created Successfully`);
                
            }
            r1.close()
        })
    })
})
}
Filecreation();