//======LOCAL STORAGE UPPGIFTER=======
const loginStatus = localStorage.getItem("loginStatus");

const storedUsers = [
    {
    username: "janne",
    password: "test"
    },
    {
    username: "aaa",
    password: "123"
    },
    {
    username: "bbb",
    password: "666"
    }
];


//Skapar en första local storage med testanvändare från array ovan, 
//förhindrar att LS skrivs över med testanvändare vid varje omladdning
function firstLS() {
    let checkLS = localStorage.getItem("storedUsers");

    if(checkLS) {
        return;
    } else {
        localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
        return;
    }
};

firstLS();

//let getStoredUsersLS = JSON.parse(localStorage.getItem("storedUsers"))

//Visar rätt vy beroende på inlognings status 
if (loginStatus == "yes"){
    LoggedIn();
} else {
    notLoggedIn();
}

//============
//EJ INLOGGAD:
//============ 

//Skapa logIN fält i header
function notLoggedIn() {
    //===Användarnamn fält
    let usernameInputField = document.createElement("input");
        usernameInputField.placeholder = "Användarnamn";

    //===Lösenord fält
    let passwordInputField = document.createElement("input");
        passwordInputField.placeholder = "Lösenord";
        passwordInputField.type = "password";

    //===Login knapp
    let loginButton = document.createElement("button");
        loginButton.innerText = "Logga In";
    document.getElementById("logInlogOut").append(usernameInputField, passwordInputField, loginButton);

    //Fånga upp användar uppgifter med click
    loginButton.addEventListener("click", () => {
        let usernameInput = usernameInputField.value
        let passwordInput = passwordInputField.value

        //Ändrar status på inlogningen så att rätt vy kan visas
        localStorage.setItem("loginStatus", "yes");

        //Sparar angivna användarnamnet i LS
        localStorage.setItem("loggedInCurrentUser", usernameInput);

        //Kollar så att user input matchar med användare i array
        let getStoredUsersLS = JSON.parse(localStorage.getItem("storedUsers"))

        let currentUser = getStoredUsersLS.filter(function(user) {
            return user.username == usernameInput && user.password == passwordInput;
        })

        //"Döljer" logginfältet
        if(currentUser.length) {
            usernameInputField.remove();
            passwordInputField.remove();
            loginButton.remove();
            LoggedIn();

        //Om fel uppgifter byt vy till FEL INLOGGNING    
        } else {  
            //Ändrar status på inlogningen så att rätt vy kan visas
            localStorage.setItem("loginStatus", "no");  

            wrongLogin();
        }
    })
};




//========
//REG FÄLT
//========   

let userNameReg = document.getElementById("userNameReg");
let userPasswordReg = document.getElementById("userPasswordReg");
let regBtn = document.getElementById("regBtn");

//Fånga upp användar uppgifter med click
regBtn.addEventListener("click", () => {
    //Sparar uppgifterna i variabler en för att kolla om fälten är toma
    let userInputValueName = document.getElementById("userNameReg").value;
    let userInputValuePass = document.getElementById("userPasswordReg").value;

    //Sparar uppgifterna i en variabel som ska in i local storage sen
    let userInputValue = {
        "username": document.getElementById("userNameReg").value,
        "password": document.getElementById("userPasswordReg").value
    };

    //Jämför vald användarnamn med existerande användarnamn
    let getStoredUsersLS = JSON.parse(localStorage.getItem("storedUsers"))
    let existingUser = getStoredUsersLS.filter(function(user) {
        return user.username == userInputValueName;
    })
   
    //Kolla om fälten är toma
    if((userInputValueName == "" && userInputValuePass == "") || userInputValueName == "" || userInputValuePass == "") {
        let callToAction = document.getElementById("callToAction");
        callToAction.innerText = "Vänligen välj ett Anvädarnamn och Lösenord!"    
        document.getElementById("callToAction").style.color = "red";

    //Varnar användaren om användarnamnet är redan upptaget
    } else if(existingUser.length) {
        let callToAction = document.getElementById("callToAction");
        callToAction.innerText = "Användarnamnet är upptaget!"    
        document.getElementById("callToAction").style.color = "red";
        
    } else {
        //Bekräftar registreringen
        let callToAction = document.getElementById("callToAction");
        callToAction.innerText = "Du är nu registrerad!"    
        document.getElementById("callToAction").style.color = "green";

        //Hämtar local storage uppgifter
        let getStoredUsersLS = JSON.parse(localStorage.getItem("storedUsers"))

        //Pushar variabeln med uppgifterna in i LS array
        getStoredUsersLS.push(userInputValue);

        console.log(getStoredUsersLS);

        //Sparar nya array i LS
        localStorage.setItem("storedUsers", JSON.stringify(getStoredUsersLS));
        }

})

 //=========
 //INLOGGAD:
 //=========

//Skapa logOUT knapp i header
function LoggedIn(){

    //===Logout knapp
    let logOutButton = document.createElement("button");
    logOutButton.innerText = "Logga Ut";
    document.getElementById("logInlogOut").append(logOutButton);

    //Välkomna "Username"
    let userToDisplay = localStorage.getItem("loggedInCurrentUser");    
    document.getElementById("main").innerHTML = `Välkommen ${userToDisplay}`;

    //Vid click byt vy till EJ INLOGGAD
    logOutButton.addEventListener("click", () => { 

        //Ändrar status på inlogningen så att rätt vy kan visas       
        localStorage.setItem("loginStatus", "no");
        
        logOutButton.remove();  
        notLoggedIn();

        //Laddar om sidan för att "reset'a main innerHTML"
        location.reload();
    })
};

 

//===============
//FEL INLOGGNING:
//===============
//Main - Meddela användaren att uppgifetrna är fel
function wrongLogin() {
    let headingText = document.getElementById("headingText");
        headingText.innerText = "Oj! Det verkar som att du uppgav fel uppgifter!"
        document.getElementById("headingText").style.color = "red";

    let callToAction = document.getElementById("callToAction");
        callToAction.innerText = "Vänligen testa att logga in igen eller registrera dig nedan om du är en ny användare!"    
        document.getElementById("callToAction").style.color = "red";
};

