import readline from "readline"
//  this is used to read and write in cli 
const r1 = readline.createInterface({
    input:process.stdin,  // this is used to read in cli
    output:process.stdout, // this is used to write the cli 
})
const todos = []; //empty array to add task used to do

const ShowMenu = ()=>{
    console.log("\n1.Add a Task");
    console.log("2.View Tasks");
    console.log("3.Exit");
    //  question is in which it gives as string something and waits untill input write something and calls the function that he what he done
    
    r1.question("Choose an option:",handleInput) // this is where we want to choose these 3 type we can choose it
}
    const handleInput = (option)=>{
      if(option=='1'){
        r1.question("Enter the task:",(task)=>{
            todos.push(task);
            console.log("Task Added :",task);
            ShowMenu();
        })
      }


       else  if(option=='2'){
       console.log("\n Your Todo-Lists");
       todos.forEach((task,index)=>{
        console.log(`${index+1}.${task}`);
       })
       ShowMenu();
      }
      else if(option=='3') {
        console.log("Good bye");
        r1.close()
      }
      else{
        console.log("Invalid option .Please Try again");
        ShowMenu()
        
      }


}

ShowMenu();