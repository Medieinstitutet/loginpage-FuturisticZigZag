//========Skapar konstanter======
const userInput = document.getElementById("userInput");
const btn = document.getElementById("btn");
const userOutput = document.getElementById("output");


//========Fångar upp user input in i local storage====
btn.addEventListener("click", () => {
    const userInputValue = userInput.value;

    //======Kollar om man har skrivit något i fältet===
    if (userInputValue) {
        localStorage.setItem("userText", userInputValue);
        
        //=====Laddar om sidan======
        location.reload();

    //=====Uppmanar användaren att skriva något i fältet====    
    } else {
        document.getElementById("output").innerHTML = "";
        document.getElementById("output").append("Vänligen skriv något!");
    }
})

//=======Printar user input från local storage=====
for (i=0; i < localStorage.length; i++) {
    let userText = localStorage.getItem("userText");
    document.getElementById("output").append(userText);

    //======Skapar en reset knapp=====
    let resetBtn = document.createElement("button");
        resetBtn.innerText = "Ta bort!";
    let lineBreak = document.createElement("br");
    document.getElementById("output").append(lineBreak, resetBtn);

    //======Gör så att reset knappen tömmer local storage
    resetBtn.addEventListener("click", () => {
        localStorage.clear();

        //======Laddar om sidan=====
        location.reload();
    })

};