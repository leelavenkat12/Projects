let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset-btn")
let newGameBtn = document.querySelector("#new-btn")
let msgcontainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turn0 = true // playerX,playerO
const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6], 
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
 
       if(turn0){
        box.innerText = "O"
        turn0=false
       }
       else{
        box.innerText = "X"
        turn0 = true
       }
       box.disabled = true; // this is what were we cant change the o or x by clkcing once 
       checkwinner();
    })
})
const disabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }

}
const enableboxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }

}
const showwinner = (winner)=>{
msg.innerHTML = `congratulations , winner is ${winner}`
msgcontainer.classList.remove("hide");
disabledboxes();
}
const checkwinner= ()=>{
for( let pattern of winpatterns){
let pos1= boxes[pattern[0]].innerText
let pos2= boxes[pattern[1]].innerText
    let pos3= boxes[pattern[2]].innerText;
    if (pos1!="" &&  pos2 !="" &&pos3 !=""){
        if(pos1===pos2 &&pos2===pos3){
        console.log("winner",pos1);
        showwinner(pos1);
        }
        
    }
}
}
const resetgame = ()=>{
    turn0 = true;
    enableboxes()
    msgcontainer.classList.add("hide")
}
newGameBtn.addEventListener("click",resetgame)
    resetBtn.addEventListener("click",resetgame)